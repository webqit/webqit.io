
/**
 * @imports
 */
import Fs from 'fs';
import Url from 'url';
import Path from 'path';
import _arrFrom from '@webqit/util/arr/from.js';
import _intersect from '@webqit/util/arr/intersect.js';
import _toTitle from '@webqit/util/str/toTitle.js';
import _each from '@webqit/util/obj/each.js';

/**
 * Reads documentation from the filesystem.
 */
export default class Documentation {

    /**
     * Initializes an instance.
     * 
     * @param String domain
     */
    constructor(domain) {
        this.domain = domain;
        this.baseDir = Path.resolve(Url.fileURLToPath(import.meta.url), `../../views/${domain}/.docs`);
    }

    /**
     * Gets a project by the given name.
     * 
     * @param String    name
     * @param Bool      withBundles
     * 
     * @returns Object
     */
    getProject(name, withBundles = false) {
        var projectDir = Path.join(this.baseDir, name),
            projectJsonFile;
        var project = {
            name,
            repo: `webqit/${name}`,
        }
        if (Fs.existsSync(projectJsonFile = Path.join(projectDir, '/project.json'))) {
            project = { ...project, ...JSON.parse(Fs.readFileSync(projectJsonFile)) };
        }
        // ------------
        if (!project.cta) {
            project.cta = {};
        }
        if (!project.cta.href) {
            project.cta.href = `/${this.domain}/${name}`;
        }
        if (!project.cta.text) {
            project.cta.text = 'Learn more';
        }
        // ------------
        if (!project.quickstart) {
            project.quickstart = {};
        }
        if (!project.quickstart.type) {
            project.quickstart.type = 'code';
        }
        if (!project.quickstart.directive) {
            project.quickstart.directive = `npm install @webqit/${name}`;
        }
        if (!project.quickstart.cta) {
            project.quickstart.cta = {};
        }
        if (!project.quickstart.cta.href) {
            project.quickstart.cta.href = `/${this.domain}/${name}/docs`;
        }
        if (!project.quickstart.cta.text) {
            project.quickstart.cta.text = 'Go to docs';
        }
        // ------------
        if (withBundles) {
            var bundleJsonFile,
                bundleHtmlFile,
                bundles = {};
            if (Fs.existsSync(bundleJsonFile = Path.join(projectDir, '/bundle.html.json'))) {
                bundles.json = JSON.parse(Fs.readFileSync(bundleJsonFile));
            }
            if (Fs.existsSync(bundleHtmlFile = Path.join(projectDir, '/bundle.html'))) {
                bundles.html = Fs.readFileSync(bundleHtmlFile).toString();
            }
            project.bundles = bundles;
            project = {
                ...project,
                ...bundles.json,
            };
        }
        return project;
    }

    /**
     * Gets the list of projects.
     * 
     * @param String    domain
     * @param Bool      withBundles
     * 
     * @uses @getProject()
     * 
     * @returns Object
     */
    getProjectsList(withBundles = false) {
        var projects = {};
        if (Fs.existsSync(this.baseDir)) {
            Fs.readdirSync(this.baseDir).forEach(name => {
                var resource;
                if (Fs.statSync(resource = Path.join(this.baseDir, name)).isDirectory() && !name.startsWith('.')) {
                    projects[name] = this.getProject(name, withBundles);
                }
            });
        }
        return projects;
    }

    /**
     * Categorizes the list of projects.
     * 
     * @param Object    projectsList
     * @param String    categoryField
     * @param String    defaultCategory
     * @param Bool      sorted
     * 
     * @returns Array
     */
    categorizeProjectsList(projectsList, categoryField = 'categories', defaultCategory = 'other', sorted = true) {
        var categoriesJsonFile = Path.resolve(this.baseDir, 'categories.json'),
            projectsListCategorized = Fs.existsSync(categoriesJsonFile) ? JSON.parse(Fs.readFileSync(categoriesJsonFile)) : [];
        projectsListCategorized = projectsListCategorized.map(category => {
            if (!category.selector) {
                category.selector = [category.title];
            }
            if (!category.items) {
                category.items = [];
            }
            _each(projectsList, (name, project) => {
                var categories = _arrFrom((project[categoryField] || '').length ? project[categoryField] : defaultCategory);
                if (_intersect(categories.map(c => c.toLowerCase()), category.selector.map(c => c.toLowerCase())).length) {
                    if (!('displayRepetition' in project)) {
                        project.displayRepetition = 0;
                    } else {
                        project = { ...project, displayRepetition: project.displayRepetition + 1 };
                    }
                    category.items.push(project);
                }
            });
            return category;
        }).filter(c => c.items && c.items.length);
        if (sorted) {
            return projectsListCategorized.sort((a, b) => a.title.toLowerCase() === 'featured' || b.title.toLowerCase() === defaultCategory ? -1 : (a.title.toLowerCase() === defaultCategory || b.title.toLowerCase() === 'featured' ? 1 : a.title < b.title)).map(collection => {
                collection.items = collection.items.sort((a, b) => a._before === b.name || a.name === b._after ? -1 : (a._after === b.name || b.name === a._before ? 1 : 0));
                return collection;
            });
        }
        return projectsListCategorized;
    }

    /**
     * Accetps a project Readme
     * and returns the project in the same format as @getProject().
     * 
     * @param String    name
     * @param Object    bundle
     * 
     * @returns Object
     */
    getProjectDetailsFromReadme(name, bundle) {
        var projectProp = prop => bundle[prop] || ((bundle.meta || {}).readme || {})[prop];
        var title = projectProp('title') || (projectProp('outline') || []).length && projectProp('outline')[0].level === 1 ? projectProp('outline')[0].title : _toTitle(name);
        return {
            name,
            title,
            desc: projectProp('desc'),
            desc2: projectProp('desc2'),
            icon: projectProp('icon'),
            categories: (projectProp('categories') || '').split(',').map(s => s.trim()).filter(s => s),
            tags: (projectProp('tags') || '').split(',').map(s => s.trim()).filter(s => s),
            repo: `webqit/${name}`,
            cta: {href: `/${this.domain}/${name}`, text: 'Learn more'},
            _after: projectProp('_after'),
            _before: projectProp('_before'),
        };
    }

    /**
     * Accetps the list of project Readmes
     * and returns a new project list in the same format as @getProjectsList().
     * 
     * @param Object    bundlesList
     * 
     * @returns Object
     */
    getEachProjectDetailsFromReadme(bundlesList) {
        const detailsAll = {};
        _each(bundlesList, (name, bundle) => {
            detailsAll[name] = this.getProjectDetailsFromReadme(name, bundle);
        });
        return detailsAll;
    }
}
