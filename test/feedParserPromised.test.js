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
      { tittle: 'Start City' },
      { tittle: 'The Engine That Does More' },
      { tittle: 'Astronauts Dirty Laundry' }
    ];

    beforeEach( () => {
      nock(aHost).get(aPath)
        .reply(
          200,
          fs.readFileSync(`${__dirname}/feeds/rss2sample.xml`, 'utf-8')
        );
    });

    describe('on end', () => {
      it('parses rss items', (done) => {
        const promise = FeedParserPromised.parse(someUrl);

        promise.then( (items) => {
          assert.equal(expectedItems.length, items.length);

          _.zip(expectedItems, items).forEach( (rightItem, leftItem) => {
            assert.equal(rightItem.title, leftItem.title);
          });

          done();
        }).catch( (err) => {
          done(err);
        });
      });
    });
  });
});
