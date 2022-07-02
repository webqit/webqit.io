
/**
 * @imports
 */
import { _toTitle } from '@webqit/util/str/index.js';
import Documentation from './Documentation.js';

/**
 * Handles main HTTP process.
 * 
 * @param HttpEvent     httpEvent
 * @param Any           context
 * @param Function      next
 * 
 * @return object
 */
export default async (httpEvent, context, next) => {
    if (next.pathname) {
        return next();
    }
    const getFeatured = domain => {
        const documentation = new Documentation(domain);
        return Object.values(documentation.getProjectsList()).filter(a => (a.categories || []).map(c => c.toLowerCase()).includes('featured'));
    };
    return {
        title: 'The WebQit Project',
        hero: {
            title: ['The tooling, cloud,', 'and community for', 'web-native', 'development.'],
            desc: 'Bank your life\'s work on open web standards; ride less on abstractions! We make all of that fun!',
            quickstart: {type: 'code', directive: '#WebNative, #OpenSource, #DevTools', cta: {href: '#domain--tooling', text: 'Explore',}},
            nav: [{
                href: '#domain--tooling',
                icon: 'braces',
            }, {
                href: '#domain--cloud',
                icon: 'cloud',
            }, {
                href: '#domain--community',
                icon: 'flag',
            }],
            play: {href: '#', icon: 'play',},
        },
        sections: [{
            name: 'tooling',
            title: 'Tooling',
            desc: 'Open source tooling that meets the challenge with native APIs and open web standards!',
            nav: [{href: '#domain--tooling', icon: 'braces',}],
            cta: {href: '/tooling', text: 'WebQit Tooling',},
            featured: getFeatured('tooling'),
        }, {
            name: 'cloud',
            title: 'Cloud',
            desc: 'Instant, zero-ops and auto-scaling infrastructure built for the web-native experience!',
            nav: [{href: '#domain--cloud', icon: 'cloud',}],
            cta: {href: '/cloud', text: 'WebQit Cloud',},
            featured: getFeatured('cloud'),
        }, {
            name: 'community',
            title: 'Community',
            desc: 'Community-wide initiatives, resources and support system for web-native development.',
            nav: [{href: '#domain--community', icon: 'flag',}],
            cta: {href: '/community', text: 'WebQit Community',},
            featured: getFeatured('community'),
        },],
    };
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
export async function render____(request, data, next) {
    return next(data);
}
