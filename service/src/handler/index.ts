import * as Hapi from '@hapi/hapi';
import { registerHandler as registerCreatePollHandler } from './createPoll';

export const registerAll = (server: Hapi.Server) => {
  registerCreatePollHandler(server);
};
