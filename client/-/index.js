
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
export default async function(request, recieved, next) {
    const domain = this.pathname.split('/').pop();
    if (!['tooling', 'cloud', 'community'].includes(domain)) {
        return next(); 
    }
    var fetchName = [domain].concat(next.pathname ? next.pathname.split('/')[0] : []).join('/');
    if (!cache[fetchName]) {
        cache[fetchName] = await next();
    }
    return cache[fetchName];
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
export async function render_(request, data, next) {
    const window = await next(createData(data, next.pathname));
    createNewOnlyTemplates(window, data, next.pathname);
    return window;
}