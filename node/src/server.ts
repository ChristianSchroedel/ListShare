import * as express from 'express';
import { Application } from 'express';
import * as bodyParser from 'body-parser';

import * as apiLogger from './middleware/api-logger';
import * as lists from './routes/lists';
import { errorHandler } from './middleware/error-handler';

export class Server {
  private app: Application;

  constructor(public port: number = 5555) {
    this.app = express();

    // Setup internal server configuration.
    this.registerMiddleware();
    this.registerRoutes();
    this.registerErrorHandler();
  }

  public start() {
    try {
      this.app.listen(this.port, () => {
        console.log('listening on port ' + this.port);
      });
    } catch (error) {
      console.error(error);
    }
  }

  private registerMiddleware() {
    // Parse incoming requests to JSON.
    this.app.use(bodyParser.json());
    // Log incoming api requests.
    this.app.use(apiLogger);
  }

  private registerRoutes() {
    // Register ToDo lists end point.
    this.app.use('/api/lists', lists);
  }

  private registerErrorHandler() {
    this.app.use(errorHandler);
  }
}
