
/**
 * @imports
 */
import Worker from 'C:/Users/ox_ha/Documents/CODE/webqit/webflo/client/app/Worker.js';

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
   CACHE_NAME: 'cache_v1175',
   FETCHING_STRATEGY: 'cache_first',
   CACHING_STRATEGY: 'dynamic',
   CACHING_LIST: '',
   SKIP_WAITING: true,
   SUPPORT_MESSAGING: true,
   MESSAGE_ROUTING_URL_PROPERTY: '/source',
   MESSAGE_SHOULD_RELAY_PROPERTY: 'shouldRelay',
   SUPPORT_NOTIFICATION: true,
   PUSH_REGISTRATION_URL: '',
   PUSH_UNREGISTRATION_URL: '',
   PUSH_PUBLIC_KEY: '',
   NOTIFICATION_ROUTING_URL_PROPERTY: '/source',
   NOTIFICATION_TARGET_URL_PROPERTY: 'url',
   SUPPORT_PUSH: true,
   ROUTES: routes,
};

// >> Worker Instantiation
Worker.call(null, params);