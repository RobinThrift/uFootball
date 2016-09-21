P="\\033[34m[+]\\033[0m"

BIN_DIR ?= node_modules/.bin
BUILD_DIR ?= dist

BUILD_FLAGS ?=


build: export NODE_ENV = production
build:
	@echo "  $(P) build"
	node --max_old_space_size=4096\
		node_modules/react-native/local-cli/cli.js bundle\
		--platform ios --entry-file index.ios.js\
		--bundle-output ios/main.jsbundle


test:
	@$(BIN_DIR)/ava src/**/__test__/**.spec.js

watch-test:
	@$(BIN_DIR)/ava --watch src/**/__test__/**.spec.js


lint:
	@echo "  $(P) lint"
	@$(BIN_DIR)/eslint -c .eslintrc src/*


flow:
	@echo "  $(P) flow"
	@$(BIN_DIR)/flow check

check: lint flow


run:
	@echo "  $(P) run"
	@$(BIN_DIR)/react-native run-ios


.PHONY: test build

