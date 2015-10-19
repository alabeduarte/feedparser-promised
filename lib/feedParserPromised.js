import request from 'request';
import FeedParser from 'feedparser';

export default class FeedParserPromised {
  static parse (url) {
    return new Promise( (resolve) => {
      const items = [];
      const req = request(url);
      const feedparser = new FeedParser();

      req.on('response', (response) => {
        return response.pipe(feedparser);
      });

      feedparser.on('readable', () => {
        let item;

        while(item = feedparser.read()) { items.push(item); }

        return items;
      });

      req.on('end', () => {
        return resolve(items);
      });
    });
  }
}
