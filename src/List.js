
/**
 * @imports
 */
import _isArray from '@webqit/util/js/isArray.js';
import _isEmpty from '@webqit/util/js/isEmpty.js';
import _toTitle from '@webqit/util/str/toTitle.js';
import { List as _List, Observer } from '@webqit/obs-collection';

export default class List extends _List {

    static create(entries, subtree = null) {
        return new this(entries.map(entry => {
            if (subtree && _isArray(entry[subtree])) {
                entry[subtree] = this.create(entry[subtree], subtree);
            }
            return entry;
        }), {itemStates: ['active'], boolishStateTest: true, multiplicity: {active: 1}});
    }

    static fromOutline(outline, detailed = false, parent = null) {

        var entries = Object.keys(outline).map(name => {
            var entry = outline[name];
            var readme = (entry.meta || {}).readme || {};
            var title = readme.title || (readme.outline || []).length && readme.outline[0].level === 1 ? readme.outline[0].title : _toTitle(name);
            var _entry = {
                title,
                name,
                path: (parent ? parent.path : '') + '/' + name,
                active: false,
                desc: readme.desc,
                _before: readme._before,
                _after: readme._after,
            };
            // Add parent
            if (detailed) {
                Object.defineProperty(_entry, 'outline', {value: readme.outline || [], enumerable: false});
                if (parent) {
                    Object.defineProperty(_entry, 'parent', {value: parent, enumerable: false});
                }
            }
            // Add subtree
            if (!_isEmpty(entry.subtree)) {
                _entry.subtree = this.fromOutline(entry.subtree, detailed, _entry);
            }        
            return _entry;
        });

        entries.sort((a, b) => {
            if (a._before === b.name || b._after === a.name) {
                return -1;
            }
            if (a._after === b.name || b._before === a.name) {
                return 1;
            }
            return 0;
        });

        if (detailed) {
            entries.reduce((prev, _entry, i) => {
                // Add prev
                if (prev) {
                    Object.defineProperty(_entry, 'prev', {value: prev, enumerable: false});
                }
                // Add next
                if (entries[i + 1]) {
                    Object.defineProperty(_entry, 'next', {value: entries[i + 1], enumerable: false});
                }
                return _entry;
            }, null);
        }

        return this.create(entries);
    }

    advance(dir, loop = false) {
        var active = this.state.active.first();
        var target = dir === 'next' ? this.following(active, false/*count*/, loop) : this.preceding(active, false/*count*/, loop);
        if (target) {
            Observer.set(target, 'active', true);
        }
    }

};