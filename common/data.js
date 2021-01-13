
/**
 * @imports
 */
import List from './List.js';

export const outline = List.create([
    {
        icon: 'code-slash',
        title: 'tooling',
        desc: 'modern opensource tooling.',
        intro: [
            {icon: 'square', content: 'Leverage some magic to write less code!'},
            {icon: 'arrow-return-right', content: '...explore a growing collection of opensource work!'},
        ],
        graphic: '/img/editor-ctrlshiftp.gif',
        active: true,
        lightTheme: {color: 'black', backgroundColor: 'ghostwhite'},
        darkTheme: {color: 'white', backgroundColor: 'slateblue'},
    }, {
        icon: 'cloud',
        title: 'cloud',
        desc: 'the WebQit platform and APIs.',
        intro: [
            {icon: 'square', content: 'Fasttrack how you build, ship, and scale!'},
            {icon: 'arrow-return-right', content: '...enjoy the WebQit advantage in the cloud!'},
        ],
        graphic: '/img/globe@2x-kgv9ll4o7r-havl08h54l.png',
        active: false,
        lightTheme: {color: 'purple', backgroundColor: 'wheat'},
        darkTheme: {color: 'wheat', backgroundColor: 'purple'},
    }, {
        icon: 'flag',
        title: 'community',
        desc: 'shaping the web of the future.',
        intro: [
            {icon: 'square', content: 'The web is all of us - join in shaping it!'},
            {icon: 'arrow-return-right', content: '...or discover new heights for your career!'},
        ],
        graphic: '/img/dna.fw.png',
        active: false,
        lightTheme: {color: 'black', backgroundColor: 'lightcyan'},
        darkTheme: {color: 'white', backgroundColor: 'teal'},
    },
]);

setTimeout(() => {
    if (typeof window !== 'undefined') {
        window.WQ.Observer.observe(outline.state.active, e => {
            console.log('-----------', outline.state.active.slice());
        }, {subtree: true});
    }
}, 100);

export const tooling = List.create([
    {
        name: 'Featured',
        active: true,
        overflowCollapsed: false,
        items: [{
            icon: 'app-indicator',
            title: 'Webflo',
            desc: 'The universal JavaScript framework - Web, Mobile, API Backends.',
            page: '/tooling/Webflo',
            github: 'webqit/Webflo',
        }, {
            icon: 'layers',
            title: 'Objective SQL',
            desc: 'Fullstack, object-oriented SQL for modern apps - one SQL, multiple technologies.',
            page: '/tooling/objective-sql',
            github: 'webqit/objective-sql',
        }, {
            icon: 'code-slash',
            title: 'OOHTML',
            desc: 'Object-Oriented HTML (OOHTML) - a <a target="_blank" href="https://discourse.wicg.io/t/proposal-chtml/4716">WICG proposal</a>.',
            page: '/tooling/oohtml',
            github: 'webqit/oohtml',
        }],
    }, {
        name: 'Primitives',
        active: false,
        overflowCollapsed: false,
        items: [{
            icon: 'braces',
            title: 'Observer',
            desc: 'Observability and Interceptability for JavaScript Objects and Arrays.',
            page: '/tooling/observer',
            github: 'webqit/observer',
        }, {
            icon: 'box',
            title: 'Observables',
            desc: '<a target="_blank" href="/tooling/observer">Observer</a>-based JavaScript components and browser APIs.',
            page: '/tooling/observables',
            github: 'webqit/observables',
        }, {
            icon: 'terminal',
            title: 'Subscript',
            desc: 'A pseudo implementation (parser + runtime) of the JavaScript language.',
            page: '/tooling/subscript',
            github: 'webqit/subscript',
        }, {
            icon: 'square',
            title: 'Util',
            desc: 'A comprehensive set of utilities over JavaScript primitives.',
            page: '/tooling/util',
            github: 'webqit/util',
        }],
    }, {
        name: 'Frontend',
        active: false,
        overflowCollapsed: false,
        items: [{
            icon: 'play',
            title: 'Play UI',
            desc: 'Here is an ecosystem of toolsere i]ere is an ecosystem of tools.',
            page: '/tooling/objective-sql',
            github: 'webqit/objective-sql',
        }, {
            icon: 'square',
            title: 'Browser Pie',
            desc: 'Here is an ecosysstem of toolsere is an ecosystem of tools.',
            page: '/tooling/observer',
            github: 'webqit/observer',
        }],
    }, {
        name: 'Backend',
        active: false,
        overflowCollapsed: false,
        items: [{
            icon: 'square',
            title: 'Backpack',
            desc: 'Here is an ecosystem of toolsere idje fef wdee is an ecosystem of tools.',
            page: '/tooling/observer',
            github: 'webqit/observer',
        }, {
            icon: 'square',
            title: 'Pseudo Browser',
            desc: 'Here is an ecosystem of toolsere idje fef wdee is an ecosystem of tools.',
            page: '/tooling/observer',
            github: 'webqit/observer',
        }],
    }, {
        name: 'Build Tools',
        active: false,
        overflowCollapsed: false,
        items: [{
            icon: 'command',
            title: 'OOHTML-CLI',
            desc: 'Here is an ecosystem of toolsere idje fef wdee is an ecosystem of tools.',
            page: '/tooling/observer',
            github: 'webqit/observer',
        }],
    }, {
        name: 'Integrations',
        active: false,
        overflowCollapsed: false,
        items: [{
            icon: 'box-arrow-in-right',
            title: 'OAuth2 Node Client',
            desc: 'Here is an ecosystem of toolsere idje fef wdee is an ecosystem of tools.',
            page: '/tooling/observer',
            github: 'webqit/observer',
        }],
    },
]);

export const cloud = List.create([
    {
        name: 'Webflo Cloud',
        active: true,
        overflowCollapsed: false,
        icon: 'clock',
        title: 'Webflo Cloud',
        desc: 'WebQit Dev global deployment feef efedefe',
        items: [{
            icon: 'menu',
            title: 'WebQit Developer',
            desc: 'WebQit Dev global deployment feef efedefe',
            page: '/cloud/wnd',
        }, {
            icon: 'menu',
            title: 'WebQit Developer',
            desc: 'WebQit Dev glal deployment',
            page: '/cloud/wnd',
        }, {
            icon: 'menu',
            title: 'WebQit Developer',
            desc: 'WebQit Dev globaob efefe efel deployment',
            page: '/cloud/wnd',
        }],
    }, {
        name: 'Objective DB',
        active: false,
        overflowCollapsed: false,
        icon: 'clock',
        title: 'Objective DB',
        desc: 'WebQit Dev global deployment feef efedefe',
        items: [{
            icon: '/img/bg/1586800192-terraformassociateweb.png',
            title: 'WebQit Developer',
            desc: 'WebQit Dev global deployment',
            page: '/cloud/wnd',
        }, {
            icon: '/img/bg/1586800192-terraformassociateweb.png',
            title: 'WebQit Developer',
            desc: 'WebQit Dev global deployment',
            page: '/cloud/wnd',
        }],
    },
]);

export const community = List.create([
    {
        name: 'WebQit Community',
        active: true,
        overflowCollapsed: false,
        icon: 'clock',
        title: 'WebQit Community',
        desc: 'WebQit Dev global deployment feef efedefe',
        items: [{
            icon: '/img/bg/1586800192-terraformassociateweb.png',
            title: 'WebQit Developer',
            desc: 'Here is an ecosystem of toolser Here is an ecosystem of toolser',
            page: '/cloud/wnd',
        }, {
            icon: '/img/bg/1586800192-terraformassociateweb.png',
            title: 'WebQit Developer',
            desc: 'Here is an ecosystem of toolser Here is an ecosystem of toolser',
            page: '/cloud/wnd',
        }, {
            icon: '/img/bg/1586800192-terraformassociateweb.png',
            title: 'WebQit Developer',
            desc: 'Here is an ecosystem of toolser Here is an ecosystem of toolser',
            page: '/cloud/wnd',
        }],
    }, {
        name: 'Web-Native CG',
        active: false,
        overflowCollapsed: false,
        icon: 'clock',
        title: 'Web-Native (W3C) Community Group',
        desc: 'WebQit Dev global deployment feef efedefe',
        items: [{
            icon: '/img/bg/1586800192-terraformassociateweb.png',
            title: 'WebQit Developer',
            desc: 'Here is an ecosystem of toolser Here is an ecosystem of toolser',
            page: '/cloud/wnd',
        }, {
            icon: '/img/bg/1586800192-terraformassociateweb.png',
            title: 'WebQit Developer',
            desc: 'Here is an ecosystem of toolser Here is an ecosystem of toolser',
            page: '/cloud/wnd',
        }, {
            icon: '/img/bg/1586800192-terraformassociateweb.png',
            title: 'WebQit Developer',
            desc: 'Here is an ecosystem of toolser Here is an ecosystem of toolser',
            page: '/cloud/wnd',
        }],
    },
]);