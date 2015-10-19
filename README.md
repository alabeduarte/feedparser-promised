# feedparser-promised

[![Build
Status](https://snap-ci.com/alabeduarte/feedparser-promised/branch/master/build_image)](https://snap-ci.com/alabeduarte/feedparser-promised/branch/master)
[![npm][npm-image]][npm-url]
[![downloads][downloads-image]][downloads-url]
[npm-image]: https://img.shields.io/npm/v/feedparser-promised.svg?style=flat
[npm-url]: https://npmjs.org/package/feedparser-promised
[downloads-image]: https://img.shields.io/npm/dm/feedparser-promised.svg?style=flat
[downloads-url]: https://npmjs.org/package/feedparser-promised

## Install

```
  $ npm install --save feedparser-promised
```

## Usage

```javascript
  var feedparser = require('feedparser-promised');
  var url = 'http://feeds.feedwrench.com/JavaScriptJabber.rss';

  feedparser.parse(url).then(function (items) {
    items.forEach(function (item) {
      console.log('title: ', item.title);
    });
  });
```

## For ES6 users

```javascript
  import feedparser from 'feedparser-promised';

  const url = 'http://feeds.feedwrench.com/JavaScriptJabber.rss';

  feedparser.parse(url).then( (items) => {
    items.forEach( (item) => {
      console.log(`title: ${item.tittle}`);
    });
  });
```

### Contributing

### Running Tests

```bash
$ make test
```
