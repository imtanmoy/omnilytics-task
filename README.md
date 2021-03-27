# Random Object Generator

### Built With

- Docker & Docker Compose
- [Flask](https://flask.palletsprojects.com)
- [React](https://reactjs.org)

## Installation

#### Prerequisites

- Python 3.9+
- Node 12+
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

#### 1. Clone the repository

```bash
git clone https://github.com/imtanmoy/omnilytics-task.git && cd omnilytics-task
```

#### 2. Use Docker and Docker Compose

```bash
docker-compose up -d --build
```

## Usage

```bash
docker-compose up -d
```

Go to [`http://0.0.0.0:3000`](http://0.0.0.0:3000).

## Note

Single character takes exactly 8 bits to be stored in, that's 1 byte (B).
So 1 MB = 1024KB and 1 KB = 1024B so 1 MB has 1024 x 1024 = 1,048,576 bytes, that's 1,048,576 characters, that includes everything
