import { Request, Response, NextFunction } from "express";
import { Logger } from "@guardapp/logger";

export function logEveryRequest(logger: Logger) {
    return (req: Request, res: Response, next: NextFunction) => {
        const extendLogger = logger.extend('request');   
        req.on('end', () => {
            extendLogger.debug(`[${req.method}] ${req.path} (${res.statusCode})`);
        });
        next();        
    }
}