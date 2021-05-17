import * as Hapi from '@hapi/hapi';
import { createSchema } from '../model/poll.schema';
import { IPollStore } from '../store/poll.store';

export const handler = (store: IPollStore) => (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
  const { error } = createSchema.validate(request.payload);

  if (error) {
    return h.response({ error: 'invalid_body' }).code(400);
  }

  // probably need a better way to manage schemas and request body types
  const { title } = request.payload as any;
  const poll = store.createPoll(title);

  return h.response(poll).code(200);
};

export const registerHandler = (server: Hapi.Server, store: IPollStore) => {
  server.route({
    method: 'POST',
    path: '/poll',
    handler: handler(store),
  });
};
