import * as Hapi from '@hapi/hapi';
import { Server } from 'socket.io';

import { voteSchema } from '../model/poll.schema';
import { IPollStore } from '../store/poll.store';

export const handler = (store: IPollStore, socket?: Server) => (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
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

  const castVote = store.setVote(poll, userId, vote);

  if (!castVote) {
    // error codes aren't super granular at the momeent
    return h.response({ error: 'not_found' }).code(404);
  }

  socket?.emit('user_voted', castVote);

  return h.response().code(200);
};

export const registerHandler = (server: Hapi.Server, socket: Server, store: IPollStore) => {
  server.route({
    method: 'PUT',
    path: '/poll/vote',
    handler: handler(store, socket),
  });
};
