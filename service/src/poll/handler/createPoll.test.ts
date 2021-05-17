import { describe, expect, test } from '@jest/globals';
import { MockHapi } from '../../util/mock-hapi';
import { IPoll } from '../model/poll.interface';
import { IPollStore } from '../store/poll.store';
import { handler as createPoll } from './createPoll';

const TEST_ID = 'test-id';
const TEST_TITLE = 'test-title';

class MockStore implements IPollStore {
  createPoll(title: string): IPoll { 
    return { id: TEST_ID, title: TEST_TITLE };
  }
}

describe('createPoll', () => {
  test('should fail with missing title', () => {
    const handler = createPoll(new MockStore());

    const invalid = new MockHapi();
    
    handler(invalid.request, invalid.toolkit);

    expect(invalid.response).toBe(undefined);
    expect(invalid.responseCode).toBe(400);
  });

  test('should fail with malformed title', () => {
    const handler = createPoll(new MockStore());

    const invalid = new MockHapi({ title: '' });
    
    handler(invalid.request, invalid.toolkit);

    expect(invalid.response).toBe(undefined);
    expect(invalid.responseCode).toBe(400);
  });

  test('should return poll on success', () => {
    const handler = createPoll(new MockStore());

    const POLL_TITLE = 'my title';

    const valid = new MockHapi({ title: POLL_TITLE });
    
    handler(valid.request, valid.toolkit);

    expect(valid.response['id']).toBe(TEST_ID);
    expect(valid.response['title']).toBe(TEST_TITLE);
    expect(valid.responseCode).toBe(200);
  });
});
