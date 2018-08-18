'use strict';

const request = require('request');
const FeedParser = require('feedparser');

const parse = (requestOptions, feedparserOptions) => {
  return new Promise((resolve, reject) => {
    const parsedItems = [];

    const feedParser = new FeedParser(feedparserOptions);
    feedParser.on('error', reject).on('readable', () => {
      let item;

      while (item = feedParser.read()) {
        parsedItems.push(item);
      }

      return parsedItems;
    });

    request
      .get(requestOptions)
      .on('error', reject)
      .pipe(feedParser)
      .on('end', () => resolve(parsedItems));
  });
};

module.exports = { parse };
