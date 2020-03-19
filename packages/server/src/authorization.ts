import * as passport from 'passport';
import {Strategy as JwtStrategy, StrategyOptions, ExtractJwt} from 'passport-jwt';

const ISSUER = 'guardian@user';

function authenticate() {
  const opts : StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.GUARD_JET_TOKEN,
    issuer: ISSUER
  };

  passport.use(new JwtStrategy(opts, (jwt, done) => {
    done(null, {id: jwt.id, username: jwt.sub, scopes: jwt.scopes});
  }));

  return passport.authenticate('jwt', {session: false});
}

export {authenticate, passport, ISSUER};
