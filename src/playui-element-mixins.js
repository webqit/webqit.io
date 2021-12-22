
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

    render() {
        if (!this.state.items) return;
        $(this).list(this.state.items);
    }

};

/**
 * @ParentRoot Element
 * @extends _Root() -> __LinkItem
 */
export const _LinkItem = __LinkItem => class extends _Root(__LinkItem) {

    connectedCallback() {
        super.connectedCallback();
        this.treewatch = this.hasAttribute('treewatch')
    }

    toggle() {
        this.state.expanded = !this.state.expanded;
    }

    toggleWith(...elements) {
        $(elements.filter(a => a)).on('click', () => {
            this.toggle();
        }, { unique: true, tags: [this] });
    }

    isActivePage() {
        if (!document.state.url.pathname) return;
        var activePathSlash = document.state.url.pathname + '/';
        var thisPathSlash = this.state.href + '/';
        var isActivePathMatch = activePathSlash.startsWith(thisPathSlash);
        var childIsActivePathMatchStr = activePathSlash.substr(thisPathSlash.length);
        var childIsActivePathMatch = isActivePathMatch && childIsActivePathMatchStr && childIsActivePathMatchStr.indexOf('/') > 0;
        this.state.activePage = isActivePathMatch && (this.treewatch || !childIsActivePathMatch);
        this.state.expanded = this.state.subtree && (this.state.isRoot || childIsActivePathMatch);
    }

    render() {
        if (!this.state.title) return;
        $(this.firstElementChild).attr('href', this.state.href);
        $(this.firstElementChild).html(this.state.title);
        $(this).classAsync('active', this.state.activePage);
        $(this).classAsync('expanded', this.state.expanded);
    }
    
    static get subscriptBlocks() {
        return [ 'isActivePage', 'render' ];
    }

};

/**
 * @ParentRoot Element
 * @extends _Root() -> __Drawer
 */
export const _Drawer = __Drawer => class extends _Root(__Drawer) {

    connectedCallback() {
        const { $ } = WebQit;
        this.rtl = this.hasAttribute('drawer-rtl');
        this.breakpoint = this.getAttribute('drawer-breakpoint');
    }

    draw(open) {
        const applyBreakpoint = _class => !this.breakpoint ? _class : _class.split(' ').map(c => this.breakpoint + '--' + c).join(' ');
        $(this.namespace.drawer).class(applyBreakpoint('d-none'), false);
        $(this.namespace.drawer).class(applyBreakpoint('wt-40 wt-x8'), true);
        $(this.namespace.drawer).play([{transform: `translate(${!this.rtl ? '-' : ''}400px)`}, {transform: `translate(0px)`}], {duration: 200, easing: 'ease-in', reverse: !open}).then(el => {
            this.state.active = open;
            if (!open) {
                $(el).class(applyBreakpoint('d-none'), true);
                $(el).class(applyBreakpoint('wt-40 wt-x8'), false);
            }
        });
        if (this.namespace.backdrop) {
            $(this.namespace.backdrop).class(applyBreakpoint('d-none'), false);
            $(this.namespace.backdrop).class(applyBreakpoint('d-block'), true);
            $(this.namespace.backdrop).play([{opacity: 0}, {opacity: 1}], {duration: 300, easing: 'ease-in', reverse: !open}).then(el => {
                if (!open) {
                    $(el).class(applyBreakpoint('d-none'), true);
                    $(el).class(applyBreakpoint('d-block'), false);
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