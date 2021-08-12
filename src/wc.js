
/**
 * @imports
 */
import _after from '@webqit/util/str/after.js';
 
/**
 * @webqit-tree-item-link
 */
customElements.define('webqit-li-link', class extends HTMLLIElement {
    
    isActivePage(pathname, thisPath, onlySelf = false) {
        if (!pathname) return;
        var activePathSlash = pathname + '/';
        var thisPathSlash = thisPath + '/';
        var isActivePathMatch = activePathSlash.startsWith(thisPathSlash);
        var childIsActivePathMatchStr = activePathSlash.substr(thisPathSlash.length);
        var childIsActivePathMatch = isActivePathMatch && childIsActivePathMatchStr && childIsActivePathMatchStr.indexOf('/') > 0;
        this.state.activePage = isActivePathMatch && (!onlySelf || !childIsActivePathMatch);
        this.state.expanded = this.state.subtree && (this.state.isRoot || childIsActivePathMatch);
    }

    toggle() {
        this.state.expanded = !this.state.expanded;
    }

    toggleWith(...elements) {
        $(elements.filter(a => a)).on('click', () => {
            this.toggle();
        }, {unique: true, tags: [this]});
    }

}, {extends: 'li'});

/**
 * @webqit-app-drawer
 */
customElements.define('webqit-app-drawer', class extends HTMLDivElement {
            
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

}, {extends: 'div'});