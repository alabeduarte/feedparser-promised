'use strict';

const request = require('request');
const feedParser = require('./feedParser');

const parse = (requestOptions, feedparserOptions) => {
  return new Promise((resolve, reject) => {
    request
      .get(requestOptions)
      .on('error', reject)
      .pipe(
        feedParser(feedparserOptions)
          .on('error', reject)
          .on('response', resolve)
      );
  });
};

module.exports = { parse };
