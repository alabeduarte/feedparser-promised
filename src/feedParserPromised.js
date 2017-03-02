'use strict';

const request = require('request');
const FeedParser = require('feedparser');

module.exports = class FeedParserPromised {
  static parse (options) {
    return new Promise( (resolve, reject) => {
      const items = [];
      const feedparser = new FeedParser();

      feedparser.on('error', (err) => { reject(err); });

      feedparser.on('readable', () => {
        let item;

        while(item = feedparser.read()) { items.push(item); }

        return items;
      });

      request.get(options)
        .on('error', (err) => { reject(err); })
        .pipe(feedparser)
        .on('end', () => { return resolve(items); });
    });
  }
};
