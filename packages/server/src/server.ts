import * as express from 'express';
import * as bodyParser from 'body-parser';
export * from './errors';

import {Logger} from '@guardapp/logger';
import {helthcheck} from './routes';
import {logEveryRequest} from './middlewares/logEveryRequest';
import {authenticate, passport} from './authorization';
import {ErrorHandler} from './middlewares/errorHandler';

export {passport};
export class Server {
    app: express.Express;
    logger: Logger;

    constructor(private service: string) {
      if (!this.service) throw new TypeError('service name must be provided');
      this.app = express();
      this.logger = new Logger(service);
      this.logger.debug('service created');
      this.app.get('/helthcheck', helthcheck);

      this.app.use(bodyParser.json());
      this.app.use(passport.initialize());
      this.app.use(logEveryRequest(this.logger));
    }

    private asyncRouteWrapper(fn: express.RequestHandler) {
      return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        fn(req, res, next).catch(next);
      };
    }

    private wrapHandlers(handlers: [express.RequestHandler]) {
      return handlers.map(handler => {
        // wrap async functions
        if (handler.constructor.name === 'AsyncFunction') {
          return this.asyncRouteWrapper(handler);
        }
        return handler;
      });
    }

    get(route: string, ...handlers: [express.RequestHandler]) {
      this.app.get(route, authenticate, this.wrapHandlers(handlers));
    }

    post(route: string, ...handlers: [express.RequestHandler]) {
      this.app.post(route, authenticate, this.wrapHandlers(handlers));
    }

    put(route: string, ...handlers: [express.RequestHandler]) {
      this.app.put(route, authenticate, this.wrapHandlers(handlers));
    }

    delete(route: string, ...handlers: [express.RequestHandler]) {
      this.app.delete(route, authenticate, this.wrapHandlers(handlers));
    }

    use(...router: [express.RequestHandler]) {
      this.app.use(authenticate, this.wrapHandlers(router));
    }

    listen(port: number) {
      // add error handler
      this.app.use(ErrorHandler(this.logger));
      // listern to port
      this.app.listen(port, () => {
        this.logger.debug(`service listening on port [:${port}]`);
        if (this.app._router && this.app._router.stack) {
          const routes = this.app._router.stack.filter(({route}) => route)
              .map(({route}) => route);

          if (routes && routes.length > 0) {
            this.logger.debug(`registered routes:`);
            routes.forEach(route => {
              const methods = Object.keys(route.methods);
              for (const method of methods) {
                this.logger.debug(`[${method.toUpperCase()}] => ${route.path}`);
              }
            });
          }
        }
      });
    }
}
