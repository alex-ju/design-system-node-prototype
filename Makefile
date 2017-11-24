
build: node_modules
	node app.js

node_modules: package.json
	npm install

.PHONY: build
