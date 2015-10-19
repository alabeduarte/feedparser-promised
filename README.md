# feedparser-promised

[![Build
Status](https://snap-ci.com/alabeduarte/feedparser-promised/branch/master/build_image)](https://snap-ci.com/alabeduarte/feedparser-promised/branch/master)
[![npm][npm-image]][npm-url]
[![downloads][downloads-image]][downloads-url]
[npm-image]: https://img.shields.io/npm/v/feedparser-promised.svg?style=flat
[npm-url]: https://npmjs.org/package/feedparser-promised
[downloads-image]: https://img.shields.io/npm/dm/feedparser-promised.svg?style=flat
[downloads-url]: https://npmjs.org/package/feedparser-promised

Wrapper around [feedparser](https://github.com/danmactough/node-feedparser) with promises.

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

### List of article properties

* title
* description (frequently, the full article content)
* summary (frequently, an excerpt of the article content)
* link
* origlink (when FeedBurner or Pheedo puts a special tracking url in the `link`
  property, `origlink` contains the original link)
* permalink (when an RSS feed has a `guid` field and the `isPermalink` attribute
  is not set to `false`, `permalink` contains the value of `guid`)
* date (most recent update)
* pubdate (original published date)
* author
* guid (a unique identifier for the article)
* comments (a link to the article's comments section)
* image (an Object containing `url` and `title` properties)
* categories (an Array of Strings)
* source (an Object containing `url` and `title` properties pointing to the
  original source for an article; see the [RSS
  Spec](http://cyber.law.harvard.edu/rss/rss.html#ltsourcegtSubelementOfLtitemgt)
  for an explanation of this element)
* enclosures (an Array of Objects, each representing a podcast or other
  enclosure and having a `url` property and possibly `type` and `length`
  properties)
* meta (an Object containing all the feed meta properties; especially handy when
  using the EventEmitter interface to listen to `article` emissions)

### Contributing

### Running Tests

```bash
$ make test
```
