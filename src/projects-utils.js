
/**
 * @imports
 */
import Fs from 'fs';
import Url from 'url';
import Path from 'path';
import _isString from '@webqit/util/js/isString.js';
import _toTitle from '@webqit/util/str/toTitle.js';
import _each from '@webqit/util/obj/each.js';
import { DefaultDeserializer } from 'v8';

/**
 * Gets the list of projects.
 * 
 * @param Bool      withBundles
 * 
 * @uses @getProject()
 * 
 * @returns Object
 */
export function getProjectsList(withBundles = false) {
    var baseDir = Path.resolve(Url.fileURLToPath(import.meta.url), '../../views/tooling/.docs'),
        projects = {};
    Fs.readdirSync(baseDir).forEach(name => {
        projects[name] = getProject(name, withBundles, baseDir);
    });
    return projects;
}

/**
 * Gets a project by the given name.
 * 
 * @param String    name
 * @param Bool      withBundles
 * @param String    baseDir
 * 
 * @returns Object
 */
export function getProject(name, withBundles = false, baseDir = null) {
    var project,
        projectDir = Path.join(baseDir || Path.resolve(Url.fileURLToPath(import.meta.url), '../../views/tooling/.docs'), name),
        projectJsonFile;
    if (Fs.existsSync(projectJsonFile = Path.join(projectDir, '/project.json'))) {
        project = { name, ...JSON.parse(Fs.readFileSync(projectJsonFile)) };
    } else {
        project = { name };
    }
    if (withBundles) {
        var bundleJsonFile,
            bundleHtmlFile,
            bundles = {};
        if (Fs.existsSync(bundleJsonFile = Path.join(projectDir, '/bundle.html.json'))) {
            bundles.json = JSON.parse(Fs.readFileSync(bundleJsonFile));
        }
        if (Fs.existsSync(bundleHtmlFile = Path.join(projectDir, '/bundle.html'))) {
            bundles.html = Fs.readFileSync(bundleHtmlFile);
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
 * Categorizes the list of projects.
 * 
 * @param Object    projectsList
 * @param String    defaultCategory
 * 
 * @returns Array
 */
export function categorizeProjectsList(projectsList, defaultCategory = null) {
    var projectsListCategorized = {};
    _each(projectsList, (name, project) => {
        var categories = !project.categories.length && _isString(defaultCategory)
            ? [defaultCategory] 
            : project.categories;
        categories.forEach(c => {
            if (!projectsListCategorized[c]) {
                projectsListCategorized[c] = [];
            }
            projectsListCategorized[c].push(project);
        });
    });
    return Object.keys(projectsListCategorized).sort((a, b) => a.toLowerCase() === 'featured' || b.toLowerCase() === defaultCategory ? -1 : (a.toLowerCase() === defaultCategory || b.toLowerCase() === 'featured' ? 1 : a < b)).map(name => ({
        name,
        title: _toTitle(name),
        items: projectsListCategorized[name].sort((a, b) => a._before === b.name || a.name === b._after ? -1 : (a._after === b.name || b.name === a._before ? 1 : 0)),
    }));
}

/**
 * Accetps the list of project bundles
 * and returns a new project list in the same format as @getProjectsList().
 * 
 * @param Object    bundlesList
 * 
 * @returns Object
 */
export function getProjectDetailsFromBundlesEach(bundlesList) {
    const detailsAll = {};
    _each(bundlesList, (name, bundle) => {
        detailsAll[name] = getProjectDetailsFromBundle(name, bundle);
    });
    return detailsAll;
}

/**
 * Accetps a project bundle
 * and returns the project in the same format as @getProject().
 * 
 * @param String    name
 * @param Object    bundle
 * 
 * @returns Object
 */
export function getProjectDetailsFromBundle(name, bundle) {
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
        ctaRef: `/tooling/${name}`,
        _after: projectInfo._after,
        _before: projectInfo._before,
    };
}
