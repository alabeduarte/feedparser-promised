'use strict';
const FeedParserStream = require('feedparser');

module.exports = feedparserOptions => {
  const parsedItems = [];
  const feedparser = new FeedParserStream(feedparserOptions);

  feedparser
    .on('readable', () => {
      let item;
      while (item = feedparser.read()) {
        parsedItems.push(item);
      }

      return parsedItems;
    })
    .on('end', function next() {
      this.emit('response', parsedItems);
    });

  return feedparser;
};
