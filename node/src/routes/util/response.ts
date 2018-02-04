import { Request, Response } from 'express';

export function notAllowedResponse(req: Request, res: Response) {
  console.warn(`${req.method} on ${req.originalUrl} not allowed`);

  res.status(405).send('Method Not Allowed');
}

export function notFoundResponse(req: Request, res: Response) {
  console.log(`Url ${req.originalUrl} not found`);

  res.status(404).send('Not Found');
}

export function modifiedResponse(success: boolean, req: Request, res: Response) {
  if (success) {
    console.log(`Modified ${req.originalUrl} using ${req.method}`);
    res.sendStatus(200);
  } else {
    notFoundResponse(req, res);
  }
}

export function readResponse(result: any, req: Request, res: Response) {
  if (result) {
    console.log(`Fetched ${Array.isArray(result) ? result.length : 1} results for ${req.originalUrl}`);
    res.status(200).json(result);
  } else {
    notFoundResponse(req, res);
  }
}

export function createdResponse(id: string, req: Request, res: Response) {
  if (id) {
    console.log(`Created resource for ${req.originalUrl}/${id}`);
    res.status(201).send(`${req.originalUrl}/${id}`);
  } else {
    console.warn(`Entry already exists`);
    res.status(409).send('Conflict');
  }
}

export function errorResponse(err: Error, req: Request, res: Response) {
  // This error occurs if an invalid ID is passed to mongodb.
  if ((err as any).kind === 'ObjectId') {
    notFoundResponse(req, res);
    return;
  }

  console.error(`${req.method} on ${req.originalUrl} failed:`, err.stack);

  res.status(500).send('Internal server error');
}
