import {Request, Response, NextFunction, RequestHandler} from 'express';
import {Forbidden} from '../errors';

interface User extends Express.User {
    scopes: [string]
}

export function authorize(...roles: [string]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!(req.user as User).scopes.some(role => roles.includes(role))) {
      return next(new Forbidden());
    };
    next();
  };
}
