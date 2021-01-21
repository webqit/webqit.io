
/**
 * @imports
 */
import Fs from 'fs';
import Path from 'path';
import { get, getAll, detailsAll } from '../../common/projects-utils.js';
import { render as packageRender } from '../../common/package.js';

/**
 * Handles main HTTP process.
 * 
 * @param object    process
 * @param any       recieved
 * @param function  next
 * 
 * @return object
 */
export default async function(flo, recieved, next) {
    if ((next.pathname || '').startsWith('.')) {
        return next();
    }
    var outlineFile, outline = Fs.existsSync(outlineFile = Path.join(flo.setup.ROOT, flo.setup.PUBLIC_DIR, 'bundle.html.json')) 
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
 * @param object    data
 * @param window    _window
 * @param function  next
 * 
 * @return window
 */
export async function render(data, _window, next) {
    const window = await next();
    await packageRender(window, data, this.pathname, next.pathname);
    return window;
};