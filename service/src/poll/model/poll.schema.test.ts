import { describe, expect, test } from '@jest/globals';
import { createSchema, joinSchema, voteSchema } from './poll.schema';

describe('poll schemas', () => {
  const VALID_UUID = '33e6c756-7890-4a50-aed2-354405914231';

  describe('createSchema', () => {
    test('should fail without title', () => {
      const { error } = createSchema.validate({ });
      expect(error).toBeDefined();
    });

    test('should fail with invalid title', () => {
      const { error } = createSchema.validate({ title: '' });
      expect(error).toBeDefined();

      const { error: error2 } = createSchema.validate({ title: 5 });
      expect(error2).toBeDefined();
    });

    test('should succeed with valid title', () => {
      const { error } = createSchema.validate({ title: 'my poll' });
      expect(error).toBeUndefined();
    });
  });

  describe('joinSchema', () => {
    test('should fail without pollId', () => {
      const { error } = joinSchema.validate({ name: 'user' });
      expect(error).toBeDefined();
    });

    test('should fail without name', () => {
      const { error } = joinSchema.validate({ pollId: VALID_UUID });
      expect(error).toBeDefined();
    });

    test('should fail with invalid pollId', () => {
      const { error } = joinSchema.validate({ pollId: 'not-a-uuid', name: 'user' });
      expect(error).toBeDefined();
    });

    test('should succeed with valid input', () => {
      const { error } = joinSchema.validate({ pollId: VALID_UUID, name: 'user' });
      expect(error).toBeUndefined();
    });
  });

  describe('voteSchema', () => {
    const VALID_VOTE_BODY = {
      pollId: VALID_UUID,
      userId: VALID_UUID,
      vote: '0',
    };

    test('should fail without pollId', () => {
      const { error } = voteSchema.validate({ ...VALID_VOTE_BODY, pollId: undefined });
      expect(error).toBeDefined();
    });

    test('should fail without userId', () => {
      const { error } = voteSchema.validate({ ...VALID_VOTE_BODY, userId: undefined });
      expect(error).toBeDefined();
    });

    test('should fail without vote', () => {
      const { error } = voteSchema.validate({ ...VALID_VOTE_BODY, vote: undefined });
      expect(error).toBeDefined();
    });
    
    test('should succeed with valid input', () => {
      const { error } = voteSchema.validate(VALID_VOTE_BODY);
      expect(error).toBeUndefined();
    });
  });
});
