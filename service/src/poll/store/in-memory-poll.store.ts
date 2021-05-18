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
      votes: [],
    };

    this.polls.set(id, poll);

    return poll;
  }

  getPoll(id: string): IPoll {
    return this.polls.get(id) || null;
  }

  // todo: why not generate userId here and return user instance
  addUser(pollId: string, userId: string, name: string): boolean {
    const poll = this.polls.get(pollId);

    if (!poll) {
      return false;
    }

    poll.votes = [
      ...poll.votes,
      {
        user: { id: userId, name },
        vote: null,
      }
    ];

    return true;
  }

  setVote(pollId: string, userId: string, vote: string): boolean {
    const poll = this.polls.get(pollId);

    if (!poll) {
      return false;
    }

    const userVote = poll.votes.find(v => v.user.id === userId);

    if (!userVote) {
      return false;
    }

    userVote.vote = vote;

    return true;
  }
}
