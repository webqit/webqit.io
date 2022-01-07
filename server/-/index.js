
/**
 * @imports
 */
import Fs from 'fs';
import Path from 'path';
import _toTitle from '@webqit/util/str/toTitle.js';
import _unique from '@webqit/util/arr/unique.js';
import Documentation from '../../src/Documentation.js';
import { createData, createNewOnlyTemplates } from '../../src/render-utils.js';

/**
 * Handles main HTTP process.
 * 
 * @param Request   event
 * @param any       recieved
 * @param function  next
 * 
 * @return object
 */
export default async function(event, recieved, next) {
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
    data.projectsBody = Object.values(documentation.getProjectsList(false, true));
    data.projectsFilter = [{ title: 'All Categories', href: '?category=' }].concat(_unique(data.projectsBody.reduce((categories, item) => categories.concat(item.categories), [])).map(category => ({
        title: category,
        href: '?category=' + category,
    })));
    //await new Promise((res, rej) => setTimeout(res, 2000));
    return { ...data, ...staticPageData[data.wbdiv] };
}

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
}

/**
 * @static-content
 */
const staticPageData = {
    tooling: {
        headline: 'Open source tooling for web-native development',
        intro: 'Explore the complete JavaScript stack for developing future-facing, web-native applications.',
        startersTitle: 'Quick Start',
        startersIntro: 'Check out some quick examples to get started!',
        startersIntro2: '<i>(All coming soon)</i>',
        starters: [{
            title: 'Hello frontend',
            desc: 'Demos of plain HTML, CSS, and JavaScript, with some of <i>OOHTML</i> and <i>Play UI</i>',
        }, {
            title: 'Hello backend',
            desc: 'Demos of NodeJS and <i>Webflo</i> - covering API backends, Server-Side Rendering, Integrations, etc.',
        }, {
            title: 'Hello fullstack',
            desc: 'Demos of fullstack code - same HTML, CSS, and JavaScript running everywhere (frontend and backend)',
        }, {
            title: 'All things data',
            desc: 'Demos of both data APIs and plain SQL (frontend and backend), with some of <i>Objective SQL</i>',
        }, {
            title: 'An application',
            desc: 'Full-code demos of an application',
        }],
        ideaStart: [
            'Now that web standards are rising fast to solve our toughest problems natively, <a target="_blank" href="https://dev.to/fredericbonnet/the-third-age-of-web-development-kgj">a '
            + 'new direction for the web</a> is clear: <b>web-native<sup><a href="/web-native"><i class="bi bi-info-square"></i></a></sup> development</b>! For all we\'ve bet on '
            + '<i>custom</i> tooling, we must now explore new ways to leverage and extend what\'s <i>natively</i> available!',
            'Here\'s to that a brief tour 👇',
        ],
        ideaBody: [
            {
                title: 'Meet Web Components',
                intro: '<a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/Web_Components">WCs</a> are the web\'s native "UI component" technology',
                content: 'Already a fan? Try authoring simpler components with <b><a href="/tooling/oohtml/docs/spec/subscript#subscript-element-mixin">Subscript Element</a></b> - a base class for WCs that adds <i>reactivity</i> to your <i>static WC code</i> without itself acting as a "framework".',
                img: '',
            },
            {
                title: 'Meet Progressive Web Apps',
                intro: '<a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps">PWAs</a> are the web\'s standard for cross-platform apps',
                content: 'In the time it takes to learn anything else, you would have just written some HTML, CSS and JS and come off with a Progressive Web App!<br />- <i><a href="/tooling/webflo">Simplicity by <b>Webflo</b></a></i>.',
                img: '',
            },
            {
                title: 'Meet the Fetch Standard',
                intro: '<a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API">Fetch</a> is the web\'s "request/response" spec and API',
                content: 'Build your app\'s concept of requests and responses on the fetch standard! Just use <b>Webflo</b> - to do this in a <a href="/tooling/webflo">unified routing experience</a> - one standard, frontend and backend!',
                img: '',
            },
            {
                title: 'Meet the Open API Specification',
                intro: '<a target="_blank" href="https://www.openapis.org/">OAS</a> is the community standard for REST API schemas',
                content: 'In just a schema, your backend can be up for discoverability and integrations, and a whole world of cool automations - e.g: <a href="#">schema-based routing</a>, <a href="#">schema-generated UI forms</a>, etc.',
                img: '',
            },
            {
                title: 'Meet SQL (in unlikely places too!)',
                intro: '<a target="_blank" href="https://en.wikipedia.org/wiki/SQL">SQL</a> is the web\'s standard language for relational DBs',
                content: "Already a fan? Try sticking to just SQL and eliminating the ORM - here's " + '<a href="/tooling/objective-sql//docs/getting-started/overview#what-about-relationships---the-language">arrow-joins for relationships</a>!😎 Plus, ever need to work with the client-side <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API">Indexed DB</a>? <a href="/tooling/objective-sql/docs/getting-started/overview#basic-usage">Bring your SQL here too!</a>',
                img: '',
            },
            {
                title: 'Meet the ES6+ series',
                intro: '<a target="_blank" href="https://www.w3schools.com/js/js_es6.asp">ES6</a> is the beginning of JavaScript\'s ultra-modern era',
                content: 'Immerse in JavaScript\'s cool language features. You can also find some of it\'s <i>low-level</i> primitives abstracted away with higher-level APIs (E.g: <a href="/tooling/observer">the Observer API</a> over <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy">ES6 Proxies</a> &amp; <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors">object accessors</a>)',
                img: '',
            },
            {
                title: 'Meet browser APIs, simplified',
                intro: '<a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API">Browser APIs</a> are ready-to-use features in browsers',
                content: 'Try <a href="/tooling/play-ui/docs/api/ui/play"><code>$.play()</code>-ing</a> away in the <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API">Web Animations API</a>, or <a href="#">binding your page</a> to the <a target="_blank" href="https://webmonetization.org/">Web Monetization API</a> - just to mention a few ways to consume browser APIs with zero boilerplate!',
                img: '',
            },
        ],
        ideaEnd: [
            'It\'s <i>an entirely clean fabric</i> for writing code in the syntax of web standards and for making better web apps that we\'ll call <i>web-native apps</i>!',
            'Get your life\'s work off to a good start - here!',
        ],
    },
    cloud: {
        headline: 'Instant, open source cloud for web-native apps',
        intro: 'Go live on an instant, zero-ops infrastructure built for the web-native experience!',
        startersTitle: 'Quick Start',
        startersIntro: 'Run a quick sample on WebQit Cloud to get started!',
        startersIntro2: '<i>(All coming soon)</i>',
        starters: [{
            title: 'Realtime chat app',
            desc: 'Click to view and deploy - chat app as a Progressive Web App',
        }, {
            title: 'Audio books database',
            desc: 'Click to view and deploy - a database instance for an audio book app, with instant REST API',
        }, {
            title: 'Subscription and Auth',
            desc: 'Click to view and deploy - an Stripe subscription app with OAuth2 flow',
        }, {
            title: 'Online store',
            desc: 'Click to view and deploy - a mini online store with subscription and auth',
        }, {
            title: 'Online store (micro services)',
            desc: 'Click to view and deploy - a mini online store in  Micro Services architecture',
        }],
        ideaStart: [
            'Provisioning and "baby-sitting" infrastructure can be a terrible job! '
            + 'Modern wisdom is to find a leverage - this time, on a <i>Web-Native</i>-ready cloud that\'s designed to give you <i>the speedpoints</i> '
            + 'you\'ll need on every dev &amp; deployment cycle, and to give your end-users <i>the most realtime experience</i> on their every touchpoint!',
            'Here\'s your ideal infrastructure 👇',
        ],
        ideaBody: [
            {
                title: 'Instant by design',
                intro: 'Comes fully Web-Native-ready',
                content: 'Skip all the work with orchestrating containers and the total list of your backend software! Get your services running in the same tick as a (<a href="#">UI</a>) click, or (<a href="#">Terminal</a>) command, or (<a href="#">API</a>) call.',
                img: '',
            },
            {
                title: 'ZeroOps by design',
                intro: 'Gets it all going totally hands-free',
                content: 'Staying awake to keep infrastructure awake is non-trivial business... that starves the main business! A better idea is to get your service lifecycle <a href="#">fully monitored and managed</a>!',
                img: '',
            },
            {
                title: 'Auto-scaling by design',
                intro: 'Auto-allocates resources based on runtime demands',
                content: 'Think big on an enterprise-ready infrastructure but keep things streamlined when workloads are small, or just periodic! Your services are dynamically-scaled for optimal uptime and speed!',
                img: '',
            },
            {
                title: 'Distributed by design',
                intro: 'Gets your web-native app distributed for speeeed',
                content: 'This takes advantage of the simple, static nature of Web-Native frontends. Each deploy sends off your <code>/public</code> directory into a Content Delivery Network (CDN) to be served close to your users.',
                img: '',
           },
            {
                title: 'Git-based by design',
                intro: 'Comes fully integrated into your Git workflow',
                content: 'Just code and <i>git</i>-push, and see every update roll - from your repository to the cloud, to your users! You simply connect your repo... and a fully-featured CI/CD pipeline kicks in!',
                img: '',
            },
            {
                title: 'Open source by design',
                intro: 'Sits on the freedom of open source software',
                content: 'An open source philosophy gives you the perfect extension of the freedom and decentralization of web-native development! You\'re welcome home with your web-native app!',
                img: '',
            },
        ],
        ideaEnd: [
            'It\'s the path of least engineering with multiple <i>developer leveragepoints</i>, <i>enterprise-level guarantees</i>, and <i>user experience wins</i>!',
            'Get overnight ideas launched by morning - here!',
        ],
    },
    community: {
        headline: 'Community initiatives for web-native development',
        intro: 'Join in the conversation and community-wide initiatives for web-native development!',
        startersTitle: 'Quick Start',
        startersIntro: 'Join the web-native movement!',
        startersIntro2: '<i>(More coming soon)</i>',
        starters: [{
            title: 'WebQit Github',
            desc: 'Click to follow us and our open source work on Github! Ask questions, raise issues, make pull requests.',
            href: 'https://github.com/webqit',
        }, {
            title: 'WebQit Twitter',
            desc: 'Click to follow WebQit on Twitter. Join conversations with hashtags #GoWebNative, #JustUseThePlatform!',
            href: 'https://twitter.com/@Web_Qit',
        }, {
            title: 'The Web-Native CG',
            desc: 'Click to join the Web-Native Community Group. It\'s free and open!',
            href: 'https://w3.org/community/web-native',
        }],
        ideaStart: [
            'The conversation around web-native development is happening right now - more than ever before - across blogs, twitter, etc! '
            + 'But the path to making it ubiquitous and something that is everyone\'s winning culture might still be a long way ahead! '
            + 'We\'ll need focused initiatives to facilitate it all - through participation, education, etc!',
            'We\'re happy to join forces with you to develop initiatives that move the web forward 🤝',
        ],
        ideaBody: [],
        ideaEnd: [
            '#GoWebNative, #JustUseThePlatform',
            'Follow WebQit, Inc. - <a href="https://twitter.com/@Web_Qit" target="_blank"><i class="bi bi-twitter"></i> @Web_Qit</a>',
        ],
    }
};
