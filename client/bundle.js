
/**
 * @imports
 */
import * as index1 from './index.js';
import * as index2 from './tooling/index.js';
import Client from '/Users/eslcloud/Documents/CODE/webqit/webflo/modules/client/Client.js';

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

// >> Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/worker.js', {scope: '/'}).then(async registration => {
            console.log('Service worker registered.');
            await /*SUPPORT_PUSH*/undefined ? new Push(registration, {
                registration_url: 'undefined',
                deregistration_url: 'undefined',
                public_key: 'undefined',
            }) : null;
        });
    });
}
