const {Server, passport, NotFound} = require('@guardapp/server');
const {sql} = require('@guardapp/sql');
const {init} = require('@guardapp/config');
const authenticate = require('./authentication');

const server = new Server('user');
let userModel;
(async () => {
  await init();
  const {user} = await sql({maxRetries: 3});
  userModel = user;
})();

server.app.post('/login', authenticate(passport), (req, res) => {
  res.json({
    token: req.user,
  });
});

server.get('/me', async (req, res) => {
  const u = await userModel.findByPk(req.user.id);
  if (!u) throw new NotFound('user is not found');
  res.json(u);
});

module.exports = {server};
