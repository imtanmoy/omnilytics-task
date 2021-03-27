export FLASK_APP=app
export FLASK_CONFIG=development
export FLASK_ENV=development

help: ## Help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

## Install dependencies
.PHONY: install
install:
	pip install -r requirements.txt

## Run Dev Server
.PHONY: run
run:
	flask run -h 0.0.0.0


lint: ## all lint commands
	@echo "Running black"
	python -m black ./app --check
	@echo "Running isort"
	python -m isort .app/*/*.py --check-only


fix: ## fixing all black and isort error
	@echo "Running flake8"
	python -m flake8 ./app
	@echo "Running black"
	python -m black ./app
	@echo "Running isort"
	python -m isort .app/*/*.py