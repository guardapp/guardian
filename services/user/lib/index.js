const {Server, passport} = require('@guardapp/server');
const {sql} = require('@guardapp/sql');
const authenticate = require('./authentication');

const server = new Server('user');
let user;
(async () => {
  const {user: userModel} = await sql({maxRetries: 3});
  user = userModel;
})();

server.app.get('/me2', async (req, res) => {
  const user = await user.findOne();
  res.json(user);
});


server.app.post('/login', authenticate(passport), (req, res) => {
  res.json({
    token: req.user,
  });
});

server.get('/me', (req, res) => {
  res.json(req.user);
});

module.exports = {server};
