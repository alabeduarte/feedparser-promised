'use strict';

const request = require('request');
const FeedParser = require('./feedParser');

const parse = (requestOptions, feedparserOptions) => {
  return new Promise((resolve, reject) => {
    const feedparser = new FeedParser(feedparserOptions)
      .on('error', reject)
      .on('response', resolve);

    request
      .get(requestOptions)
      .on('error', reject)
      .pipe(feedparser);
  });
};

module.exports = { parse };
