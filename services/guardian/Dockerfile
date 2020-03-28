FROM node:12-alpine as build
ARG NPM_TOKEN

WORKDIR /usr/src/app
COPY package*.json ./

# npm login + install dependencies + del cred
RUN echo -e "//npm.pkg.github.com/:_authToken=$NPM_TOKEN\n@guardapp:registry=https://npm.pkg.github.com" > .npmrc && \
    npm install && \
    rm -rf .npmrc

# second stage
FROM build
WORKDIR /usr/src/app

# COPY source code
COPY . /usr/src/app

# expose app
EXPOSE 8080

ENTRYPOINT ["node", "--inspect", "index.js"]

