/**
 * @imports
 */
import { expect } from 'chai';
import { config, runtime, Context } from '@webqit/webflo';

const cx = Context.create({ config: config, flags: { mode: 'test' } });
const app = await runtime.server.start.call(cx);

describe(`Test configs`, function() {

    it(`Should redirect "/about?a=bb" to "/?rdr=about&a=bb".`, async function() {
        const response = await app.go('http://localhost:3000/about?a=bb');
        expect(response.status).to.be.eq('302');
        expect(response.headers.location).to.be.eq('/?rdr=about&a=bb');
    });

});