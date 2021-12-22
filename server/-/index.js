
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
    const wbdiv = this.pathname.split('/').pop(), wbdivName = _toTitle(wbdiv);
    if (!Object.keys(staticPageData).includes(wbdiv)) {
        return next();
    }
    var outlineFile, outline = Fs.existsSync(outlineFile = Path.join(this.layout.ROOT, this.layout.PUBLIC_DIR, 'bundle.html.json')) 
        ? JSON.parse(Fs.readFileSync(outlineFile)) 
        : {};
    // ------------
    const data = {
        titleBar: `WebQit ${wbdivName}`, 
        wbdiv,
        wbdivName,
        outline,
    };
    // ------------
    const documentation = new Documentation(data.wbdiv);
    if (!outline.subtree[data.wbdiv].subtree) {
        outline.subtree[data.wbdiv].subtree = {};
    }
    if (next.pathname) {
        var pathSplit = next.pathname.split('/');
        data.projectName = pathSplit.shift();
        outline.subtree[data.wbdiv].subtree[data.projectName] = documentation.getProject(data.projectName, true/* withBundles */);
        if (pathSplit.length && !pathSplit.reduce((tree, seg) => tree && tree.subtree ? tree.subtree[seg] : null, outline.subtree[data.wbdiv].subtree[data.projectName].bundles.json)) {
            return next();
        }
        return data;
    }
    //var projects = documentation.getProjectsList();
    //data.projects = documentation.categorizeProjectsList(projects, 'categories', 'more', false);
    //data.outline.subtree[data.wbdiv].subtree = projects;
    return { ...data, ...staticPageData[data.wbdiv] };
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
export async function render_(request, data, next) {
    const window = await next(createData(data, next.pathname));
    createNewOnlyTemplates(window, data, next.pathname);
    return window;
};


/**
 * @static-content
 */
const staticPageData = {
    tooling: {
        headline: 'Open source tooling for web-native development',
        intro: 'Welcome to a radically simple, idiomatic approach to authoring future-facing apps.',
        projectsFilter: [
            {
                icon: 'braces',
                title: 'All',
                href: '#',
            }, {
                icon: 'cloud',
                title: 'Browser APIs',
                href: '#tooling',
            }, {
                icon: 'flag',
                title: 'JavaScript APIs',
                href: '#community',
            }, {
                icon: 'braces',
                title: 'SQL Standard',
                href: '#sql',
            }, {
                icon: 'cloud',
                title: 'Open API Standard',
                href: '#oas',
            }, {
                icon: 'flag',
                title: 'Utilities',
                href: '#community2',
            },
        ],
        projectsBody: [{}, {}, {}, {}, {}, {},],
        ideaStart: [
            'Now that web standards are rising fast to solve our toughest problems natively, <a target="_blank" href="https://dev.to/fredericbonnet/the-third-age-of-web-development-kgj">a '
            + 'new direction for the web</a> is clear: <b>web-native<sup><a href="/web-native"><i class="bi bi-info-square"></i></a></sup> development</b>! For all we\'ve bet on '
            + '<i>custom</i> tooling, we must now explore new ways to leverage and extend what\'s <i>natively</i> available!',
            'Here\'s to that a brief tour 👇',
        ],
        ideaBody: [
            {
                title: 'Meet Web Components',
                intro: '<a target="_blank" href="">WCs</a> are the web\'s native "UI component" technology',
                content: 'Already a fan? Try authoring simpler components with <b><a target="_blank" href="/tooling/oohtml/docs/spec/subscript">Subscript Element</a></b> - a base class for WCs that adds <i>reactivity</i> to your <i>static WC code</i> without itself acting as a "framework".',
            },
            {
                title: 'Meet Progressive Web Apps',
                intro: '<a target="_blank" href="">PWAs</a> are the web\'s standard for cross-platform apps',
                content: 'In the time it takes to learn anything else, you would have just written some HTML, CSS and JS and come off with a Progressive Web App!<br />- <i><a target="_blank" href="/tooling/webflo">Simplicity by <b>Webflo</b></a></i>.',
            },
            {
                title: 'Meet the Fetch Standard',
                intro: '<a target="_blank" href="">Fetch</a> is the web\'s "request/response" spec and API',
                content: 'Build your app\'s concept of requests and responses on the fetch standard! Just use <b>Webflo</b> - to do this in a <a target="_blank" href="/tooling/webflo">unified routing experience</a> - one standard, frontend and backend!',
            },
            {
                title: 'Meet the Open API Specification',
                intro: '<a target="_blank" href="">OAS</a> is the community standard for REST API schemas',
                content: 'In just a schema, your backend can be up for discoverability and integrations, and a whole world of cool automations - e.g: <a target="_blank" href="">schema-based routing</a>, <a target="_blank" href="">schema-generated UI forms</a>, etc.',
            },
            {
                title: 'Meet SQL (in unlikely places too!)',
                intro: '<a target="_blank" href="">SQL</a> is the web\'s standard language for relational DBs',
                content: "Already a fan? Try sticking to just SQL and eliminating the ORM - here's " + '<a target="_blank" href="">arrow-joins for relationships</a>!😎 Plus, ever need to work with the client-side <a target="_blank" href="">Indexed DB</a>? <a target="_blank" href="">Bring your SQL here too!</a>',
            },
            {
                title: 'Meet the ES6+ series',
                intro: '<a target="_blank" href="">ES6</a> is the beginning of JavaScript\'s ultra-modern era',
                content: 'Immerse in JavaScript\'s cool language features. You can also find some of it\'s <i>low-level</i> primitives abstracted away with higher-level APIs (E.g: <a target="_blank" href="">the Observer API</a> over <a target="_blank" href="">ES6 Proxies</a> &amp; <a target="_blank" href="">object accessors</a>)',
            },
            {
                title: 'Meet browser APIs, simplified',
                intro: '<a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API">Browser APIs</a> are ready-to-use features in browsers',
                content: 'Try <a target="_blank" href=""><code>$.play()</code>-ing</a> away in the <a target="_blank" href="">Web Animations API</a>, or <a target="_blank" href="">binding your page</a> to the <a target="_blank" href="">Web Monetization API</a> - just to mention a few ways to consume browser APIs with zero boilerplate!',
            },
        ],
        ideaEnd: [
            'It\'s <i>an entirely clean fabric</i> for writing code in the syntax of web standards and for making better web apps that we\'ll call <i>web-native apps</i>!',
            'Get your life\'s work off to a good start - here!',
        ],
    },
    cloud: {
        headline: 'Instant, open source Infra for web-native apps',
        intro: 'Go live on an instant, zero-ops infrastructure built for the web-native experience!',
        projectsFilter: [
            {
                icon: 'braces',
                title: 'All',
                href: '#tooling',
            }, {
                icon: 'braces',
                title: 'Compute',
                href: '#compute',
            }, {
                icon: 'braces',
                title: 'Storage',
                href: '#storage',
            }, {
                icon: 'braces',
                title: 'Auth',
                href: '#auth',
            },
        ],
        projectsBody: [{}, {}, {},],
        ideaStart: [
            'Provisioning and "baby-sitting" infrastructure can be a fulltime job! '
            + 'Modern wisdom is to find a leverage - this time, on a <i>Web-Native</i>-ready cloud that\'s designed to give you <i>multiple developer speedpoints</i> on every dev &amp; deployment cycle, and to give your end-users <i>the most-instant experience</i> on every touchpoint!',
            'Here\'s your ideal infrastructure in a story 👇',
        ],
        ideaBody: [
            {
                title: 'Instant by design',
                intro: 'Comes fully Web-Native-ready and instant',
                content: 'Skip all the work with orchestrating containers and the total list of your backend software! Get your services running in the same tick as a (<a href="">UI</a>) click, or (<a href="">Terminal</a>) command, or (<a href="">API</a>) call.',
            },
            {
                title: 'ZeroOps by design',
                intro: 'Gets it all going totally hands-free',
                content: 'Staying awake to keep infrastructure awake is terrible business... that starves the main business! A better idea is to get your service lifecycle <a href="">fully monitored and managed</a>!',
            },
            {
                title: 'Auto-scaling by design',
                intro: 'Keeps resource allocation in sync with runtime demands',
                content: 'Think big on an enterprise-ready infrastructure but keep things streamlined when workloads are small, or just periodic! Your service is dynamically-scaled for optimal performance and availability!',
            },
            {
                title: 'Distributed by design',
                intro: 'Gets your web-native app distributed for speeeed',
                content: 'This takes advantage of the simple, static nature of Web-Native frontends. Each deploy sends off your <code>/public</code> directory into a Content Delivery Network (CDN) to be served close to your users.',
            },
            {
                title: 'Git-based by design',
                intro: 'Comes fully integrated into your Git workflow',
                content: 'Just code and <i>git</i>-push, and see every update roll - from your repository to the cloud; to your users! Simply connect your repo... and a fully-featured CI/CD pipeline kicks in!',
            },
            {
                title: 'Open source by design',
                intro: 'Sits on the freedom of open source software',
                content: 'An open source philosophy gives you the perfect extension of the freedom and decentralization of web-native development! Welcome home with your web-native app!',
            },
        ],
        ideaEnd: [
            'It\'s the path of least engineering with multiple <i>developer leveragepoints</i>, <i>enterprise-level guarantees</i>, and <i>user experience wins</i>!',
            'Get overnight ideas launched by morning - here!',
        ],
    },
    community: {
        headline: 'Open source infrastructure for web-native apps',
        intro: 'Welcome to a radically simple, idiomatic approach to authoring future-facing apps.',
        projectsFilter: [
            {
                icon: 'braces',
                title: 'All',
                href: '#tooling',
            }, {
                icon: 'braces',
                title: 'Compute',
                href: '#compute',
            }, {
                icon: 'braces',
                title: 'Storage',
                href: '#storage',
            }, {
                icon: 'braces',
                title: 'Auth',
                href: '#auth',
            },
        ],
        projectsBody: [{}, {}, {},],
        ideaStart: [
            'With "web-native"<sup><a href="/web-native"><i class="bi bi-info-square"></i></a></sup> emerging as the winning culture for the web,  infrastructure. '
            + 'WebQit Cloud is setup to extend the benefits and philosophies of this approach to life in production - in multiple ways that add up to give <i>you and your users</i> the <i>complete story</i>!',
            'Here\'s to that a brief tour 👇',
        ],
        ideaBody: [
            {
                title: 'Meet Web Components',
                intro: '<a target="_blank" href="">WCs</a> are the web\'s native "UI component" technology',
                content: 'Already a fan? Try authoring simpler components with <b><a target="_blank" href="/tooling/oohtml/docs/spec/subscript">Subscript Element</a></b> - a base class for WCs that adds <i>reactivity</i> to your <i>static WC code</i> without itself acting as a "framework".',
            },
            {
                title: 'Meet Progressive Web Apps',
                intro: '<a target="_blank" href="">PWAs</a> are the web\'s standard for cross-platform apps',
                content: 'In the time it takes to learn anything else, you would have just written some HTML, CSS and JS and come off with a Progressive Web App!<br />- <i><a target="_blank" href="/tooling/webflo">Simplicity by <b>Webflo</b></a></i>.',
            },
            {
                title: 'Meet the Fetch Standard',
                intro: '<a target="_blank" href="">Fetch</a> is the web\'s "request/response" spec and API',
                content: 'Build your app\'s concept of requests and responses on the fetch standard! Just use <b>Webflo</b> - to do this in a <a target="_blank" href="/tooling/webflo">unified routing experience</a> - one standard, frontend and backend!',
            },
            {
                title: 'Meet the Open API Specification',
                intro: '<a target="_blank" href="">OAS</a> is the community standard for REST API schemas',
                content: 'In just a schema, your backend can be up for discoverability and integrations, and a whole world of cool automations - e.g: <a target="_blank" href="">schema-based routing</a>, <a target="_blank" href="">schema-generated UI forms</a>, etc.',
            },
            {
                title: 'Meet SQL (in unlikely places too!)',
                intro: '<a target="_blank" href="">SQL</a> is the web\'s standard language for relational DBs',
                content: "Already a fan? Try sticking to just SQL and eliminating the ORM - here's " + '<a target="_blank" href="">arrow-joins for relationships</a>!😎 Plus, ever need to work with the client-side <a target="_blank" href="">Indexed DB</a>? <a target="_blank" href="">Bring your SQL here too!</a>',
            },
            {
                title: 'Meet the ES6+ series',
                intro: '<a target="_blank" href="">ES6</a> is the beginning of JavaScript\'s ultra-modern era',
                content: 'Immerse in JavaScript\'s cool language features. You can also find some of it\'s <i>low-level</i> primitives abstracted away with higher-level APIs (E.g: <a target="_blank" href="">the Observer API</a> over <a target="_blank" href="">ES6 Proxies</a> &amp; <a target="_blank" href="">object accessors</a>)',
            },
            {
                title: 'Meet browser APIs, simplified',
                intro: '<a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API">Browser APIs</a> are ready-to-use features in browsers',
                content: 'Try <a target="_blank" href=""><code>$.play()</code>-ing</a> away in the <a target="_blank" href="">Web Animations API</a>, or <a target="_blank" href="">binding your page</a> to the <a target="_blank" href="">Web Monetization API</a> - just to mention a few ways to consume browser APIs with zero boilerplate!',
            },
        ],
        ideaEnd: [
            'It\'s <i>an entirely clean fabric</i> for writing code in the syntax of web standards and for making better web apps that we\'ll call <i>web-native apps</i>!',
            'Get your life\'s work off to a good start - here!',
        ],
    }
};
