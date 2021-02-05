
/**
 * @imports
 */
import { render as packageRender } from '../../common/package.js';

/**
 * @var object
 */
const cache = {};

/**
 * Handles main HTTP process.
 * 
 * @param object    process
 * @param any       recieved
 * @param function  next
 * 
 * @return object
 */
export default async function(process, recieved, next) {
    if (!next.pathname) {
        return next();
    }
    var pkgName = (next.pathname || '').split('/')[0] || '';
    if (!cache[pkgName]) {
        cache[pkgName] = await next();
    }
    return cache[pkgName];
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