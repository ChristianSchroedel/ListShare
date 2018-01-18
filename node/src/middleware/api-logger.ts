import { Request, Response, NextFunction } from 'express';

const logger = (req: Request, res: Response, next: NextFunction) => {
  const originalUrl = req.originalUrl;

  if (originalUrl.indexOf('api') >= 0) {
    console.log(`${req.method} on ${originalUrl}`);
  }

  next();
};

export = logger;
