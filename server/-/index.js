
/**
 * @imports
 */
import { _toTitle } from '@webqit/util/str/index.js';
import { _unique } from '@webqit/util/arr/index.js';
import JsonIndex from './JsonIndex.js';

/**
 * Handles requests.
 * 
 * @param HttpEvent     httpEvent
 * @param Object        landing
 * @param Function      next
 * 
 * @return object
 */
export default async function(httpEvent, context, next) {
    let response = await next();
    if (response) return response;
    let wqdiv = this.stepname;
    if (next.pathname) {
        // -------------
        const jsonIndex = new JsonIndex('./public');
        const landingIndex = jsonIndex.query(jsonIndex.root, `${this.pathname}/${next.stepname}`);
        if (!landingIndex) return;
        const landingJson = jsonIndex.indexJson(landingIndex, next.stepname);
        if (next.pathname !== next.stepname) {
            // --------------
            // URL: wqdiv/landing/etc
            const landingJsonView = jsonIndex.tree(landingIndex, this.pathname, true);
            const [ mainJson, breadcrumb ] = next.pathname.split('/').slice(1).reduce(([ _landingJson, _breadcrumb ], segment) => {
                let entryJson = _landingJson && _landingJson.subtree.reduce((prev, _entryJson) => prev || (_entryJson.slug === segment && _entryJson), null);
                return entryJson && [ entryJson, _breadcrumb.concat(entryJson) ] || [];
            }, [ landingJsonView, [] ]);
            if (!mainJson) return;
            const withSubtrees = json => ({ ...json, subtree: json.subtree.map(withSubtrees)});
            let landing = { ...withSubtrees(landingJsonView), breadcrumb: [ landingJsonView ].concat(breadcrumb), wqdiv };
            // Forward and backward links
            let forward = mainJson.firstChild || mainJson.nextSibling;
            let p = mainJson;
            while(!forward && (p = p.parent)) { forward = p.nextSibling }
            let backward = mainJson.prevSibling;
            while(backward && backward.lastChild) { backward = backward.lastChild }
            if (!backward) backward = mainJson.parent;
            // Index links
            const index = mainJson.subtree.map(_entryJson => ({ ..._entryJson, desc: _entryJson.desc }));
            return { ...mainJson, outline: mainJson.outline, links: { backward, index, forward }, landing, };
        }
        // --------------
        // URL: wqdiv/landing
        if (!landingJson.quickstart) landingJson.quickstart = {};
        if (!landingJson.quickstart.cta) landingJson.quickstart.cta = {};
        if (!landingJson.quickstart.cta.href) landingJson.quickstart.cta.href = `/${wqdiv}/${landingJson.slug}/docs`;
        if (!landingJson.quickstart.cta.text) landingJson.quickstart.cta.text = 'Go to docs';
        if (!landingJson.quickstart.type) landingJson.quickstart.type = 'code';
        if (!landingJson.quickstart.directive) {
            landingJson.quickstart.directive = `npm i${landingJson.quickstart.global ? ' -g' : ''} @webqit/${landingJson.slug}`;
            if (landingJson.quickstart.cdn) {
                landingJson.quickstart.directive += `; or CDN: https://unpkg.com/@webqit/${landingJson.slug}/dist/main.js`;
            }
        }
        return { ...landingJson, wqdiv, };
    }
    // -------------
    // URL: wqdiv
    const jsonIndex = new JsonIndex('./public');
    const wqdivIndex = jsonIndex.query(jsonIndex.root, this.pathname);
    if (!wqdivIndex) return;
    const wqdivJson = jsonIndex.indexJson(wqdivIndex, wqdiv);
    const landingsJson = jsonIndex.sort(wqdivIndex).map(landingIndex => {
        let landingJson = jsonIndex.indexJson(landingIndex);
        if (!landingJson.cta) landingJson.cta = {};
        if (!landingJson.cta.href) landingJson.cta.href = `/${wqdiv}/${landingJson.slug}`;
        if (!landingJson.cta.text) landingJson.cta.text = 'Learn more';
        return landingJson;
    });
    const categories = _unique(landingsJson.reduce((categories, landingJson) => categories.concat(landingJson.categories), []));
    return { ...wqdivJson, title: `WebQit ${_toTitle(wqdiv)}`, landings: landingsJson, categories };
}
