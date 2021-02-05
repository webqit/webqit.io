
/**
 * @imports
 */
import '@webqit/play-sequence/src/browser-entry.js';
import List from '../common/List.js';

/**
 * Handles main HTTP process.
 * 
 * @param object    process
 * @param any       recieved
 * @param function  next
 * 
 * @return object
 */
var cache;
export default async (process, recieved, next) => {
        return next();
    if (next.pathname) {
    }
    if (!cache) {
        cache = await next();
    }
    return {...cache};
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
    if (!next.pathname) {
        const createList = items => List.create(items.map((item, i) => ({active: i === 0, overflowCollapsed: false, ...item})));
        data.outline = createList(data.outline);
        data.tooling = createList(data.tooling);
        data.cloud = createList(data.cloud);
        data.community = createList(data.community);
    }
    return next();
}