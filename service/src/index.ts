/*
  boilerplate hapi init for now
*/

import * as Hapi from '@hapi/hapi';
import { Server } from 'socket.io';

import { registerPollFeature } from './poll';

const init = async () => {
    const server = new Hapi.Server({
      port: 3000,
      host: 'localhost',
      routes: {
        cors: true
      }
    });
    
    const socket = new Server(server.listener, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    });
    
    registerPollFeature(server, socket);
    await server.start();
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
