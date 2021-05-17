import { describe, expect, test } from '@jest/globals';
import { InMemoryPollStore } from './in-memory-poll.store';

const UUID_V4_LENGTH = 36;

describe('InMemoryPollStore', () => {
  describe('createPoll', () => {
    test('should create a poll', () => {
      const POLL_TITLE = 'my poll';

      const store = new InMemoryPollStore();
      expect(store['polls'].size).toBe(0);

      const poll = store.createPoll(POLL_TITLE);

      expect(poll).not.toBeNull();
      expect(poll.id).toHaveLength(UUID_V4_LENGTH);
      expect(poll.title).toBe(POLL_TITLE)

      expect(store['polls'].size).toBe(1);

      const storedPoll = store['polls'].get(poll.id);
      expect(storedPoll).toBe(poll);
    });
  });
});
