import request from 'request';
import FeedParser from 'feedparser';

export default class FeedParserPromised {
  static parse (uri) {
    return new Promise( (resolve, reject) => {
      const items = [];
      const feedparser = new FeedParser();

      feedparser.on('error', (err) => {
        reject(err);
      });

      feedparser.on('readable', () => {
        let item;

        while(item = feedparser.read()) { items.push(item); }

        return items;
      });

      request.get(uri)
        .on('error', (err) => { reject(err); })
        .pipe(feedparser)
        .on('end', () => { return resolve(items); });
    });
  }
}
