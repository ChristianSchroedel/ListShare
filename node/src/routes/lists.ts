import * as express from 'express';
import { Request, Response } from 'express';

import { notAllowedResponse, createdResponse, readResponse, modifiedResponse, errorResponse } from './util/response';
import { ToDoListModel } from '../models/todo-list-model';

const router = express.Router();

router.route('/')
  .post((req: Request, res: Response) => {
    ToDoListModel
      .create(req.body)
      .then(created => createdResponse(created.id, req, res))
      .catch(err => errorResponse(err, req, res));
  })
  .get((req: Request, res: Response) => {
    ToDoListModel
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
    ToDoListModel
      .read(req.params.id)
      .then(list => readResponse(list, req, res))
      .catch(err => errorResponse(err, req, res));
  })
  .put((req: Request, res: Response) => {
    ToDoListModel
      .update(req.params.id, req.body)
      .then(success => modifiedResponse(!!success, req, res))
      .catch(err => errorResponse(err, req, res));
  })
  .patch((req: Request, res: Response) => {
    ToDoListModel
      .update(req.params.id, req.body)
      .then(success => modifiedResponse(!!success, req, res))
      .catch(err => errorResponse(err, req, res));
  })
  .delete((req: Request, res: Response) => {
    ToDoListModel
      .delete(req.params.id)
      .then(success => modifiedResponse(!!success, req, res))
      .catch(err => errorResponse(err, req, res));
  });

export = router;
