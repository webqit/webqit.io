
/**
 * @imports
 */
import _toTitle from '@webqit/util/str/toTitle.js';
import Documentation from '../src/Documentation.js';
import List from '../src/List.js';

/**
 * Handles main HTTP process.
 * 
 * @param Request   request
 * @param Any       recieved
 * @param Function  next
 * 
 * @return object
 */
export default async (request, recieved, next) => {
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
            desc: 'Introducing the path of least engineering with plain web languages and conventional paradigms!',
            ctas: [{href: '#domain--tooling', text: 'Explore',}],
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
            desc: 'Opensource web tooling that gets you working in plain web languages and conventional paradigms!',
            nav: [{href: '#domain--tooling', icon: 'braces',}],
            cta: {href: '/tooling', text: 'WebQit Tooling',},
            featured: getFeatured('tooling'),
        }, {
            name: 'cloud',
            title: 'Cloud',
            desc: 'Instant, auto-scaling and zero-ops infrastructure built for the web-native experience!',
            nav: [{href: '#domain--cloud', icon: 'cloud',}],
            cta: {href: '/cloud', text: 'WebQit Cloud',},
            featured: getFeatured('cloud'),
        }, {
            name: 'community',
            title: 'Community',
            desc: 'The support system for web-native development where a native-first approach meets the challenge!',
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
export async function render(request, data, next) {
    return next(data);
}
