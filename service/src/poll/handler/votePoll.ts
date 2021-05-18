import * as Hapi from '@hapi/hapi';

import { voteSchema } from '../model/poll.schema';
import { IPollStore } from '../store/poll.store';

export const handler = (store: IPollStore) => (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
  const { error } = voteSchema.validate(request.payload);

  if (error) {
    return h.response({ error: 'invalid_body' }).code(400);
  }

  const payload = request.payload as any;

  const { pollId, userId, vote } = payload;

  const poll = store.getPoll(pollId);
  
  if (!poll) {
    return h.response({ error: 'not_found' }).code(404);
  }

  const tryVote = store.setVote(poll, userId, vote);

  if (!tryVote) {
    // error codes aren't super granular at the momeent
    return h.response({ error: 'not_found' }).code(404);
  }

  return h.response().code(200);
};

export const registerHandler = (server: Hapi.Server, store: IPollStore) => {
  server.route({
    method: 'PUT',
    path: '/poll/vote',
    handler: handler(store),
  });
};
