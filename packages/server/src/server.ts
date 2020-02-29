import * as express from "express";

import { Logger } from "@guardian/logger";
import { helthcheck } from "./routes";

export class Server {

    app: express.Express;
    logger: Logger;

    constructor(private service: string){
        if (!this.service) throw new TypeError('service name must be provided');
        this.app = express();
        this.logger = new Logger(service);
        this.logger.debug('service created');
        this.app.get('/helthcheck', helthcheck);
    }

    get(route: string, handler: express.RequestHandler) {
        this.app.get(route, handler);
    }

    post(route: string, handler: express.RequestHandler) {
        this.app.post(route, handler);
    }

    put(route: string, handler: express.RequestHandler) {
        this.app.put(route, handler);
    }

    delete(route: string, handler: express.RequestHandler) {
        this.app.delete(route, handler);        
    }

    use(...router: [express.RequestHandler]) {
        this.app.use(router);
    }

    listen(port: number) {
        this.app.listen(port, () => this.logger.debug(`service listening on port ${port}`));
    }
}