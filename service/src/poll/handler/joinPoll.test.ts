import { describe, expect, test } from '@jest/globals';
import { MockHapi } from '../../util/test/mock-hapi';
import { MockStore, VALID_POLL_ID } from '../../util/test/mock-poll-store';
import { handler as joinPoll } from './joinPoll';

const VALID_REQUEST_BODY = {
  pollId: '33e6c756-7890-4a50-aed2-354405914231',
  name: 'bob',
};

describe('joinPoll', () => {
  test('should fail with malformed id', () => {
    const handler = joinPoll(new MockStore());

    const invalid = new MockHapi({ VALID_REQUEST_BODY, pollId: 'invalid' });
    
    handler(invalid.request, invalid.toolkit);

    expect(invalid.response['error']).toBe('invalid_body');
    expect(invalid.responseCode).toBe(400);
  });

  test('should fail with non-existent poll', () => {
    const handler = joinPoll(new MockStore());

    const valid = new MockHapi({ ...VALID_REQUEST_BODY, pollId: '80cc67bf-c207-4d3d-952c-f3367a8fe99b' });
    
    handler(valid.request, valid.toolkit);

    expect(valid.response['error']).toBe('not_found');
    expect(valid.responseCode).toBe(404);
  });

  test('should fail with malformed request body', () => {
    const handler = joinPoll(new MockStore());

    // name field missing
    const invalid = new MockHapi({ });
    
    handler(invalid.request, invalid.toolkit);

    expect(invalid.response['error']).toBe('invalid_body');
    expect(invalid.responseCode).toBe(400);
  });

  test('should fail with malformed name', () => {
    const handler = joinPoll(new MockStore());

    // name field missing
    const invalid = new MockHapi({ ...VALID_REQUEST_BODY, name: '' });
    
    handler(invalid.request, invalid.toolkit);

    expect(invalid.response['error']).toBe('invalid_body');
    expect(invalid.responseCode).toBe(400);
  });

  test('should add user, return poll state on success', () => {
    const store = new MockStore();
    const handler = joinPoll(store);

    const valid = new MockHapi(VALID_REQUEST_BODY);
    
    handler(valid.request, valid.toolkit);

    expect(store.users.length).toBe(1);
    
    const user = store.users[0];
    expect(user.name).toBe(VALID_REQUEST_BODY.name);
    expect(user.id.length).toBeGreaterThan(0);

    const userId = valid.response['userId'];
    expect(userId).toBeDefined();
    expect(userId.length).toBeGreaterThan(0);

    const poll = valid.response['poll'];
    expect(poll['id']).toBe(VALID_POLL_ID);
    expect(poll['title']).toBe('test-title');

    expect(valid.responseCode).toBe(200);
  });
});
