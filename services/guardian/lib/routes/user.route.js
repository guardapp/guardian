const {express, NotFound, authorize} = require('@guardapp/server');
const db = require('../db');

const router = express.Router();

router.param('user_id', async (req, res, next, id) => {
  try {
    const sql = await db();
    req._user = await sql.models.user.findByPk(id);
    next();
  } catch ( err) {
    next(err);
  }
});

router.use(authorize('ADMIN'));

router.route('/users/:user_id')
    .all( async (req, res, next)=> {
      const sql = await db();
      req.db = sql.models;
      next();
    })
    .get((req, res) => {
      if (!req._user) throw new NotFound('user is not found');
      res.json(req._user);
    })
    .put(async (req, res) => {
      await req._user.addRoles(req.body);
      res.send('OK');
    });

module.exports = router;
