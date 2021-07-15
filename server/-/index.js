
/**
 * @imports
 */
import Fs from 'fs';
import Path from 'path';
import _toTitle from '@webqit/util/str/toTitle.js';
import Documentation from '../../src/Documentation.js';
import { createData, createNewOnlyTemplates } from '../../src/render-utils.js';

/**
 * Handles main HTTP process.
 * 
 * @param Request   request
 * @param any       recieved
 * @param function  next
 * 
 * @return object
 */
export default async function(request, recieved, next) {
    const domain = this.pathname.split('/').pop();
    if (!Object.keys(staticPageData).includes(domain)) {
        return next();
    }
    var outlineFile, outline = Fs.existsSync(outlineFile = Path.join(this.layout.ROOT, this.layout.PUBLIC_DIR, 'bundle.html.json')) 
        ? JSON.parse(Fs.readFileSync(outlineFile)) 
        : {};
    // ------------
    const data = {
        domain,
        title: `WebQit ${_toTitle(domain)}`, 
        outline,
    };
    // ------------
    const documentation = new Documentation(data.domain);
    if (!outline.subtree[data.domain].subtree) {
        outline.subtree[data.domain].subtree = {};
    }
    if (next.pathname) {
        var pathSplit = next.pathname.split('/');
        data.projectName = pathSplit.shift();
        outline.subtree[data.domain].subtree[data.projectName] = documentation.getProject(data.projectName, true/* withBundles */);
        if (pathSplit.length && !pathSplit.reduce((tree, seg) => tree && tree.subtree ? tree.subtree[seg] : null, outline.subtree[data.domain].subtree[data.projectName].bundles.json)) {
            return;
        }
    } else {
        var projects = documentation.getProjectsList();
        data.projects = documentation.categorizeProjectsList(projects, 'categories', 'more', false);
        data.outline.subtree[data.domain].subtree = projects;
        data.hero = staticPageData[data.domain];
    }
    return data;
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
    createNewOnlyTemplates(window, data, next.pathname);
    return window;
};


/**
 * @static-content
 */
const staticPageData = {
    tooling: {
        title: ['The tooling for', 'web-native', 'development.'],
        desc: 'Leverage open source tooling that meets the challenge with just conventional web languages and APIs!',
        quickstart: {type: 'code', directive: '#HTML, #CSS, #JS, #SQL', cta: {href: '#main', text: 'Explore',}},
        nav: [{
            href: '#',
            icon: 'braces',
        }],
        play: {href: '#'},
    },
    cloud: {
        title: ['The cloud for', 'web-native', 'development.'],
        desc: 'Jump on an instant, zero-ops and auto-scaling infrastructure built for the web-native experience!',
        quickstart: {type: 'code', directive: '#Compute, #Database', cta: {href: '#main', text: 'Explore',}},
        nav: [{
            href: '#',
            icon: 'cloud',
        }],
        play: {href: '#'},
    },
    community: {
        title: ['The community for', 'web-native', 'development.'],
        desc: 'Join the dev community\'s springboard and support system for web-native development!',
        quickstart: {type: 'code', directive: '#Web-Native, #WICG', cta: {href: '#main', text: 'Explore',}},
        nav: [{
            href: '#',
            icon: 'flag',
        }],
        play: {href: '#'},
    }
};