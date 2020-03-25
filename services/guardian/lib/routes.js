const {bodyParser} = require('@guardapp/server');
const {BadRequest} = require('./errors');
const authentication = require('./authentication');

module.exports = server => {
  server.app.use(bodyParser.json());

  server.app.post('/login', authentication(server.sql), (req, res) => {
    res.json({token: req.user});
  });

  server.app.use((err, req, res, next) => {
    if (err instanceof BadRequest) {
      server.logger.info(err.stack);
      res.status(400);
      return res.json({error: err.message});
    }
    next(err);
  });
};

