import { describe, expect, test } from '@jest/globals';
import { InMemoryPollStore } from './in-memory-poll.store';

const UUID_V4_LENGTH = 36;
const POLL_TITLE = 'my poll';

describe('InMemoryPollStore', () => {
  describe('createPoll', () => {
    test('should create a poll', () => {

      const store = new InMemoryPollStore();
      expect(store['polls'].size).toBe(0);

      const poll = store.createPoll(POLL_TITLE);

      expect(poll).toBeDefined();
      expect(poll.id).toHaveLength(UUID_V4_LENGTH);
      expect(poll.title).toBe(POLL_TITLE)

      expect(store['polls'].size).toBe(1);

      const storedPoll = store['polls'].get(poll.id);
      expect(storedPoll).toBe(poll);
    });
  });

  describe('getPoll', () => {
    test('should not find non-existent poll', () => {
      const store = new InMemoryPollStore();

      const poll = store.getPoll('wheres-waldo');
      expect(poll).toBeNull();
    });

    test('should find created poll', () => {
      const store = new InMemoryPollStore();

      const createdPoll = store.createPoll(POLL_TITLE);

      const foundPoll = store.getPoll(createdPoll.id);
      expect(foundPoll).toBeDefined();

      expect(foundPoll).toBe(createdPoll);
    });
  });

  describe('addUser', () => {
    test('should not add user to non-existent poll', () => {
      const store = new InMemoryPollStore();

      const result = store.addUser('no-no-no', '1', 'bob');
      expect(result).toBe(false);
    });
  });

  describe('addUser', () => {
    test('should add user to poll on success', () => {
      const USER_ID = '42';
      const USER_NAME = 'bob';

      const store = new InMemoryPollStore();

      const poll = store.createPoll(POLL_TITLE);

      const result = store.addUser(poll.id, USER_ID, USER_NAME);
      expect(result).toBe(true);

      expect(poll.votes.length).toBe(1);

      const userVote = poll.votes[0];
      expect(userVote).toBeDefined();
      expect(userVote.vote).toBeNull();

      const user = userVote.user;
      expect(user.id).toBe(USER_ID);
      expect(user.name).toBe(USER_NAME);
    });
  });
});
