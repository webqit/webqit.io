
/**
 * @imports
 */
import * as WidgetElements from './playui-element-mixins.js';

/**
 * ---------------------------
 * @playui widgets
 * ---------------------------
 */

// scrolltimeline
const ScrollTimelineBodyWidget = class extends WidgetElements._ScrollTimeline(WebQit.SubscriptElement(HTMLBodyElement)) {};
customElements.define('playui-scrolltimeline-body', ScrollTimelineBodyWidget, { extends: 'body' });
const ScrollTimelineDivWidget = class extends WidgetElements._ScrollTimeline(WebQit.SubscriptElement(HTMLDivElement)) {};
customElements.define('playui-scrolltimeline-div', ScrollTimelineDivWidget, { extends: 'div' });
const ScrollTimelineUlWidget = class extends WidgetElements._ScrollTimeline(WebQit.SubscriptElement(HTMLUListElement)) {};
customElements.define('playui-scrolltimeline-ul', ScrollTimelineUlWidget, { extends: 'ul' });
const ScrollTimelineLiWidget = class extends WidgetElements._ScrollTimeline(WebQit.SubscriptElement(HTMLLIElement)) {};
customElements.define('playui-scrolltimeline-li', ScrollTimelineLiWidget, { extends: 'li' });

// list
const ListUlWidget = class extends WidgetElements._List(WebQit.SubscriptElement(HTMLUListElement)) {};
customElements.define('playui-list-ul', ListUlWidget, { extends: 'ul' });
const ListOlWidget = class extends WidgetElements._List(WebQit.SubscriptElement(HTMLOListElement)) {};
customElements.define('playui-list-ol', ListOlWidget, { extends: 'ol' });

// linkitem
const LinkItemLiWidget = class extends WidgetElements._LinkItem(WebQit.SubscriptElement(HTMLLIElement)) {};
customElements.define('playui-linkitem-li', LinkItemLiWidget, { extends: 'li' });

// drawer
const DrawerDivWidget = class extends WidgetElements._Drawer(WebQit.SubscriptElement(HTMLDivElement)) {};
customElements.define('playui-drawer-div', DrawerDivWidget, { extends: 'div' });
