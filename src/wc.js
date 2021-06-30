
/**
 * @imports
 */
import _after from '@webqit/util/str/after.js';
 
/**
 * @webqit-tree-item-link
 */
customElements.define('webqit-tree-item-link', class extends HTMLLIElement {
            
    connectedCallback() {
        //super();
        const { $, Observer } = WebQit;
        const renderState = () => {
            if (!this.namespace.subtree_notch) return;
            $(this.namespace.subtree_icon).class('bi-dash', !this.state.subtree || this.state.active);
            $(this.namespace.subtree_icon).class('bi-plus', this.state.subtree && !this.state.active);
            $(this.namespace.sub_menu_container).play({
                height: this.state.active ? 'auto' : 0
            }, {
                duration: 300,
                easing: 'ease-out', 
                cancelForCss: true
            });
        };
        setTimeout(() => {
            renderState();
        }, 0);
        Observer.observe(this, [['state', 'active']], renderState);
        const render = () => {
            if (!this.state.title) return;
            // Main
            $(this.namespace.link).attr('href', this.state.path);
            $(this.namespace.link_text).html(this.state.title);
            isActive();
            // Subtree
            if (!this.state.subtree) return;
            $(this.namespace.sub_menu).itemize(this.state.subtree.items, {
                itemExportId: this.state._subtreeType
            });
            $(this.namespace.subtree_notch).class('cursor-pointer', true);
            $(this.namespace.subtree_notch).on('click', () => {
                // Expand/collapse
                this.state.active = !this.state.active;
            }, {unique: true, tags: [this]});
        };
        if (this.state.title) render();
        Observer.observe(this, [['state'], ['namespace', 'sub_menu'], ['namespace', 'subtree_notch']], render);
        const isActive = () => {
            if (!(document.state.location || {}).pathname) return;
            var isActivePathMatch, childIsActivePathMatch;
            var activePathSlash = document.state.location.pathname + '/';
            var thisPathSlash = this.state.path + '/';
            isActivePathMatch = activePathSlash.startsWith(thisPathSlash);
            var childIsActivePathMatchStr = activePathSlash.substr(thisPathSlash.length);
            childIsActivePathMatch = isActivePathMatch && childIsActivePathMatchStr && childIsActivePathMatchStr.indexOf('/') > 0;
            $(this.namespace.item_bar).class('active', isActivePathMatch && !childIsActivePathMatch);
            if (isActivePathMatch && !childIsActivePathMatch && this.namespace.link) {
                this.namespace.link.focus();
            }
            if (this.state.subtree && (this.state.isRoot || childIsActivePathMatch)) {
                // Expand/collapse
                this.state.active = true;
            }
        };
        Observer.observe(document, [['state', 'location', 'pathname']], isActive, {diff: true});
    }

}, {extends: 'li'});

/**
 * @webqit-list-item-link
 */
customElements.define('webqit-list-item-link', class extends HTMLLIElement {
            
    connectedCallback() {
        //super();
        const { $, Observer } = WebQit;
        const render = () => {
            if (!this.state.title) return;
            // Main
            $(this.namespace.link).attr('href', this.state.href);
            $(this.namespace.link_text || this.namespace.link).html(this.state.title);
            if (this.state.icon && this.namespace.icon) {
                $(this.namespace.icon).class('bi-' + this.state.icon, true);
            }
            isActive();
            if (this.state.subtree && this.namespace.sub_menu) {
                $(this.namespace.sub_menu).class('d-none', false);
                $(this.namespace.sub_menu).itemize(this.state.subtree.items);
            }
        };
        if (this.state.title) render();
        Observer.observe(this, [['state'], ['namespace', 'sub_menu']], render);
        const isActive = e => {
            if (!(document.state.location || {}).pathname) return;
            var isActivePathMatch;
            var activePathSlash = document.state.location.pathname + '/';
            var thisPathSlash = this.state.href + '/';
            isActivePathMatch = activePathSlash.startsWith(thisPathSlash);
            $(this.namespace.item_bar || this.namespace.link).class('active', isActivePathMatch);
            if (isActivePathMatch && this.namespace.link) {
                this.namespace.link.focus();
            }
        };
        Observer.observe(document, [['state', 'location', 'pathname']], isActive, {diff: true});
    }

}, {extends: 'li'});

/**
 * @webqit-outline-item-link
 */
customElements.define('webqit-outline-item-link', class extends HTMLLIElement {
            
    connectedCallback() {
        //super();
        const { $, Observer } = WebQit;
        const render = () => {
            if (!this.state.title) return;
            // Main
            $(this.namespace.link).attr('href', '#' + this.state.uri);
            $(this.namespace.link_text).html(this.state.title);
            isActive();
            if (this.state.subtree) {
                $(this.namespace.sub_menu).class('d-none', false);
                $(this.namespace.sub_menu).itemize(this.state.subtree);
            }
        };
        if (this.state.title) render();
        Observer.observe(this, [['state'], ['namespace', 'sub_menu']], render);
        const isActive = e => {
            var activeHash = (document.state.location || {}).hash;
            var isActiveHashMatch = activeHash === '#' + this.state.uri;
            $(this.namespace.item_bar || this.namespace.link).class('active', isActiveHashMatch);
            if (isActiveHashMatch && this.namespace.link) {
                this.namespace.link.focus(); // seizes the page
            }
        };
        Observer.observe(document, [['state', 'location', 'hash']], isActive, {diff: true});
    }

}, {extends: 'li'});

/**
 * @webqit-app-drawer
 */
customElements.define('webqit-app-drawer', class extends HTMLDivElement {
            
    connectedCallback() {
        const { $, Observer } = WebQit;
        var rtl = this.hasAttribute('drawer-rtl'),
            breakpoint = this.getAttribute('drawer-breakpoint'),
            applyBreakpoint = _class => !breakpoint ? _class : _class.split(' ').map(c => breakpoint + '--' + c).join(' ');
        Observer.observe(this, [['state', 'active']], events => {
            const open = events[0].value;
            $(this.namespace.drawer).class(applyBreakpoint('d-none'), false);
            $(this.namespace.drawer).class(applyBreakpoint('wt-40 wt-x8'), true);
            $(this.namespace.drawer).play([{transform: `translate(${!rtl ? '-' : ''}400px)`}, {transform: `translate(0px)`}], {duration: 200, easing: 'ease-in', reverse: !open}).then(el => {
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
        }, {diff: true});
        Observer.observe(this, [['namespace', 'backdrop'], ['namespace', 'main']], () => {
            $([this.namespace.backdrop, this.namespace.main].filter(a => a)).on('click', () => {
                if (this.state.active) {
                    setTimeout(() => {
                        this.state.active = false;
                    }, 100);
                }
            }, {unique: true, tags: [this]});
        }, {diff: true});
    }

    toggle() {
        this.state.active = !this.state.active;
    }

    open() {
        this.state.active = true;
    }

    close() {
        this.state.active = false;
    }

}, {extends: 'div'});