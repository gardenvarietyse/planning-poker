import { describe, expect, test } from '@jest/globals';
import { MockHapi } from '../../util/test/mock-hapi';
import { MockStore, VALID_POLL_ID } from '../../util/test/mock-poll-store';
import { handler as createPoll } from './createPoll';

describe('createPoll', () => {
  test('should fail with missing title', () => {
    const handler = createPoll(new MockStore());

    const invalid = new MockHapi();
    
    handler(invalid.request, invalid.toolkit);

    expect(invalid.response['error']).toBe('invalid_body');
    expect(invalid.responseCode).toBe(400);
  });

  test('should fail with malformed title', () => {
    const handler = createPoll(new MockStore());

    const invalid = new MockHapi({ title: '' });
    
    handler(invalid.request, invalid.toolkit);

    expect(invalid.response['error']).toBe('invalid_body');
    expect(invalid.responseCode).toBe(400);
  });

  test('should return poll on success', () => {
    const handler = createPoll(new MockStore());

    const POLL_TITLE = 'my title';

    const valid = new MockHapi({ title: POLL_TITLE });
    
    handler(valid.request, valid.toolkit);

    expect(valid.response['id']).toBe(VALID_POLL_ID);
    expect(valid.response['title']).toBe('test-title');
    expect(valid.responseCode).toBe(200);
  });
});
