import { Server } from './server';
import { Database } from './database';

const port = +process.env.PORT || 1111;
const databaseUri = process.env.MONGODB_URI || 'mongodb://localhost:27017';

const server = new Server(port);
const dataBase = new Database(databaseUri);

dataBase.connect()
  .then(() => {
    console.info(`Succesfully connected to database on ${databaseUri}`);
    server.start();
  })
  .catch(err => console.error(`Could not connect to database on ${databaseUri}:`, err));
