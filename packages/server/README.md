# `@guardapp/server`

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
![CI](https://github.com/guardapp/guardian/workflows/CI/badge.svg)

Base server for micro-services

## Usage

```javascript
const {Server} = require('@guardapp/server');

const server = new Server('my-service');

server.get('/', getHandler);
server.post('/post', postHandler);
server.put('/put', putHandler);
server.delete('/del', deleteHandler);
server.use(handler);

server.listen(process.env.PORT);
```

## Information

A default route GET `/healthcheck` that response 200 OK, is added to the server
all route defenistions have a built in authentication.
(to bypass authentication use the underlyning express `server.app.get()`)
