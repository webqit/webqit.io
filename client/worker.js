
/**
 * @imports
 */
import Worker from '/Users/eslcloud/Documents/CODE/webqit/webflo/modules/client/Worker.js';

/**
 * -----------------
 * Service Worker File
 * -----------------
 */

// >> Worker-Side Routing:
const layout = {};

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
};

// >> Worker Instantiation
Worker.call(null, layout, params);