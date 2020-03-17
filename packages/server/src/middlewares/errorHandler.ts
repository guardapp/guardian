import {Request, Response, NextFunction} from 'express';
import {ServerError} from '../errors';
import {Logger} from '@guardapp/logger';

export const ErrorHandler = (logger: Logger) =>
  (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (!(error instanceof ServerError)) {
      error = ServerError.fromError(error);
    }

    if (error instanceof ServerError) {
      logger.error(`[${error.code}] ${error.stack}`);
      res.status(error.code);
      res.json({error: error.message});
      return;
    }

    next(error);
  };
