
/**
 * @imports
 */
import Fs from 'fs';
import Url from 'url';
import Path from 'path';
import _isString from '@webqit/util/js/isString.js';
import _toTitle from '@webqit/util/str/toTitle.js';
import _each from '@webqit/util/obj/each.js';
import { isString } from 'util';

export function get(name, withHTML = false) {
    const project = {name}, baseDir = Path.resolve(Url.fileURLToPath(import.meta.url), '../../views/tooling/.docs');
    var projectDir = Path.join(baseDir, name),
        htmlFile,
        jsonFile;
    if (!Fs.existsSync(jsonFile = Path.join(projectDir, '/bundle.html.json'))) {
        return;
    }
    project.json = JSON.parse(Fs.readFileSync(jsonFile));
    if (withHTML && Fs.existsSync(htmlFile = Path.join(projectDir, '/bundle.html'))) {
        project.html = Fs.readFileSync(htmlFile).toString();
    }
    return project;
};

export function getAll() {
    const projects = {}, baseDir = Path.resolve(Url.fileURLToPath(import.meta.url), '../../views/tooling/.docs');
    Fs.readdirSync(baseDir).forEach(name => {
        var jsonFile, resource = Path.join(baseDir, name);
        if (Fs.statSync(resource).isDirectory() && Fs.existsSync(jsonFile = Path.join(resource, '/bundle.html.json'))) {
            projects[name] = JSON.parse(Fs.readFileSync(jsonFile));
        }
    });
    return projects;
};

export function details(name, project) {
    var meta = project.meta || {};
    var readme = meta.readme || {};
    var title = readme.title || (readme.outline || []).length && readme.outline[0].level === 1 ? readme.outline[0].title : _toTitle(name);
    return {
        name,
        title,
        desc: readme.desc,
        icon: readme.icon,
        categories: (readme.categories || '').split(',').map(s => s.trim()).filter(s => s),
        tags: (readme.tags || '').split(',').map(s => s.trim()).filter(s => s),
        page: '/tooling/' + name,
        github: 'webqit/' + name,
        _after: readme._after,
        _before: readme._before,
    };
};

export function detailsAll(projects, categorization = false) {
    const _detailsAll = {};
    _each(projects, (name, project) => {
        var _details = details(name, project);
        if (categorization) {
            var categories = !_details.categories.length && _isString(categorization)
                ? [categorization] 
                : _details.categories;
            categories.forEach(c => {
                if (!_detailsAll[c]) {
                    _detailsAll[c] = [];
                }
                _detailsAll[c].push(_details);
            });
        } else {
            _detailsAll[name] = _details;
        }
    });
    if (categorization) {
        return Object.keys(_detailsAll).sort((a, b) => a.toLowerCase() === 'featured' || b === categorization ? -1 : (a === categorization || b === 'featured' ? 1 : a > b)).map(name => ({
            name,
            title: _toTitle(name),
            items: _detailsAll[name].sort((a, b) => a._before === b.name || a.name === b._after ? -1 : (a._after === b.name || b.name === a._before ? 1 : 0)),
        }));
    }
    return Object.values(_detailsAll);
}