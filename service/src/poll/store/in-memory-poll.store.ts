import { v4 as uuidv4 } from 'uuid';

import { IPoll, IUser, IVote } from '../model/poll.interface';
import { IPollStore } from './poll.store';

export class InMemoryPollStore implements IPollStore {
  // todo: some kind of ttl/cleanup for polls
  private polls = new Map<string, IPoll>();
  
  createPoll(title: string): IPoll {
    const id = uuidv4();

    const poll = {
      id,
      title,
      votes: [],
    };

    this.polls.set(id, poll);

    return poll;
  }

  getPoll(id: string): IPoll {
    return this.polls.get(id) || null;
  }

  addUser(poll: IPoll, name: string): IUser {
    const id = uuidv4();

    const user = {
      id, name,
    };

    poll.votes = [
      ...poll.votes,
      {
        user,
        vote: null,
      }
    ];

    return user;
  }

  setVote(poll: IPoll, userId: string, vote: string): IVote {
    const userVote = poll.votes.find(v => v.user.id === userId);

    if (!userVote) {
      return null;
    }

    userVote.vote = vote;

    return userVote;
  }
}
