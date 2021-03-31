
/**
 * @imports
 */
import Fs from 'fs';
import Path from 'path';
import { get, getAll, detailsAll } from '../../src/projects-utils.js';
import { createData, createNewOnlyTemplates } from '../../src/render-utils.js';

/**
 * Handles main HTTP process.
 * 
 * @param Request   request
 * @param any       recieved
 * @param function  next
 * 
 * @return object
 */
export default async function(request, recieved, next) {
    if ((next.pathname || '').startsWith('.')) {
        return next();
    }
    var outlineFile, outline = Fs.existsSync(outlineFile = Path.join(this.layout.ROOT, this.layout.PUBLIC_DIR, 'bundle.html.json')) 
        ? JSON.parse(Fs.readFileSync(outlineFile)) 
        : {};
    if (!outline.subtree.tooling.subtree) {
        outline.subtree.tooling.subtree = {};
    }
    const data = {title: 'WebQit Tooling', outline};
    if (next.pathname) {
        var projectName = next.pathname.split('/')[0];
        data.project = get(projectName, true);
    } else {
        var projects = getAll();
        data.projects = detailsAll(projects, 'more');
        data.outline.subtree.tooling.subtree = projects;
    }
    return data;
};

/**
 * Creates and configures the rendering window.
 * 
 * @param Request   request
 * @param Object    data
 * @param Function  next
 * 
 * @return window
 */
export async function render(request, data, next) {
    const window = await next(createData(data, next.pathname));
    createNewOnlyTemplates(window, data);
    return window;
};