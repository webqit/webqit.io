
/**
 * @imports
 */
import { getAll, detailsAll } from '../common/projects-utils.js';
import List from '../common/List.js';

/**
 * Handles main HTTP process.
 * 
 * @param object    process
 * @param any       recieved
 * @param function  next
 * 
 * @return object
 */
export default async (flo, recieved, next) => {
    if (next.pathname) {
        return next();
    }
    const outline = [
        {
            icon: 'code-slash',
            title: 'tooling',
            desc: 'The web tooling project.',
            desc2: 'Leverage some magic to write less code',
            desc3: '13',
            intro: [
                {icon: 'code-slash', content: 'WebQit\'s opensource web tooling project.'},
                {icon: 'arrow-return-right', content: '...leverage some magic to write less code!'},
            ],
            graphic: '/img/Globe.svg',
            active: true,
            lightTheme: {color: 'black', backgroundColor: 'ghostwhite'},
            darkTheme: {color: 'white', backgroundColor: 'slateblue'},
        }, {
            icon: 'cloud',
            title: 'cloud',
            desc: 'The WebQit platform & APIs.',
            desc2: 'Take apps to production faster; scale to your imagination',
            desc3: '2',
            intro: [
                {icon: 'cloud', content: 'WebQit\'s fully-managed platform and APIs'},
                {icon: 'arrow-return-right', content: '...take apps to production faster; scale to your imagination!'},
            ],
            graphic: '/img/Globe.svg',
            active: false,
            lightTheme: {color: 'black', backgroundColor: 'ghostwhite'},
            darkTheme: {color: 'white', backgroundColor: 'slateblue'},
        }, {
            icon: 'flag',
            title: 'community',
            desc: 'WebQit community initiatives.',
            desc2: 'Join our vibrant opensource communities',
            desc3: '2',
            intro: [
                {icon: 'flag', content: 'WebQit\'s community initiatives and web standardization efforts'},
                {icon: 'arrow-return-right', content: '...join in with your voice!'},
            ],
            graphic: '/img/Globe.svg',
            active: false,
            lightTheme: {color: 'black', backgroundColor: 'ghostwhite'},
            darkTheme: {color: 'white', backgroundColor: 'slateblue'},
        },
    ];
    const tooling = detailsAll(getAll(), true);
    const cloud = [{
        icon: 'clock',
        name: 'Platform',
        title: 'Webflo Cloud',
        desc: 'WebQit Dev global deployment feef efedefe',
        items: [],
    }, {
        icon: 'clock',
        name: 'Database',
        title: 'Objective DB',
        desc: 'WebQit Dev global deployment feef efedefe',
        items: [],
    }];
    const community = [{
        icon: 'clock',
        name: 'WebQit',
        title: 'WebQit Community',
        desc: 'WebQit Dev global deployment feef efedefe',
        items: [],
    }, {
        icon: 'clock',
        name: 'Web-Native',
        title: 'Web-Native (W3C) Community Group',
        desc: 'WebQit Dev global deployment feef efedefe',
        items: [],
    }];
    return {
        title: 'The WebQit Project',
        outline,
        tooling,
        cloud,
        community,
    }
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
    if (!next.pathname) {
        const createList = items => List.create(items.map((item, i) => ({active: i === 0, overflowCollapsed: false, ...item})));
        data.outline = createList(data.outline);
        data.tooling = createList(data.tooling);
        data.cloud = createList(data.cloud);
        data.community = createList(data.community);
    }
    return next();
}