
/**
 * @imports
 */
import _isObject from '@webqit/util/js/isObject.js';
import { createData, createNewOnlyTemplates } from '../../src/render-utils.js';

/**
 * @var object
 */
const cache = {};

/**
 * Handles main HTTP process.
 * 
 * @param Request   request
 * @param Any       recieved
 * @param Function  next
 * 
 * @return object
 */
export default async function(event, recieved, next) {
    const pathSplit = this.pathname.split('/');
    const wbdiv = pathSplit.pop();
    if (!['tooling', 'cloud', 'community'].includes(wbdiv)) {
        return next(); 
    }
    var fetchName = [wbdiv].concat(next.pathname ? next.pathname.split('/')[0] : []).join('/');
    if (!cache[fetchName]) {
        cache[fetchName] = await ( await next() ).json();
    }
    if (['tooling', 'cloud', 'community'].includes(wbdiv) && !next.pathname) {
        cache[fetchName].projectsBody.forEach(item => {
            item.categoryMismatch = event.url.query.category && !item.categories.includes(event.url.query.category);
        });
    }
    return JSON.parse(JSON.stringify(cache[fetchName]));
}

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
    createNewOnlyTemplates(window, data, next.pathname);
    return window;
}