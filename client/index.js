
/**
 * @imports
 */
import '@webqit/play-sequence/src/browser-entry.js';
import List from '../src/List.js';

/**
 * @var Object
 */
var cache;

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
    return next();
    if (next.pathname) {
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
    return next(data);
}