import passport from 'passport';
import { Strategy as JwtStrategy, StrategyOptions, ExtractJwt } from 'passport-jwt';

const ISSUER = 'guardian@user';

function authenticate() {
	const opts: StrategyOptions = {
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: process.env.GUARD_JET_TOKEN,
		issuer: ISSUER,
	};

	passport.use(
		new JwtStrategy(opts, (jwt, done) => {
			done(null, { id: jwt.id, email: jwt.sub, roles: jwt.scopes });
		})
	);

	return (req, res, next) => {
		if (req.body && req.body.operationName === 'IntrospectionQuery') {
			return next();
		}
		passport.authenticate('jwt', { session: false })(req, res, next);
	};
}

export { authenticate, passport, ISSUER };
