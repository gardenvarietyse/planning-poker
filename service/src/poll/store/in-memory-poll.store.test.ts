import { describe, expect, test } from '@jest/globals';
import { InMemoryPollStore } from './in-memory-poll.store';

const UUID_V4_LENGTH = 36;
const POLL_TITLE = 'my poll';
const USER_ID = '42';
const USER_NAME = 'bob';

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
    test('should add user to poll on success', () => {
      const store = new InMemoryPollStore();

      const poll = store.createPoll(POLL_TITLE);

      const user = store.addUser(poll, USER_NAME);
      expect(user).toBeDefined();

      expect(poll.votes.length).toBe(1);

      const userVote = poll.votes[0];
      expect(userVote).toBeDefined();
      expect(userVote.vote).toBeNull();

      expect(userVote.user).toBe(user);
    });
  });

  describe('setVote', () => {
    test('should not set vote for non-existent user', () => {
      const store = new InMemoryPollStore();
      const poll = store.createPoll(POLL_TITLE);

      const result = store.setVote(poll, '2', '1/2');
      expect(result).toBeNull();
    });

    test('should set vote with valid input', () => {
      const store = new InMemoryPollStore();

      const poll = store.createPoll(POLL_TITLE);
      const user = store.addUser(poll, USER_NAME);

      const result = store.setVote(poll, user.id, '1/2');
      expect(result).toBeDefined();

      const { user: voteUser, vote } = result;
      expect(voteUser).toBe(user);
      expect(vote).toBe('1/2');
    });
  });
});
