
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

    const featuredProjects = detailsAll(getAll(), false).filter(a => (a.categories || []).includes('Featured'));
    featuredProjects.forEach(p => {
        p.meta = [
            {title: 'Tags', desc: `#${p.tags.join(', #')}`},
            {title: 'License', desc: 'MIT'},
        ];
    });

    const sections = [{
        header: 'We work on low-abstraction tooling and potential web standards that make your code more native, universal, stable and future-proof.',
        footer: '',
        name: 'tooling',
        icon: 'braces',
        graphic: '/img/illus/tooling/dev.fw.png',
        title: 'Tooling',
        desc: 'WebQit\'s opensource web tooling project.',
        highlights: [
            {icon: 'braces', content: 'Do your magic using conventional paradigms!'},
            {icon: 'arrow-return-right', content: 'Write less, think less, and do more in the process!'},
        ],
        featured: featuredProjects,
    }, {
        header: 'We offer a purpose-built cloud for web-native development to give you the most streamlined way yet to build the most stable apps.',
        footer: '',
        name: 'cloud',
        icon: 'cloud',
        graphic: '/img/illus/cloud/images(35).fw.png',
        title: 'Cloud',
        desc: 'WebQit\'s fully-managed platform and APIs.',
        highlights: [
            {icon: 'cloud', content: 'Leverage the most simplistic way to build modern apps.'},
            {icon: 'arrow-return-right', content: 'Take apps to production faster; scale to your imagination!'},
        ],
        featured: [{
            icon: 'app-indicator',
            name: 'platform',
            shortTitle: 'Webflo Cloud',
            title: 'Webflo Cloud',
            desc: 'Managed hosting for Webflo apps. (Push to deploy.)',
            desc2: 'The platform uniquely built for the Webflo experience!',
            meta: [
                {title: 'Pricing', desc: 'Free to start'},
                {title: 'Status', desc: 'Coming soon'},
            ],
            cta: 'Be on the waitlist',
            ctaRef: '/cloud',
            ctaIsAlt: true,
        }, {
            icon: 'layers',
            name: 'database',
            shortTitle: 'Objective DB',
            title: 'Objective DB',
            desc: 'Managed cloud database for Objective SQL. (Go serverless.)',
            desc2: 'The SQL-based object-oriented data API for modern applications!',
            meta: [
                {title: 'Pricing', desc: 'Free to start'},
                {title: 'Status', desc: 'Coming soon'},
            ],
            cta: 'Be on the waitlist',
            ctaRef: '/cloud',
            ctaIsAlt: true,
        }],
    }, {
        header: 'We work in the bigger picture to help the community bank more on native web technologies and less on abstractions.',
        footer: '',
        name: 'community',
        icon: 'flag',
        graphic: '/img/cloud-itls-image-best-approach.png',
        title: 'Community',
        desc: 'WebQit\'s community initiatives and web standardization efforts.',
        highlights: [
            {icon: 'flag', content: 'Join in with your voice, or bring the course you care about.'},
            {icon: 'arrow-return-right', content: 'Or find help in getting success with web-native development!'},
        ],
        featured: [/**{
            icon: 'flag',
            name: 'webqit',
            shortTitle: 'WebQit',
            title: 'WebQit Community',
            desc: 'WebQit community for Dev success.',
            desc2: 'The best place to ask questions and provide feedback on your WebQit experience.',
            meta: [
                {title: 'OOHTML', desc: `<a href="https://github.com/webqit/oohtml/discussions">Github Discussions</a>, <a href="https://github.com/webqit/oohtml/issues">Github Issues</a>`},
                //{title: 'Observer', desc: `<a href="https://github.com/webqit/observer/discussions">Github Discussions</a>, <a href="https://github.com/webqit/observer/issues">Github Issues</a>`},
                //{title: 'Subscript', desc: `<a href="https://github.com/webqit/subscript/discussions">Github Discussions</a>, <a href="https://github.com/webqit/subscript/issues">Github Issues</a>`},
            ],
            cta: 'Join a project community below',
            ctaRef: '/#community',
            ctaIsAlt: true,
        }, */{
            icon: 'flag',
            name: 'web-native',
            shortTitle: 'Web-Native CG',
            title: 'Web-Native (W3C) Community Group',
            desc: 'The Web-Native Community Group at W3C.',
            desc2: 'Bank more on the platform and less on abstractions; go further to getting involved in facilitating new native technologies.',
            meta: [
                {title: '...', desc: '<a href="https://w3.org/community/web-native">Learn more about Web-Native CG</a>'},
            ],
            cta: 'Join Web-Native',
            ctaRef: 'https://w3.org/community/web-native/join',
        }],
    },];

    return {
        title: 'The WebQit Project',
        sections,
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
        data.sections.forEach(s => {
            s.featured = List.create(s.featured.map((item, i) => ({active: i === 0, overflowCollapsed: false, ...item})));
        });
    }
    return next();
}