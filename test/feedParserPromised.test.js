import faker from 'faker';
import nock from 'nock';
import fs from 'fs';
import _ from 'lodash';

import FeedParserPromised from '../src/feedParserPromised';

describe('FeedparserPromised', () => {
  describe('.parse', () => {
    const aHost = faker.internet.url();
    const aPath = '/rss';

    const someUrl = `${aHost}${aPath}`;
    const expectedItems = [
      { title: 'Star City' },
      { title: 'The Engine That Does More' },
      { title: 'Astronauts Dirty Laundry' }
    ];

    beforeEach( () => {
      nock(aHost).get(aPath)
        .reply(
          200,
          fs.readFileSync(`${__dirname}/feeds/rss2sample.xml`, 'utf-8')
        );
    });

    describe('on success', () => {
      it('parses rss items', (done) => {
        const promise = FeedParserPromised.parse(someUrl);

        promise.then( (items) => {
          assert.equal(expectedItems.length, items.length);

          _.zip(expectedItems, items).forEach( (zippedItems) => {
            assert.equal(zippedItems[0].title, zippedItems[1].title);
          });

          done();
        }).catch( (err) => {
          done(err);
        });
      });
    });

    describe('on feedparse error', () => {
      const invalidUrl = 'invalid url';

      it('parses rss items', (done) => {
        const promise = FeedParserPromised.parse(invalidUrl);

        const errorInvalidURI = new Error('Invalid URI "invalid%20url"');
        promise.catch( (error) => {
          assert.deepEqual(errorInvalidURI, error);

          done();
        }).catch( (err) => {
          done(err);
        });
      });
    });
  });
});
