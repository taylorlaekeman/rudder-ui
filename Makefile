.PHONY: build, install

build:
	npm run build

install:
	npm install

lint:
	npx eslint src --ext .ts,.tsx

lint-fix:
	npx eslint src --ext .ts,.tsx --fix
