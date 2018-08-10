#!/usr/bin/env bash

set -e

CURRENT_DIR=`pwd`
SMOKE_TEST_DIR=smoke-test

function pack () {
dir=$1
echo "packing"

rm -rf $dir
yarn pack
mkdir -p $dir
mv *.tgz $dir

echo "listing file tree with smoke test setup"
ls -lah
ls -lah $SMOKE_TEST_DIR
}

function init () {
dir=$1

cd $dir

package=`ls | grep *.tgz`
yarn init -y

echo "installing package from local source"
yarn add file:$package
yarn add mocha@3.2.0
}

function generate_file () {
echo "generating file"

cat <<EOF >$1
var assert = require('assert');
var feedparser = require('feedparser-promised');
var url = 'http://feeds.feedwrench.com/JavaScriptJabber.rss';

describe('Smoke Test :: feedparser-promised', function () {
  it('parses data from JavaScriptJabber', function () {
    return feedparser.parse(url).then(function (items) {
      assert.ok(items);

      items.forEach(function (item) {
        assert.ok(item);
        assert.ok(item.title);

        console.log('title: ', item.title);
      });
    });
  });
});
EOF
}

function run () {
echo "execute smoke test"
./node_modules/mocha/bin/mocha --no-timeouts
}

function clear () {
echo "removing smoke test files"
cd $1
rm -rf $2
}

pack $SMOKE_TEST_DIR
init $SMOKE_TEST_DIR
generate_file "test.js"
run
clear $CURRENT_DIR $SMOKE_TEST_DIR
