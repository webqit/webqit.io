
/**
 * @imports
 */
import List from './List.js';
import _last from '@webqit/util/arr/last.js';

/**
 * @package/createData
 * 
 * @param Object    data
 * @param String    next_pathname
 * 
 * @return Object
 */
export function createData(data, next_pathname) {
    if (data.project) {
        data.outline.subtree.tooling.subtree[data.project.name] = data.project.json;
    }
    const nav = List.fromOutline(data.outline.subtree, true);
    const breadcrumb = next_pathname.split('/').reduce((breadcrumb, item, i) => {
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
    const title = breadcrumb.slice().reverse().map(item => !item ? '' : item.title).join(' | ');
    return {
        nav,
        breadcrumb,
        title,
        ...data
    };
};

/**
 * @package/createNewOnlyTemplates
 * 
 * @param Object    data
 * @param String    next_pathname
 * 
 * @return Void
 */
export function createNewOnlyTemplates(window, data) {
    var tempTooling, tempApp = window.document.templates.page;
    if (data.project && (tempTooling = tempApp.templates.tooling) && !tempTooling.templates[data.project.name]) {
        var tempPackage = window.document.createElement('template');
        tempPackage.setAttribute('name', data.project.name);
        tempPackage.innerHTML = data.project.html;
        tempTooling.content.append(tempPackage);
    }
};