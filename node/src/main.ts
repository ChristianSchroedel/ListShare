import { Server } from './server';

const port = +process.env.PORT || 1111;

const server = new Server(port);
server.start();
