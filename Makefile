.PHONY: install clean test

NODE_PATH := ./node_modules/.bin
SHELL     := /usr/bin/env bash
CPUS      := $(shell node -p "require('os').cpus().length" 2> /dev/null || echo 1)
MAKEFLAGS += --jobs $(CPUS)

ESLINT      := $(NODE_PATH)/eslint src/** test/**
MOCHA_FLAGS := --recursive --reporter spec --require test/helper

#:Install npm packages
install:
	npm install

#:Remove all generated assets
clean:; @cat .gitignore | xargs rm -rf

#:Run all tests
ifdef COVERAGE
MOCHA := $(NODE_PATH)/istanbul cover $(NODE_PATH)/_mocha --
else
MOCHA := $(NODE_PATH)/mocha
endif
test:
	$(ESLINT)
	NODE_ENV=test $(MOCHA) $(MOCHA_FLAGS)
