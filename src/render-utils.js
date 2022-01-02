
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
var lastData, lastFullNav;
export function createData(data, next_pathname) {

    const fullNav = data === lastData ? lastFullNav : List.fromOutline(data.outline.subtree, true);
    const next_pathname_split = next_pathname ? next_pathname.split('/') : [];
    const breadcrumb = next_pathname_split.reduce((breadcrumb, item, i) => {
        var last, itemObj;
        if ((last = _last(breadcrumb)) && (itemObj = (last.subtree || []).filter(_item => _item.name === item)[0])) {
            if (i === 0) {
                last.overflowCollapsed = false;
            }
            itemObj.overflowCollapsed = false;
            return breadcrumb.concat(itemObj);
        }
        return breadcrumb.concat(null);
    }, fullNav.filter(item => item.name === data.wbdiv)).filter(a => a);
    var nav = fullNav.filter(n => n.name === data.wbdiv)[0].subtree;
    var breadcrumbMin = breadcrumb.reduce((build, item, i) => build.concat(i === 0 ? `WebQit ${item.title}` : (i === 1 || i === breadcrumb.length - 1 ? item.title : null)), []).filter(a => a);
    var projectTitle = breadcrumbMin[1], title = breadcrumbMin.reverse().join(' | ');
    if (next_pathname_split.length) {
        nav = nav.filter(n => n.name === next_pathname_split[0])[0].subtree;
    }
    if (nav) {
        nav.forEach(item => {
            item.isRoot = true;
        });
    }
    lastFullNav = fullNav;
    lastData = data;
    return {
        nav,
        fullNav,
        breadcrumb,
        ...data,
        projectTitle,
        title,
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
    var bundles, wbdivTemp, tempApp = window.document.templates['page'];
    if (data.projectName 
    && (bundles = data.outline.subtree[data.wbdiv].subtree[data.projectName].bundles)
    && (wbdivTemp = tempApp.templates[data.wbdiv]) 
    && !wbdivTemp.templates[data.projectName]) {
        var tempPackage = window.document.createElement('template');
        tempPackage.setAttribute('name', data.projectName);
        tempPackage.innerHTML = bundles.html;
        wbdivTemp.content.append(tempPackage);
    }
};