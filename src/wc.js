
/**
 * @imports
 */
import * as WidgetElements from './playui-element-mixins.js';

/**
 * ---------------------------
 * @playui widgets
 * ---------------------------
 */
const { SubscriptElement } = WebQit.OOHTML;

// scrolltimeline
const ScrollTimelineBodyWidget = class extends WidgetElements._ScrollTimeline(SubscriptElement(HTMLBodyElement)) {};
customElements.define('playui-scrolltimeline-body', ScrollTimelineBodyWidget, { extends: 'body' });
const ScrollTimelineDivWidget = class extends WidgetElements._ScrollTimeline(SubscriptElement(HTMLDivElement)) {};
customElements.define('playui-scrolltimeline-div', ScrollTimelineDivWidget, { extends: 'div' });
const ScrollTimelineUlWidget = class extends WidgetElements._ScrollTimeline(SubscriptElement(HTMLUListElement)) {};
customElements.define('playui-scrolltimeline-ul', ScrollTimelineUlWidget, { extends: 'ul' });
const ScrollTimelineLiWidget = class extends WidgetElements._ScrollTimeline(SubscriptElement(HTMLLIElement)) {};
customElements.define('playui-scrolltimeline-li', ScrollTimelineLiWidget, { extends: 'li' });

// ScrollSpy
const ScrollSpyDivWidget = class extends WidgetElements._ScrollSpy(SubscriptElement(HTMLDivElement)) {};
customElements.define('playui-scrollspy-div', ScrollSpyDivWidget, { extends: 'div' });

// list
const ListUlWidget = class extends WidgetElements._List(SubscriptElement(HTMLUListElement)) {};
customElements.define('playui-list-ul', ListUlWidget, { extends: 'ul' });
const ListOlWidget = class extends WidgetElements._List(SubscriptElement(HTMLOListElement)) {};
customElements.define('playui-list-ol', ListOlWidget, { extends: 'ol' });

// linkitem
const LinkItemLiWidget = class extends WidgetElements._LinkItem(SubscriptElement(HTMLLIElement)) {};
customElements.define('playui-linkitem-li', LinkItemLiWidget, { extends: 'li' });

// drawer
const DrawerDivWidget = class extends WidgetElements._Drawer(SubscriptElement(HTMLDivElement)) {};
customElements.define('playui-drawer-div', DrawerDivWidget, { extends: 'div' });
