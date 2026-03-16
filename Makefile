help:  ## Display this help
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n\nTargets:\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-13s\033[0m %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

clean: ## Clean all build artifacts of this project
	@echo Cleaning build Directories...
	rm -rf build/ */build/ */dist */node_modules client/sdk server/ssdk app/.next server/yarn.lock
	@echo Cleaning complete.