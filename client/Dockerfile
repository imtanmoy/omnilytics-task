FROM node:alpine as build-stage

WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY yarn.lock /usr/src/app

RUN yarn --silent

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL "$REACT_APP_API_URL"

COPY ./ /usr/src/app

RUN yarn build


FROM nginx:alpine

COPY --from=build-stage /usr/src/app/build/ /usr/share/nginx/html
COPY --from=build-stage /usr/src/app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

HEALTHCHECK --interval=5s --timeout=3s \
    CMD curl -f http://localhost/ || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
