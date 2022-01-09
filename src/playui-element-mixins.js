
/**
 * @imports
 */
import 'https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js';
const { Observer } = window.WebQit;

/**
 * ---------------------------
 * Root Elements
 * ---------------------------
 */

/**
 * @Root Element
 * @extends __Root
 */
export const _Root = __Root => class extends (__Root || HTMLElement) {

    static get subscriptBlocks() {
        return [ 'render' ];
    }

    render() {}

};

/**
 * @ParentRoot Element
 * @extends _Root() -> __ScrollTimeline
 */
export const _ScrollTimeline = __ScrollTimeline => class extends _Root(__ScrollTimeline) {

    scrollTimeline(opts = {}, useState = null) {
        const scrollOffsets = opts.scrollOffsets || [];
        const getScrollOffset = i => scrollOffsets[i] instanceof CSSStyleValue ? scrollOffsets[i] : (
            typeof scrollOffsets[i] === 'string' ? CSSStyleValue.parse(scrollOffsets[i]) : { target: this, edge: i === 0 ? 'end' : 'start', threshold: 0, ...(scrollOffsets[i] || {}) }
        );
        const scrollTimeline = new ScrollTimeline({
            scrollSource: opts.source || opts.scrollSource || document.documentElement,
            timeRange: opts.timeRange || 1,
            //fill: opts.fill || 'both',
            orientation: opts.orientation || 'vertical',
            scrollOffsets: [ getScrollOffset(0), getScrollOffset(1) ],
        });
        if (useState) {
            this.state[useState] = scrollTimeline;
        }
        return scrollTimeline;
    }

};

/**
 * @ParentRoot Element
 * @extends _Root() -> __ScrollSpy
 */
export const _ScrollSpy = __ScrollSpy => class extends _Root(__ScrollSpy) {

    bindIndicators(indicatorTree) {
        if (this.observer) {
            this.observer.disconnect();
        }
        this.headings = [];

        Array.from(this.querySelectorAll('h1,h2,h3,h4,h5,h6')).reduce((prev, el) => {
            var level = parseInt(el.nodeName.substr(1));
            let heading = { el, level };
            if (prev) {
                if (prev.level === heading.level) {
                    heading.parent = prev.parent;
                } else if (prev.level < heading.level) {
                    heading.parent = prev;
                } else if (prev.level > heading.level) {
                    let _prev = prev;
                    while((_prev = _prev.parent) && !heading.parent) {
                        if (_prev.level === heading.level) {
                            heading.parent = _prev.parent;
                        }
                    }
                }
            }
            this.headings.push(heading);
            return heading;
        }, null);

        let setState = (heading, state) => {
            Observer.set(heading, 'active', state);
            if (heading.parent) {
                setState(heading.parent, state ? 2 : state);
            }
        };

        let callback = (entries) => {
            let preMatch = entries.reduce((match, entry) => {
                // On bottom-up intersection...
                if (entry.isIntersecting && entry.boundingClientRect.top > 0) {
                    return { el: entry.target, event: 'entry'};
                }
                // On top-down de-intersection...
                if (entry.boundingClientRect.top > 0 && !match) {
                    return { el: entry.target, event: 'exit'};
                }
                return match;
            }, null);
            if (preMatch) {
                let match;
                this.headings.reduce((prev, heading) => {
                    if (heading.el === preMatch.el) {
                        if (preMatch.event === 'entry') {
                            match = heading;
                        } else {
                            match = prev;
                            setState(heading, 0);
                        }
                    } else {
                        setState(heading, 0);
                    }
                    return heading;
                }, null);
                if (match) {
                    setState(match, 1);
                }
            }
        };

        let options = { threshold: 0, rootMargin: '0px 0px -50% 0px' };
        this.observer = new IntersectionObserver(callback, options);
        this.headings.forEach(heading => this.observer.observe(heading.el));

        let bind = tree => {
            tree.forEach(item => {
                let hash = item.uri || (item.href ? item.href.split('#').pop() : '');
                this.headings.forEach(heading => {
                    if (heading.el.id === hash) {
                        Observer.set(item, 'scrollSpy', heading);
                    }
                });
                if (item.subtree) {
                    bind(item.subtree);
                }
            });
        };
        bind(indicatorTree);
    }

};

/**
 * @ParentRoot Element
 * @extends _Root() -> __List
 */
export const _List = __List => class extends _Root(__List) {

    connectedCallback() {
        super.connectedCallback();
        this.hasOverflowVisibility = this.getAttribute('overflow-visibility');
        this.overflowVisibility = !!parseInt(this.hasOverflowVisibility);
    }

    render() {
        if (!this.state.items) return;
        $(this).list(this.state.items);
        if (this.hasOverflowVisibility) {
            $(this).classAsync('hidden', this.state.overflowCollapsed === this.overflowVisibility);
        }
    }

};

/**
 * @ParentRoot Element
 * @extends _Root() -> __LinkItem
 */
export const _LinkItem = __LinkItem => class extends _Root(__LinkItem) {

    connectedCallback() {
        super.connectedCallback();
        this.defaultActive = this.hasAttribute('defaultactive');
        this.hasOverflowVisibility = this.getAttribute('overflow-visibility');
        this.overflowVisibility = !!parseInt(this.hasOverflowVisibility);
    }

    toggle() {
        this.state.expanded = !this.state.expanded;
    }

    toggleWith(...elements) {
        $(elements.filter(a => a)).on('click', () => {
            this.toggle();
        }, { unique: true, tags: [this] });
    }

    _matchQueryHash() {
        if (this.state.scrollSpy) {
            return {
                active: this.state.scrollSpy.active,
                hasActive: this.state.scrollSpy.active === 2,
            };
        }
        let hash = this.state.uri || (this.state.href ? this.state.href.split('#').pop() : '');
        return {
            active: ('#' + hash === document.state.url.hash) || (!hash && !document.state.url.hash && this.defaultActive),
        };
    }

    _matchQueryParams() {
        var href = this.state.href;
        return { active: href.split('?').pop().split('&').reduce((prev, q) => {
            if (prev) return;
            q = q.split('=');
            if ((document.state.url.query[q[0]] === q[1]) || (!q[1] && !(q[0] in document.state.url.query) && this.defaultActive)) {
                return true;
            }
            return false;
        }, false) };
    }

    _matchQueryPath() {
        var href = this.state.href;
        var activePathSlash = document.state.url.pathname + '/';
        var thisPathSlash = href + '/';
        var isActivePathMatch = activePathSlash.startsWith(thisPathSlash);
        var childIsActivePathMatchStr = activePathSlash.substr(thisPathSlash.length);
        if (isActivePathMatch)
        var childIsActivePathMatch = isActivePathMatch && childIsActivePathMatchStr && childIsActivePathMatchStr.indexOf('/') > 0;
        return {
            active: isActivePathMatch,
            hasActive: childIsActivePathMatch,
            expanded: this.state.subtree && (this.state.isRoot || childIsActivePathMatch),
        }
    }

    isActivePage(href = this.state.href, uri = this.state.uri, documentUrl = document.state.url, documentUrlHref = document.state.url?.href, scrollSpyActive = this.state.scrollSpy?.active) {
        if ((!href && !uri) || !documentUrlHref) return;
        console.log('::::::::::::href', href, '::::::::::::uri', uri);
        let match;
        if (uri || href.includes('#')) {
            console.log('::::::::::::href.includes(\'#\')', href.includes('#'));
            match = this._matchQueryHash();
        } else if (href.includes('?')) {
            console.log('::::::::::::href.includes(\'?\')', href.includes('?'));
            match = this._matchQueryParams();
        } else if (documentUrl.pathname) {
            console.log('::::::::::::documentUrl.pathname', documentUrl.pathname);
            match = this._matchQueryPath();
        }
        console.log('::::::::::::match', match);
        this.state.active = match.active;
        this.state.hasActive = match.hasActive;
        this.state.expanded = match.expanded;
    }

    render() {
        let hrefElement = this.namespace.href || this.querySelector('a');
        let textElement = this.namespace.text || hrefElement;
        if (!this.state.title) return;
        $(hrefElement).attr('href', this.state.href || '#' + this.state.uri);
        $(textElement).html(this.state.title);
        $(this).classAsync('active', this.state.active);
        $(this).classAsync('has-active', this.state.hasActive);
        $(this).classAsync('expanded', this.state.expanded);
        if (this.hasOverflowVisibility) {
            $(this).classAsync('hidden', this.state.overflowCollapsed === this.overflowVisibility);
        }
    }

    static get subscriptParameterBlocks() {
        return [ 'isActivePage' ];
    }
    
    static get subscriptBlocks() {
        return [ 'render' ];
    }

};

/**
 * @ParentRoot Element
 * @extends _Root() -> __Drawer
 */
export const _Drawer = __Drawer => class extends _Root(__Drawer) {

    connectedCallback() {
        this.rtl = this.hasAttribute('drawer-rtl');
        this.breakpoint = this.getAttribute('drawer-breakpoint');
    }

    draw(open) {
        const applyBreakpoint = _class => _class//!this.breakpoint ? _class : _class.split(' ').map(c => this.breakpoint + '--' + c).join(' ');
        $(this.namespace.drawer).class(applyBreakpoint('hidden'), false);
        $(this.namespace.drawer).class(applyBreakpoint('w-96'), true);
        $(this.namespace.drawer).play([{transform: `translate(${!this.rtl ? '-' : ''}400px)`}, { transform: `translate(0px)` }], { duration: 200, easing: 'ease-in', reverse: !open }).then(drawer => {
            this.state.active = open;
            if (!open) {
                $(drawer).class(applyBreakpoint('hidden'), true);
                $(drawer).class(applyBreakpoint('w-96'), false);
            }
        });
        if (this.namespace.backdrop) {
            $(this.namespace.backdrop).class(applyBreakpoint('hidden'), false);
            $(this.namespace.backdrop).play([{ opacity: 0 }, { opacity: 1 }], { duration: 300, easing: 'ease-in', reverse: !open }).then(drawer => {
                if (!open) {
                    $(drawer).class(applyBreakpoint('hidden'), true);
                }
            });
        }
    }

    collapseWith(...elements) {
        $(elements.filter(a => a)).on('click', () => {
            if (this.state.active) {
                setTimeout(() => {
                    this.draw(false);
                }, 100);
            }
        }, {unique: true, tags: [this]});
    }

    toggle() {
        this.draw(!this.state.active);
    }

    toggleWith(...elements) {
        $(elements.filter(a => a)).on('click', () => {
            this.toggle();
        }, {unique: true, tags: [this]});
    }

};