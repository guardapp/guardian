const {Server, passport} = require("@guardapp/server");
const authenticate = require('./authentication');

const server = new Server('user');

server.app.post('/login', authenticate(passport), (req, res) => {
  res.json({
    token: req.user
  })
});

server.get('/', (req, res) => {
  res.json(req.user);
});

module.exports = {server};