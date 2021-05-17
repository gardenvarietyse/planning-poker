/*
  boilerplate hapi init for now
*/

import * as Hapi from '@hapi/hapi';
import { registerPollFeature } from './poll';

const init = async () => {
    const server = new Hapi.Server({
        port: 3000,
        host: 'localhost',
    });

    registerPollFeature(server);
    
    await server.start();
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
