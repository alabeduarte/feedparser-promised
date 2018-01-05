'use strict';

const request = require('request');
const FeedParser = require('feedparser');
const Iconv = require('iconv').Iconv;
const zlib = require('zlib');

let items = [];
let feedparser;

module.exports = class FeedParserPromised {
  static parse (requestOptions, feedparserOptions) {
    return new Promise((resolve, reject) => {
      requestOptions = typeof requestOptions == 'string' ? { uri: requestOptions, onError: reject } : requestOptions;
      requestOptions.onError = requestOptions.onError || reject;
      feedparserOptions = feedparserOptions || { onError: reject };
      feedparserOptions.onError = feedparserOptions.onError || reject;

      items = [];
      feedparser = new FeedParser(feedparserOptions);
      const req = request.get(requestOptions);

      feedparser.on('error', feedparserOptions.onError);
      feedparser.on('readable', FeedParserPromised._feedHandler);
      feedparser.on('end', () => { return resolve(items); });

      req.on('error', requestOptions.onError);
      req.on('response', FeedParserPromised._responseHandler);
    });
  }

  static _feedHandler() {
    let item;

    while (item = this.read()) { items.push(item); }

    return items;
  }

  static _responseHandler(res) {
    if (res.statusCode !== 200) {
      req.emit(new Error('HTTP response code !== 200'));
    }

    const encoding = res.headers['content-encoding'] || 'identity';
    const charset = (res.headers['content-type'] || '').split(';').reduce((params, param) => {
      const parts = param.split('=').map(part => { return part.trim(); });

      if (parts.length === 2) {
        params[parts[0]] = parts[1];
      }

      return params;
    }, {}).charset;

    res = FeedParserPromised._maybeDecompress(res, encoding);
    res = FeedParserPromised._maybeTranslate(res, charset);
    return res.pipe(feedparser);
  }

  static _maybeDecompress(res, encoding) {
    let decompress;
    if (encoding.match(/\bdeflate\b/)) {
      decompress = zlib.createInflate();
    } else if (encoding.match(/\bgzip\b/)) {
      decompress = zlib.createGunzip();
    }
    return decompress ? res.pipe(decompress) : res;
  }

  static _maybeTranslate(res, charset) {
    let iconv;
    if (!iconv && charset && !/utf-*8/i.test(charset)) {
      try {
        iconv = new Iconv(charset, 'utf-8');
        iconv.on('error', err => {
          res.emit('error', err);
        });
        res = res.pipe(iconv);
      } catch (err) {
        res.emit('error', err);
      }
    }
    return res;
  }
};
