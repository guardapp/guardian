const {Strategy: LocalStrtegy} = require('passport-local');
const jwt = require('jsonwebtoken');

const SECRET = 'shhh-my-secret';
const ISSUER = 'guardian@user';

module.exports = passport => {
  passport.use(new LocalStrtegy((username, password, done) => {
    if (username === 'amir' && password === '1234') {
      jwt.sign(
          {id: 100, username: 'amirz'},
          SECRET, {
            issuer: ISSUER,
            expiresIn: Math.floor(Date.now() / 1000) + (60 * 60)
          },
          done
      );
    } else {
      done(null, false);
    }
  }));

  return passport.authenticate('local', {session: false});
};
