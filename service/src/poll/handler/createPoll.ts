import * as Hapi from '@hapi/hapi';
import { postSchema } from '../model/poll.schema';
import { IPollStore, IPollStoreConstructor } from '../store/poll.store';

export const handler = (store: IPollStore) => (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
  const { error } = postSchema.validate(request.payload);

  if (error) {
    return h.response().code(400);
  }

  // probably need a better way to manage schemas and request body types
  const { title } = request.payload as any;
  const poll = store.createPoll(title);

  return h.response(poll).code(200);
};

export const registerHandler = (server: Hapi.Server, StoreCtor: IPollStoreConstructor) => {
  server.route({
    method: 'POST',
    path: '/poll',
    handler: handler(new StoreCtor()),
  });
};
