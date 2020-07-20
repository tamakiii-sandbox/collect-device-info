.PHONY: help install dependencies build clean

help:
	@cat $(firstword $(MAKEFILE_LIST))

install: \
	dependencies

dependencies:
	type node > /dev/null

build: \
	dist/docomo.json

dist/docomo.json: src/docomo.js dist
	node $< > $@

dist:
	mkdir -p dist

clean:
	rm -rf dist

