
/**
 * @imports
 */
import '@webqit/play-sequence/src/browser-entry.js';
import List from '../src/List.js';

/**
 * Handles main HTTP process.
 * 
 * @param Request   request
 * @param Any       recieved
 * @param Function  next
 * 
 * @return object
 */
export default async (request, recieved, next) => {
    if (next.pathname) {
        return next();
    }
    if (!cache) {
        cache = await next();
    }
    return {fromCache: true, ...cache};
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
    if (!next.pathname) {
        if (!data.fromCache) {
            data.sections.forEach(s => {
                s.featured = List.create(s.featured.map((item, i) => ({active: i === 0, overflowCollapsed: false, ...item})));
            });
        }
    }
    return next(data);
}