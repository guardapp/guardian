import * as passport from "passport";
import { Strategy as JwtStrategy, StrategyOptions, ExtractJwt } from "passport-jwt";

var opts : StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:'shhh-my-secret',
    issuer: 'guardian@user'
};

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
   done(null, jwt_payload);
   /* User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
    */
}));

const authenticate = passport.authenticate('jwt', {session: false});
export {authenticate, passport};