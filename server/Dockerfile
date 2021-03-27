# pull official base image
FROM python:3.9.2-slim-buster

# set working directory
WORKDIR /usr/src/app

# create the app user
RUN addgroup --system app && adduser --system --group app

# set environment varibles
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install system dependencies
RUN apt-get update \
    && apt-get -y install curl \
    && apt-get clean


# install python dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt ./
RUN pip install -r requirements.txt

# add app
COPY . .


# chown all the files to the app user
RUN chown -R app:app /usr/src/app

# change to the app user
USER app


HEALTHCHECK --interval=5s --timeout=3s \
    CMD curl -f http://localhost:5000/health || exit 1

CMD gunicorn -w 4 -b 0.0.0.0:5000 wsgi:app --timeout 90