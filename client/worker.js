
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
   scope: '/',
   cache_name: 'cache_v2',
   cache_only_url_list: [''],
   cache_first_url_list: [''],
   network_first_url_list: ['/*'],
   network_only_url_list: [''],
   skip_waiting: false,
   lifecycle_logs: false,
   support_push: false,
};

// >> Worker Instantiation
Worker.call(null, layout, params);