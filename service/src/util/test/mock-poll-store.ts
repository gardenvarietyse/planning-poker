/*
  mock poll store for use in unit tests
*/

import { IPoll, IUser } from '../../poll/model/poll.interface';
import { IPollStore } from '../../poll/store/poll.store';

export const VALID_POLL_ID = '33e6c756-7890-4a50-aed2-354405914231';
export const VALID_USER_ID = '1df8ddfc-41e7-4af1-969c-cefa9c53f4d8';
const TEST_TITLE = 'test-title';

const MOCK_POLL = {
  id: VALID_POLL_ID,
  title: TEST_TITLE,
  votes: [
    { user: { id: VALID_USER_ID, name: 'bob' }, vote: '1' },
    { user: { id: '2', name: 'alice' }, vote: '1/2' },
  ],
};

export class MockStore implements IPollStore {
  users: IUser[] = [];

  private nextUserId = 2;

  createPoll(title: string): IPoll { 
    return MOCK_POLL;
  }

  getPoll(id: string): IPoll {
    if (id === VALID_POLL_ID) {
      return MOCK_POLL;
    }

    return null;
  }

  addUser(poll: IPoll, name: string): IUser {
    const user = {
      id: `${++this.nextUserId}`,
      name,
    };

    this.users = [...this.users, user];

    return user;
  }

  setVote(poll: IPoll, userId: string, vote: string): boolean {
    if (poll.id !== VALID_POLL_ID) {
      return false;
    }

    if (userId !== VALID_USER_ID) {
      return false;
    }
    
    return true;
  }
}
