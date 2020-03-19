const crypto = require('crypto');
const {Strategy: LocalStrtegy} = require('passport-local');
const jwt = require('jsonwebtoken');
const {BadRequest, ISSUER} = require('@guardapp/server');
const db = require('./db');

const INVALID_USER_MESSAGE = 'username or password are incorrect';

module.exports = passport => {
  passport.use(new LocalStrtegy(async (username, password, done) => {
    try {
      const seq = await db();
      const user = await seq.models.user.findOne({
        where: {username},
        include: [seq.models.role]
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
          process.env.GUARD_JET_TOKEN, {
            issuer: ISSUER,
            subject: user.username,
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
