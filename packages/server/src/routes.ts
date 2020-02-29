import { Request, Response } from "express";

export function helthcheck(req: Request, res: Response) {
    res.send('OK');
}