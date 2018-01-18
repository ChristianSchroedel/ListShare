import * as express from 'express';
import { Request, Response } from 'express';

import { ToDoListModel } from '../models/todo-list';
import { notAllowedResponse, notFoundResponse, createdResponse, readResponse, modifiedResponse, errorResponse } from './util/response';

const router = express.Router();
const listModel = ToDoListModel.instance;

router.route('/')
  .post((req: Request, res: Response) => {
    listModel
      .create(req.body)
      .then(created => createdResponse(created, req, res))
      .catch(err => errorResponse(err, req, res));
  })
  .get((req: Request, res: Response) => {
    listModel
      .read()
      .then(lists => readResponse(lists, req, res))
      .catch(err => errorResponse(err, req, res));
  })
  .put(notAllowedResponse)
  .patch(notAllowedResponse)
  .delete(notAllowedResponse);

router.route('/:id')
  .post(notAllowedResponse)
  .get((req: Request, res: Response) => {
    listModel
      .read(req.params.id)
      .then(list => readResponse(list, req, res))
      .catch(err => errorResponse(err, req, res));
  })
  .put((req: Request, res: Response) => {
    listModel
      .update(req.params.id, req.body)
      .then(success => modifiedResponse(success, req, res))
      .catch(err => errorResponse(err, req, res));
  })
  .patch((req: Request, res: Response) => {
    listModel
      .update(req.params.id, req.body)
      .then(success => modifiedResponse(success, req, res))
      .catch(err => errorResponse(err, req, res));
  })
  .delete((req: Request, res: Response) => {
    listModel
      .delete(req.params.id)
      .then(success => modifiedResponse(success, req, res))
      .catch(err => errorResponse(err, req, res));
  });

export = router;
