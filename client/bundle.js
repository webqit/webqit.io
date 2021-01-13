
/**
 * @imports
 */
import * as index1 from './index.js';
import * as index2 from './tooling/index.js';
import Client from 'C:/Users/ox_ha/Documents/CODE/webqit/webflo/modules/client/Client.js';

/**
 * -----------------
 * Client Build File
 * -----------------
 */

// >> Client-Side Routing:
const routes = {};
routes['/'] = index1;
routes['/tooling'] = index2;

// >> Client Params
const params = {
   ROUTES: routes,
};

// >> Client Instantiation
Client.call(null, params);