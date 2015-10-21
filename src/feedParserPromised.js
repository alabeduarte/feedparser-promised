import request from 'request';
import FeedParser from 'feedparser';

export default class FeedParserPromised {
  static parse (url) {
    return new Promise( (resolve) => {
      const items = [];
      const feedparser = new FeedParser();

      feedparser.on('readable', () => {
        let item;

        while(item = feedparser.read()) { items.push(item); }

        return items;
      });

      request.get(url)
        .pipe(feedparser)
        .on('end', () => { return resolve(items); });
    });
  }
}
