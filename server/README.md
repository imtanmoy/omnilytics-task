# Random Object Generator

### Built With

- [Flask](https://flask.palletsprojects.com)

## Installation

#### Prerequisites

- Python 3.9+

#### Create a virtual Environment

```bash
python -m venv venv
```

#### Activate the environment

```bash
source venv/bin/activate
```

#### Install the application requirements

```bash
pip install -r requirements.txt
```

## Run the application local

```bash
make run
```

#### OR 

```bash
export FLASK_APP=app
export FLASK_CONFIG=development
export FLASK_ENV=development
flask run -h 0.0.0.0
```

Go to [`http://0.0.0.0:5000`](http://0.0.0.0:5000).
