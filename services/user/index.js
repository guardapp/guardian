const createServer = require('./lib');

createServer()
    .then(server => server.listen(8080))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
