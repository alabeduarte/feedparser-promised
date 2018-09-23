const { internet } = require('faker');
const nock = require('nock');
const xmlbuilder = require('xmlbuilder');

const { parse } = require('./feedParserPromised');

describe('FeedParserPromised', () => {
  let aHost, uri;

  const feedPath = '/feed';
  const rssFeedXML = xmlbuilder
    .create({
      rss: {
        channel: [
          {
            item: {
              title: 'first item'
            }
          },
          {
            item: {
              title: 'second item'
            }
          }
        ]
      }
    })
    .end({ pretty: true });

  beforeEach(() => {
    aHost = internet.url();
    uri = aHost.concat(feedPath);
  });

  it('parses a feed', async () => {
    nock(aHost)
      .get(feedPath)
      .reply(200, rssFeedXML);

    const [firstFeed, secondFeed] = await parse(uri);

    expect(firstFeed['rss:title']).toEqual({ '@': {}, '#': 'first item' });
    expect(secondFeed['rss:title']).toEqual({ '@': {}, '#': 'second item' });
  });

  it('accepts request options', async () => {
    nock(aHost)
      .get(feedPath)
      .reply(200, rssFeedXML);

    const [firstFeed, secondFeed] = await parse({ uri, gzip: true });

    expect(firstFeed['rss:title']).toEqual({ '@': {}, '#': 'first item' });
    expect(secondFeed['rss:title']).toEqual({ '@': {}, '#': 'second item' });
  });

  it('accepts feedparser options', async () => {
    nock(aHost)
      .get(feedPath)
      .reply(200, rssFeedXML);

    const [firstFeed, secondFeed] = await parse(uri, { normalize: false });

    expect(firstFeed['rss:title']).toEqual({ '@': {}, '#': 'first item' });
    expect(secondFeed['rss:title']).toEqual({ '@': {}, '#': 'second item' });
  });

  it('handles malformed feed', done => {
    const badFeed = {};

    nock(aHost)
      .get(feedPath)
      .reply(200, badFeed);

    parse(uri).catch(error => {
      expect(error.message).toMatch(/Not a feed/);
      done();
    });
  });

  it('handles invalid URI', done => {
    parse('invalid uri').catch(error => {
      expect(error.message).toMatch(/Invalid URI "invalid%20uri"/);
      done();
    });
  });
});
