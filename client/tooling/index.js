
/**
 * @imports
 */
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
export default async (request, recieved, next) => {
    if (!next.pathname) {
        return next();
    }
    var pkgName = (next.pathname || '').split('/')[0] || '';
    if (!cache[pkgName]) {
        cache[pkgName] = await next();
    }
    console.log(cache[pkgName])
    return cache[pkgName];
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