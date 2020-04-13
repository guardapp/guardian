import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import {
	ApolloServer,
	gql,
	ApolloServerExpressConfig,
	UserInputError,
	ValidationError,
} from 'apollo-server-express';
import DataLoader from 'dataloader';

import { Logger } from '@guardapp/logger';
import { config } from '@guardapp/config';
import { SQL, SqlOptions, Model, Op } from '@guardapp/sql';
import { authenticate, passport, ISSUER } from './authentication';

export * from './authorization';
export {
	passport,
	ISSUER,
	express,
	bodyParser,
	Model,
	Op,
	gql,
	DataLoader,
	UserInputError,
	ValidationError,
};

export interface ServerOptions extends ApolloServerExpressConfig {
	serviceName: string;
	sqlOptions?: SqlOptions;
}

export class Server {
	app: express.Express;
	logger: Logger;
	sql: SQL;

	constructor(private options: ServerOptions) {
		// create app
		if (!this.options.serviceName) throw new TypeError('service name must be provided');
		this.app = express();
		this.logger = new Logger(this.options.serviceName);
		this.sql = this.options.sqlOptions ? new SQL(this.options.sqlOptions) : null;

		// read configuration
		config();

		// add default routes
		this.app.get('/helthcheck', (req, res) => {
			res.send('OK');
		});

		// authentication
		this.app.use(passport.initialize());
		this.app.use(bodyParser.json());
		this.app.post('/graphql', authenticate(), (req, res, next) => next());

		// build context
		this.options.context = async ({ req }) => {
			let models = {};
			if (this.sql) {
				models = await this.sql.init();
			}

			return {
				user: req.user,
				models,
			};
		};

		// create graphql
		const apollo = new ApolloServer(options);
		apollo.applyMiddleware({ app: this.app });
		this.logger.debug(`service "${this.options.serviceName}" is created`);
	}

	listen(port: number) {
		// error handler
		this.app.use(this.handleError.bind(this));
		// listern to port
		this.app.listen(port, () => {
			this.logger.info(`service listening on port [:${port}]`);
			this.logger.debug(`registered routes:`);
			this.printRoutes(this.app._router);
		});
	}

	private handleError(err: Error, req: Request, res: Response, next: NextFunction) {
		this.logger.error(err.stack);
		res.sendStatus(500);
	}

	private printRoutes(router) {
		if (router && router.stack) {
			router.stack.forEach((layer) => {
				if (layer.name === 'router') {
					this.printRoutes(layer.handle);
				} else if (layer.route) {
					const methods = Object.keys(layer.route.methods);
					for (const method of methods) {
						if (!method.startsWith('_')) {
							this.logger.debug(`\t[${method.toUpperCase()}] => ${layer.route.path}`);
						}
					}
				}
			});
		}
	}
}

// export async function createServer(service: string) {
//   await init();
//   return new Server(service);
// }
