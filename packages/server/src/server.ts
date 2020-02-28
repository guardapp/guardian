import * as express from "express";

import { Logger } from "@guardian/logger";

export class Server {

    app: express.Express;
    logger: Logger;

    constructor(private service: string){
        this.app = express();
        this.logger = new Logger(service);
        this.logger.debug('service created');
    }

    listen(port: number) {
        this.app.listen(port, () => this.logger.debug(`service listening on port ${port}`));
    }
}