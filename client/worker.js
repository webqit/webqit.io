
/**
 * @imports
 */
import Worker from 'C:/Users/ox_ha/Documents/CODE/webqit/webflo/modules/client/Worker.js';

/**
 * -----------------
 * Service Worker File
 * -----------------
 */

// >> Worker-Side Routing:
const routes = {};

// >> Worker Params
const params = {
   SHOW_LIFECYCLE_LOG: true,
   SCOPE: '/',
   CACHE_NAME: 'cache_v2',
   FETCHING_STRATEGY: 'cache_first',
   CACHING_STRATEGY: 'dynamic',
   CACHING_LIST: '',
   SKIP_WAITING: false,
   SUPPORT_MESSAGING: false,
   MESSAGE_ROUTING_URL_PROPERTY: '',
   MESSAGE_SHOULD_RELAY_PROPERTY: '',
   SUPPORT_NOTIFICATION: false,
   PUSH_REGISTRATION_URL: '',
   PUSH_UNREGISTRATION_URL: '',
   PUSH_PUBLIC_KEY: '',
   NOTIFICATION_ROUTING_URL_PROPERTY: '',
   NOTIFICATION_TARGET_URL_PROPERTY: '',
   ROUTES: routes,
};

// >> Worker Instantiation
Worker.call(null, params);