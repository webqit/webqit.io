
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

    const fullNav = List.fromOutline(data.outline.subtree, true);
    const next_pathname_split = next_pathname ? next_pathname.split('/') : [];
    const breadcrumb = next_pathname_split.reduce((breadcrumb, item, i) => {
        var last, itemObj;
        if ((last = _last(breadcrumb)) && (itemObj = ((last.subtree || {}).items || []).filter(_item => _item.name === item)[0])) {
            if (i === 0) {
                last.overflowCollapsed = false;
            }
            itemObj.overflowCollapsed = false;
            return breadcrumb.concat(itemObj);
        }
        return breadcrumb.concat(null);
    }, fullNav.items.filter(item => item.name === data.domain)).filter(a => a);
    const title = breadcrumb.slice().reverse().map(item => !item ? '' : item.title).join(' | ');
    var nav = fullNav.items.filter(n => n.name === data.domain)[0].subtree;
    if (next_pathname_split.length) {
        nav = nav.items.filter(n => n.name === next_pathname_split[0])[0].subtree;
    }
    return {
        fullNav,
        nav,
        breadcrumb,
        title,
        ...data
    };
};

/**
 * @package/createNewOnlyTemplates
 * 
 * @param window    window
 * @param Object    data
 * @param String    next_pathname
 * 
 * @return Void
 */
export function createNewOnlyTemplates(window, data, next_pathname) {
    var bundles, domainTemp, tempApp = window.document.templates.page;
    if (data.projectName && (bundles = data.outline.subtree[data.domain].subtree[data.projectName].bundles)
    && (domainTemp = tempApp.templates[data.domain]) && !domainTemp.templates[data.projectName]) {
        var tempPackage = window.document.createElement('template');
        tempPackage.setAttribute('name', data.projectName);
        tempPackage.innerHTML = bundles.html;
        domainTemp.content.append(tempPackage);
    }
};