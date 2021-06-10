
/**
 * @imports
 */
import _isArray from '@webqit/util/js/isArray.js';
import _isEmpty from '@webqit/util/js/isEmpty.js';
import _toTitle from '@webqit/util/str/toTitle.js';
import { List as _List, Observer } from '@webqit/obs-collection';

export default class List extends _List {

    static create(entries, subtree = null, multiplicity = 1000) {
        return new this(entries.map(entry => {
            if (subtree && _isArray(entry[subtree])) {
                entry[subtree] = this.create(entry[subtree], subtree, multiplicity);
            }
            return entry;
        }), {itemStates: ['active'], boolishStateTest: true, multiplicity: {active: multiplicity}});
    }

    static fromOutline(outline, detailed = false, parent = null, i = 0) {

        var entries = Object.keys(outline).map(name => {
            var entry = outline[name];
            var projectProp = prop => entry[prop] || ((entry.meta || {}).readme || {})[prop];
            var title = projectProp('title') || ((projectProp('outline') || []).length && projectProp('outline')[0].level === 1 ? projectProp('outline')[0].title : _toTitle(name));
            if (i === 2) {
                title = 'DOCS';
            }
            var _entry = {
                title,
                name,
                path: (parent ? parent.path : '') + '/' + name,
                active: false,
                desc: projectProp('desc'),
                _index: projectProp('_index'),
            };
            // Add parent
            if (detailed) {
                Object.defineProperty(_entry, 'outline', {value: projectProp('outline') || [], enumerable: false});
                if (parent) {
                    Object.defineProperty(_entry, 'parent', {value: parent, enumerable: false});
                }
            }
            // Add subtree
            if (!_isEmpty(entry.subtree)) {
                _entry.subtree = this.fromOutline(entry.subtree, detailed, _entry, i + 1);
            }        
            return _entry;
        });

        entries.sort((a, b) => {
            return a._index === 'first' || b._index === 'last' ? -1 : (
                b._index === 'first' || a._index === 'last' ? 1 : (
                    (a._index || 0) < (b._index || 0) || a.title < b.title
                )
            );
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