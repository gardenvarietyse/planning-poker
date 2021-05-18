import { describe, expect, test } from '@jest/globals';
import { MockHapi } from '../../util/test/mock-hapi';
import { MockStore, VALID_POLL_ID, VALID_USER_ID } from '../../util/test/mock-poll-store';

import { handler as votePoll } from './votePoll';

const UNUSED_UUID = '6dcb8249-2e1a-4d2c-8b6d-d2ec57203cda';
const VALID_REQUEST_BODY = {
  pollId: VALID_POLL_ID,
  userId: VALID_USER_ID,
  vote: '2',
};

describe('votePoll', () => {
  test('should fail with malformed body', () => {
    const handler = votePoll(new MockStore());

    const invalid = new MockHapi({ invalid: 'body' });
    
    handler(invalid.request, invalid.toolkit);

    expect(invalid.response['error']).toBe('invalid_body');
    expect(invalid.responseCode).toBe(400);
  });

  test('should fail with invalid poll id', () => {
    const handler = votePoll(new MockStore());

    const invalid = new MockHapi({ ...VALID_REQUEST_BODY, pollId: UNUSED_UUID });
    
    handler(invalid.request, invalid.toolkit);

    expect(invalid.response['error']).toBe('not_found');
    expect(invalid.responseCode).toBe(404);
  });

  test('should fail with invalid user id', () => {
    const handler = votePoll(new MockStore());

    const invalid = new MockHapi({ ...VALID_REQUEST_BODY, userId: UNUSED_UUID });
    
    handler(invalid.request, invalid.toolkit);

    expect(invalid.response['error']).toBe('not_found');
    expect(invalid.responseCode).toBe(404);
  });

  test('should succeed with valid request body', () => {
    const handler = votePoll(new MockStore());

    const valid = new MockHapi(VALID_REQUEST_BODY);

    handler(valid.request, valid.toolkit);

    expect(valid.response).toBeUndefined();
    expect(valid.responseCode).toBe(200);
  });
});
