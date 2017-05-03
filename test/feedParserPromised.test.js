'use strict';

const faker = require('faker');
const nock = require('nock');
const fs = require('fs');
const _ = require('lodash');

const FeedParserPromised = require('../src/feedParserPromised');

describe('FeedparserPromised', () => {
  describe('.parse', () => {
    const aHost = faker.internet.url();
    const aPath = '/rss';
    const someUrl = `${aHost}${aPath}`;
    const rssFile = fs.readFileSync(
      `${__dirname}/feeds/rss2sample.xml`,
      'utf-8'
    )
    const expectedItems = [
      { title: 'Star City' },
      { title: 'The Engine That Does More' },
      { title: 'Astronauts Dirty Laundry' }
    ];

    describe('on success', () => {
      it('parses rss items', (done) => {
        nock(aHost).get(aPath).reply(200, rssFile);

        const promise = FeedParserPromised.parse(someUrl);

        promise.then( (items) => {
          assert.equal(expectedItems.length, items.length);

          _.zip(expectedItems, items).forEach( (zippedItems) => {
            assert.equal(zippedItems[0].title, zippedItems[1].title);
          });
        }).then(done).catch( (err) => done(err));
      });

      it('parses rss items using optionals parameters for request', (done) => {
        nock(aHost).get(aPath).reply(200, rssFile);

        const promise = FeedParserPromised.parse(
          { uri: someUrl, timeout: 3000, foo: 'bar' }
        );

        promise.then( (items) => {
          assert.equal(expectedItems.length, items.length);

          _.zip(expectedItems, items).forEach( (zippedItems) => {
            assert.equal(zippedItems[0].title, zippedItems[1].title);
          });
        }).then(done).catch( (err) => done(err));
      });
    });

    describe('on feedparse error', () => {
      it('handles error on socket timeout error', (done) => {
        nock(aHost).get(aPath).socketDelay(2).reply(408, 'ESOCKETTIMEDOUT');

        const promise = FeedParserPromised.parse(
          { uri: someUrl, timeout: 1 }
        );

        promise.catch( (error) => {
          assert.deepEqual({ code: 'ESOCKETTIMEDOUT', connect: false }, error);
        }).then(done).catch( (err) => done(err));
      });

      it('handles invalid uri', (done) => {
        const invalidUri = 'invalid uri';
        const promise = FeedParserPromised.parse(invalidUri);

        const errorInvalidURI = new Error('Invalid URI "invalid%20uri"');
        promise.catch( (error) => {
          assert.deepEqual(errorInvalidURI, error);
        }).then(done).catch( (err) => done(err));
      });
    });
  });
});
