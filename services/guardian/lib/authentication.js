const crypto = require('crypto');
const {Strategy: LocalStrtegy} = require('passport-local');
const jwt = require('jsonwebtoken');
const {ISSUER, passport} = require('@guardapp/server');
const {BadRequest} = require('./errors');

const INVALID_USER_MESSAGE = 'username or password are incorrect';

module.exports = (sql) => {
  passport.use(new LocalStrtegy({usernameField: 'email'}, async (email, password, done) => {
    try {
      if (!sql.models) {
        await sql.init();
      }
      const user = await sql.models.user.findOne({
        where: {email},
        include: [sql.models.role]
      });

      // user exits?
      if (!user) return done(new BadRequest(INVALID_USER_MESSAGE));
      // password match?
      const hash = crypto.createHash('sha256');
      hash.update(user.salt + password);
      const hashedPassword = hash.digest('hex');
      if (hashedPassword !== user.password) return done(new BadRequest(INVALID_USER_MESSAGE));
      // sign user in
      jwt.sign(
          {
            id: user.id,
            scopes: user.roles.map(role => role.name)
          },
          process.env.GUARD_JET_TOKEN,
          {
            issuer: ISSUER,
            subject: user.email,
            expiresIn: Math.floor(Date.now() / 1000) + (60 * 60)
          },
          done
      );
    } catch (err) {
      done(err);
    }
  }));

  return passport.authenticate('local', {session: false});
};
