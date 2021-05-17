import { v4 as uuidv4 } from 'uuid';

import { IPoll } from '../model/poll.interface';
import { IPollStore } from './poll.store';

export class InMemoryPollStore implements IPollStore {
  // todo: some kind of ttl/cleanup for polls
  private polls = new Map<string, IPoll>();
  
  createPoll(title: string): IPoll {
    const id = uuidv4();

    const poll = {
      id,
      title,
    };

    this.polls.set(id, poll);

    return poll;
  }
}
