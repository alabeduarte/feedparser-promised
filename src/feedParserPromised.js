'use strict';

const request = require('request');
const FeedParser = require('feedparser');

const parse = (requestOptions, feedparserOptions) => {
  return new Promise((resolve, reject) => {
    const parsedItems = [];
    const feedparser = new FeedParser(feedparserOptions);

    feedparser.on('error', reject).on('readable', () => {
      let item;

      while (item = feedparser.read()) {
        parsedItems.push(item);
      }

      return parsedItems;
    });

    request
      .get(requestOptions)
      .on('error', reject)
      .pipe(feedparser)
      .on('end', () => resolve(parsedItems));
  });
};

module.exports = { parse };
