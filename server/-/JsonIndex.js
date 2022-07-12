
/**
 * @imports
 */
import Fs from 'fs';
import Path from 'path';
import { _toTitle } from '@webqit/util/str/index.js';

/**
 * Reads Static Pages from the filesystem.
 */
export default class JsonIndex {

    /**
     * Initializes an instance.
     * 
     * @param String baseDir
     * @param String bundleFilename
     */
    constructor(baseDir, bundleFilename = 'bundle.html.json') {
        this.baseDir = baseDir;
        let filename;
        if (Fs.existsSync(filename = Path.join(this.baseDir, bundleFilename))) {
            let loaded = Fs.readFileSync(filename);
            this.root = JSON.parse(loaded);
        } else {
            this.root = {};
        }
    }

    /**
     * Queries a path
     * 
     * @param Object    context
     * @param String    path
     * 
     * @returns Object
     */
    query(context, path) {
        let pathArray = path.split('/').filter(s => s);
        return pathArray.reduce(( context, segment, i) => {
            if (!context) return;
            let filename;
            if (typeof context[segment] === 'string' && Fs.existsSync(filename = Path.join(this.baseDir, context[segment]))) {
                let loaded = Fs.readFileSync(filename);
                context[segment] = JSON.parse(loaded);
            }
            return context[segment];
        }, context);
    }

    /**
     * Gets index's json
     * 
     * @param Object    index
     * @param String    slug
     * 
     * @returns Object
     */
    indexJson(index, slug = null) {
        const json = this.query(index, `summary.json`) || this.query(index, `README.md`);
        slug && (json.slug = slug);
        return json;
    }

    /**
     * Gets index's json title
     * 
     * @param Object    indexJson
     * 
     * @returns String
     */
    indexJsonTitle(indexJson) {
        return indexJson.title || (indexJson.outline && indexJson.outline[0] && indexJson.outline[0].title);
    }

    /**
     * Queries a path
     * 
     * @param Object    index
     * 
     * @returns Array
     */
    entries(index) {
        return Object.keys(index).filter(key => !key.includes('.')).map(key => {
            let entryIndex = this.query(index, key);
            let json = this.indexJson(entryIndex);
             json.slug = key;
            return entryIndex;
        });
    }

    /**
     * Queries a path
     * 
     * @param Array|Object    entriesOrIndex
     * 
     * @returns Array
     */
    sort(entriesOrIndex) {
        return (!Array.isArray(entriesOrIndex) ? this.entries(entriesOrIndex) : entriesOrIndex).sort((a, b) => {
            a = this.indexJson(a), b = this.indexJson(b);
            return a._index === 'first' || b._index === 'last' ? -1 : (
                b._index === 'first' || a._index === 'last' ? 1 : (
                    parseFloat(a._index || 1000) < parseFloat(b._index || 1000) || this.indexJsonTitle(a) < this.indexJsonTitle(b) ? -1 : 1
                )
            );
        });
    }

    /**
     * Creates a menu
     * 
     * @param Object    index
     * @param String    basePath
     * @param Boolean   detailed
     * 
     * @returns Object
     */
    tree(index, basePath, addRel = 0) {
        const indexJson = this.indexJson(index);
        const { slug, icon, desc, outline, _subtreeType, } = indexJson;
        const title = this.indexJsonTitle(indexJson) || _toTitle(indexJson.slug);
        const href = indexJson.href || (basePath ? `${basePath}/${indexJson.slug}` : indexJson.slug);
        const lightIndexJson = { slug, icon, title, href, _subtreeType, };
        const subtree = this.sort(index).map(entryIndex => this.tree(entryIndex, lightIndexJson.href, addRel));
        Object.defineProperty(lightIndexJson, 'desc', { value: desc, enumerable: false });
        Object.defineProperty(lightIndexJson, 'outline', { value: outline, enumerable: false });
        Object.defineProperty(lightIndexJson, 'subtree', { value: subtree, enumerable: false });
        if (addRel) {
            let view = json => (json && { title: json.title, href: json.href });
            lightIndexJson.subtree.reduce(([ prevJson, parentJson ], entryJson, i) => {
                Object.defineProperty(entryJson, 'prevSibling', { value: prevJson, enumerable: false });
                Object.defineProperty(entryJson, 'nextSibling', { value: parentJson.subtree[i + 1], enumerable: false });
                Object.defineProperty(entryJson, 'firstChild', { value: entryJson.subtree[0], enumerable: false });
                Object.defineProperty(entryJson, 'lastChild', { value: entryJson.subtree[entryJson.subtree.length - 1], enumerable: false });
                Object.defineProperty(entryJson, 'parent', { value: parentJson, enumerable: false });
                return [ entryJson, parentJson ];
            }, [ null, lightIndexJson ]);
        }
        return lightIndexJson;
    }

}
