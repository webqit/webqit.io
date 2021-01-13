
/**
 * @imports
 */
//import _delay from '@webqit/util/js/delay.js';
import Fs from 'fs';
import Path from 'path';
import _toTitle from '@webqit/util/str/toTitle.js';
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
    var outlineFile, outline = Fs.existsSync(outlineFile = Path.join(flo.config.ROOT, flo.config.PUBLIC_DIR, 'bundle.html.json')) 
        ? JSON.parse(Fs.readFileSync(outlineFile)) 
        : {};
    if (!outline.subtree.tooling.subtree) {
        outline.subtree.tooling.subtree = {};
    }
    const data = {title: 'WebQit Tooling', outline};
    const baseDir = Path.resolve(this.dirname, '../../../webqit.docs');
    if (next.pathname) {
        var pathnameArray = next.pathname.split('/'),
            projectName = pathnameArray[0],
            projectDir = Path.join(baseDir, projectName),
            htmlFile,
            jsonFile;
        if (!Fs.existsSync(jsonFile = Path.join(projectDir, '/bundle.html.json'))) {
            return;
        }
        var html = (Fs.existsSync(htmlFile = Path.join(projectDir, '/bundle.html')) ? Fs.readFileSync(htmlFile) : '').toString();
        var json = JSON.parse(Fs.readFileSync(jsonFile));
        data.project = {
            name: projectName,
            json,
            html,
        }
    } else {
        Fs.readdirSync(baseDir).forEach(name => {
            var jsonFile, resource = Path.join(baseDir, name);
            if (Fs.statSync(resource).isDirectory() && Fs.existsSync(jsonFile = Path.join(resource, '/bundle.html.json'))) {
                data.outline.subtree.tooling.subtree[name] = JSON.parse(Fs.readFileSync(jsonFile));
            }
        });
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