
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
   dir: '',
   lifecycle_logs: false,
   __advanced: true,
   scope: '/',
   cache_name: '',
   fetching_strategy: 'network_first',
   caching_strategy: 'dynamic',
   caching_list: '',
   skip_waiting: true,
   support_messaging: false,
   support_notification: false,
   ROUTES: routes,
};

// >> Worker Instantiation
Worker.call(null, params);