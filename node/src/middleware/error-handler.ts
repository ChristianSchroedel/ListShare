import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(`${req.method} on ${req.originalUrl} failed:`, err.stack);
  res.status(500).send(err.message);
}
