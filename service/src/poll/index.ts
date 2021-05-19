import * as Hapi from '@hapi/hapi';
import { Server } from 'socket.io';

import { registerHandler as registerCreatePollHandler } from './handler/createPoll';
import { registerHandler as registerJoinPollHandler } from './handler/joinPoll';
import { registerHandler as registerVotePollHandler } from './handler/votePoll';

import { InMemoryPollStore } from './store/in-memory-poll.store';
import { IPollStoreConstructor } from './store/poll.store';

export const registerPollFeature = (server: Hapi.Server, socket: Server, storeCtor: IPollStoreConstructor = InMemoryPollStore) => {
  const store = new storeCtor();

  registerCreatePollHandler(server, store);
  registerJoinPollHandler(server, socket, store);
  registerVotePollHandler(server, store);  
};
