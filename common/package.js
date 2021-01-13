
/**
 * @imports
 */
import List from './List.js';
import _last from '@webqit/util/arr/last.js';

/**
 * @package/render
 * 
 * @param object    window
 * @param object    data
 * @param string    next_pathname
 * @param string    this_pathname
 * 
 * @return object
 */
export async function render(window, data, this_pathname, next_pathname) {
    await (new Promise(res => {
        window.document.addEventListener('templatesreadystatechange', res);
        if (window.document.templatesReadyState === 'complete') {
            res();
        }
    }));
    // ----------------
    var nav;
    if (0 && window.document.state.page.nav && ((data.project || {}).json || null) === (window.document.state.page.project || {}).json) {
        nav = window.document.state.page.nav;
    } else {
        var outline = data.outline;
        if (data.project) {
            outline.subtree.tooling.subtree[data.project.name] = data.project.json;
        }
        nav = List.fromOutline(outline.subtree, true);
    }
    var breadcrumb = next_pathname.split('/').reduce((breadcrumb, item, i) => {
        var last, itemObj;
        if ((last = _last(breadcrumb)) && (itemObj = ((last.subtree || {}).items || []).filter(_item => _item.name === item)[0])) {
            if (i === 0) {
                last.overflowCollapsed = false;
            }
            itemObj.overflowCollapsed = false;
            return breadcrumb.concat(itemObj);
        }
        return breadcrumb.concat(null);
    }, nav.items.filter(item => item.name === 'tooling')).filter(a => a);
    var title = breadcrumb.slice().reverse().map(item => !item ? '' : item.title).join(' | ');
    window.WQ.Observer.set(window.document.state.page, {nav, breadcrumb, title});
    // ----------------
    var tempTooling, tempApp = window.document.templates.page;
    if (data.project && (tempTooling = tempApp.templates.tooling) && !tempTooling.templates[data.project.name]) {
        var tempPackage = window.document.createElement('template');
        tempPackage.setAttribute('name', data.project.name);
        tempPackage.innerHTML = data.project.html;
        tempTooling.content.append(tempPackage);
    }

};