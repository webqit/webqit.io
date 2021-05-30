
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
            cta: 'Learn more',
            ctaRef: `/${this.domain}/${name}`,
        }
        if (Fs.existsSync(projectJsonFile = Path.join(projectDir, '/project.json'))) {
            project = { ...project, ...JSON.parse(Fs.readFileSync(projectJsonFile)) };
        }
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
        var projectInfo;
        if ((bundle.meta || {}).readme) {
            projectInfo = bundle.meta.readme;
        } else {
            projectInfo = bundle;
        }
        var title = projectInfo.title || (projectInfo.outline || []).length && projectInfo.outline[0].level === 1 ? projectInfo.outline[0].title : _toTitle(name);
        return {
            name,
            title,
            desc: projectInfo.desc,
            desc2: projectInfo.desc2,
            icon: projectInfo.icon,
            categories: (projectInfo.categories || '').split(',').map(s => s.trim()).filter(s => s),
            tags: (projectInfo.tags || '').split(',').map(s => s.trim()).filter(s => s),
            repo: `webqit/${name}`,
            cta: 'Learn more',
            ctaRef: `/${this.domain}/${name}`,
            _after: projectInfo._after,
            _before: projectInfo._before,
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
