'use strict';

const request = require('request');
const FeedParser = require('feedparser');

module.exports = class FeedParserPromised {
  static parse (requestOptions, feedparserOptions) {
    return new Promise( (resolve, reject) => {
      const items = [];
      const feedparser = new FeedParser(feedparserOptions);

      if (feedparserOptions.onError) {
        feedparser.on('error', feedparserOptions.onError);
      } else {
        feedparser.on('error', (err) => { reject(err); });
      }

      feedparser.on('readable', () => {
        let item;

        while(item = feedparser.read()) { items.push(item); }

        return items;
      });

      const req = request.get(requestOptions);

      if (requestOptions.onError) {
        req.on('error', requestOptions.onError);
      } else {
        req.on('error', (err) => { reject(err); });
      }

      req.pipe(feedparser);
      req.on('end', () => { return resolve(items); });
    });
  }
};
