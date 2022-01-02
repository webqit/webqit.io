
/**
 * @imports
 */
import 'https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js';

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
        this.treewatch = this.hasAttribute('treewatch');
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
        let hash = this.state.uri || (this.state.href ? this.state.href.split('#').pop() : '');
        return ('#' + hash === document.state.url.hash) || (!hash && !document.state.url.hash && this.defaultActive);
    }

    _matchQueryParams() {
        var href = this.state.href;
        return href.split('?').pop().split('&').reduce((prev, q) => {
            if (prev) return;
            q = q.split('=');
            if ((document.state.url.query[q[0]] === q[1]) || (!q[1] && !(q[0] in document.state.url.query) && this.defaultActive)) {
                return true;
            }
            return false;
        }, false);
    }

    _matchQueryPath() {
        var href = this.state.href;
        var activePathSlash = document.state.url.pathname + '/';
        var thisPathSlash = href + '/';
        var isActivePathMatch = activePathSlash.startsWith(thisPathSlash);
        var childIsActivePathMatchStr = activePathSlash.substr(thisPathSlash.length);
        var childIsActivePathMatch = isActivePathMatch && childIsActivePathMatchStr && childIsActivePathMatchStr.indexOf('/') > 0;
        return {
            activePage: isActivePathMatch && (this.treewatch || !childIsActivePathMatch),
            expanded: this.state.subtree && (this.state.isRoot || childIsActivePathMatch),
        }
    }

    isActivePage(href = this.state.href, uri = this.state.uri, documentUrl = document.state.url, documentUrlHref = document.state.url?.href) {
        if ((!href && !uri) || !documentUrlHref) return;
        if (uri || href.includes('#')) {
            this.state.activePage = this._matchQueryHash();
        } else if (href.includes('?')) {
            this.state.activePage = this._matchQueryParams();
        } else if (documentUrl.pathname) {
            let match = this._matchQueryPath();
            this.state.activePage = match.activePage;
            this.state.expanded = match.expanded;
        }
    }

    render() {
        let hrefElement = this.namespace.href || this.querySelector('a');
        let textElement = this.namespace.text || hrefElement;
        if (!this.state.title) return;
        $(hrefElement).attr('href', this.state.href || '#' + this.state.uri);
        $(textElement).html(this.state.title);
        $(this).classAsync('active', this.state.activePage);
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