import * as Hapi from '@hapi/hapi';

const handler = (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
  return h.response({ response: 'hiiii'}).code(201);
};

export const registerHandler = (server: Hapi.Server) => {
  server.route({
    method: 'POST',
    path: '/poll',
    handler,
  });
};
