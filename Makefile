NODE_PATH := ./node_modules/.bin
SHELL     := /usr/bin/env bash
CPUS      := $(shell node -p "require('os').cpus().length" 2> /dev/null || echo 1)
MAKEFLAGS += --jobs $(CPUS)

ESLINT      := $(NODE_PATH)/eslint --parser 'babel-eslint' src/** test/**
COMPILERS   := --compilers js:babel/register
MOCHA_FLAGS := --recursive --reporter spec --require test/helper

#:Install npm packages
.PHONY: install
install:
	npm install

#:Remove all generated assets
.PHONY: clean
clean:; @cat .gitignore | xargs rm -rf

#:Run all tests
.PHONY: test
ifdef CI
NPM_INSTALL := $(MAKE) install
endif
ifdef COVERAGE
MOCHA := $(NODE_PATH)/istanbul cover $(NODE_PATH)/_mocha --
else
MOCHA := $(NODE_PATH)/mocha
endif
test:
	$(NPM_INSTALL)
	$(ESLINT)
	NODE_ENV=test time $(MOCHA) $(MOCHA_FLAGS) $(COMPILERS)

release:
	npm publish
