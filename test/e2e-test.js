/* global describe, it, before, after */
const ytmpl = require('../');
const ASSERT = require('assert-diff');
ASSERT.options.strict = true;
const NOCK = require('nock');

describe('e2e', function e2e() {
  this.timeout(0);

  before(() => {
    NOCK.enableNetConnect();
  });

  after(() => {
    NOCK.disableNetConnect();
  });

  it('fetch for NoCopyrightSounds Uploads', async() => {
    const search = await ytmpl('https://www.youtube.com/user/NoCopyrightSounds', { limit: 225 });
    ASSERT.equal(search.id, 'UU_aEa8K-EOJ3D6gOs7HcyNg');
    // Check if limit worked
    ASSERT.equal(search.items.length, 225);
  });

  it('fetch a Album', async() => {
    const ref = 'https://www.youtube.com/playlist?list=RDCLAK5uy_mfTF5DCHZL0zf04WQdXAd8-1cQuvJZXzs';
    const search = await ytmpl(ref, { limit: 105 });
    ASSERT.equal(search.id, 'RDCLAK5uy_mfTF5DCHZL0zf04WQdXAd8-1cQuvJZXzs');
    // Check if indexes worked
    ASSERT.ok(search.items.every(i => i.index === -1));
  });

  it('fetch a non-existing playlist', async() => {
    await ASSERT.rejects(
      ytmpl('PL0123456789ABCDEFGHIJKLMNOPQRSTUV'),
      /API-Error: The playlist does not exist\./,
    );
  });

  it('resolves user to channel', async() => {
    const ref = 'https://www.youtube.com/user/PietSmittie';
    const uploads = await ytmpl.getPlaylistID(ref);
    ASSERT.equal(uploads, 'UUqwGaUvq_l0RKszeHhZ5leA');
  });
});
