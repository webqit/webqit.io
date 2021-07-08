
/**
 * @imports
 */
import _toTitle from '@webqit/util/str/toTitle.js';
import Documentation from '../src/Documentation.js';
import _delay from '@webqit/util/js/delay.js';

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
    
    await _delay(2000);
    return {
        title: 'The WebQit Project',
        hero: {
            title: ['The tooling, cloud,', 'and community for', 'web-native', 'development.'],
            desc: 'Introducing the path of least engineering with just conventional web languages and APIs!',
            quickstart: {type: 'code', directive: '#Tooling, #Cloud, #Community', cta: {href: '#domain--tooling', text: 'Explore',}},
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
            desc: 'Open source tooling that meets the challenge with just conventional web languages and APIs!',
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
            desc: 'The dev community\'s springboard and support system for web-native development.',
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
