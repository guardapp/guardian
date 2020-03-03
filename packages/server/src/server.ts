import * as express from "express";
import * as bodyParser from "body-parser";

import { Logger } from "@guardian/logger";
import { helthcheck } from "./routes";
import { logEveryRequest } from "./middlewares/logEveryRequest";
import { authenticate, passport } from "./authorization";

export {passport};
export class Server {

    app: express.Express;
    logger: Logger;

    constructor(private service: string){
        if (!this.service) throw new TypeError('service name must be provided');
        this.app = express();
        this.logger = new Logger(service);
        this.logger.debug('service created');
        this.app.get('/helthcheck', helthcheck);
        
        this.app.use(bodyParser.json());
        this.app.use(passport.initialize());
        this.app.use(logEveryRequest(this.logger));
    }

    get(route: string, ...handlers: [express.RequestHandler]) {
        this.app.get(route, authenticate, handlers);
    }

    post(route: string, ...handlers: [express.RequestHandler]) {
        this.app.post(route,  authenticate, handlers);
    }

    put(route: string, ...handlers: [express.RequestHandler]) {
        this.app.put(route,  authenticate, handlers);
    }

    delete(route: string, ...handlers: [express.RequestHandler]) {
        this.app.delete(route,  authenticate, handlers);        
    }

    use(...router: [express.RequestHandler]) {
        this.app.use(authenticate, router);
    }

    listen(port: number) {
        this.app.listen(port, () => {
            this.logger.debug(`service listening on port [:${port}]`);
            if (this.app._router && this.app._router.stack) {
                const routes = this.app._router.stack.filter(({route}) => route)
                    .map(({route}) => route);
                
                if(routes && routes.length > 0) {
                    this.logger.debug(`registered routes:`);
                    routes.forEach(route => {
                        const methods = Object.keys(route.methods);
                        for(const method of methods) {
                            this.logger.debug(`[${method.toUpperCase()}] => ${route.path}`);
                        }
                    });
                }
            }
        });
    }
}