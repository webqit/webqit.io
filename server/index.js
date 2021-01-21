
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
    ];
    const tooling = detailsAll(getAll(), true);
    const cloud = [{
        name: 'webflo-cloud',
        title: 'Webflo Cloud',
        desc: 'WebQit Dev global deployment feef efedefe',
    }, {
        name: 'objective-db',
        title: 'Objective DB',
        desc: 'WebQit Dev global deployment feef efedefe',
    }];
    const community = [{
        name: 'webqit-community',
        title: 'WebQit Community',
        desc: 'WebQit Dev global deployment feef efedefe',
    }, {
        name: 'web-native-cg',
        title: 'Web-Native (W3C) Community Group',
        desc: 'WebQit Dev global deployment feef efedefe',
    }];
    return {
        title: '::WebQit',
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