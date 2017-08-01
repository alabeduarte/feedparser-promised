'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var request = require('request');
var FeedParser = require('feedparser');

module.exports = function () {
  function FeedParserPromised() {
    _classCallCheck(this, FeedParserPromised);
  }

  _createClass(FeedParserPromised, null, [{
    key: 'parse',
    value: function parse(options) {
      return new Promise(function (resolve, reject) {
        var items = [];
        var feedparser = new FeedParser();

        feedparser.on('error', function (err) {
          reject(err);
        });

        feedparser.on('readable', function () {
          var item = void 0;

          while (item = feedparser.read()) {
            items.push(item);
          }

          return items;
        });

        request.get(options).on('error', function (err) {
          reject(err);
        }).pipe(feedparser).on('end', function () {
          return resolve(items);
        });
      });
    }
  }]);

  return FeedParserPromised;
}();