import React from 'react';
import { render, screen } from '@testing-library/react';
import { IVote } from '../api/poll.interface';
import { UserVotes } from './UserVotes';

// todo: rewrite this after styling
test('renders users and votes', () => {
  const MOCK_VOTES: IVote[] = [
    { user: { id: '1', name: 'bob' }, vote: '1' },
    { user: { id: '2', name: 'alice' }, vote: '2' },
  ];

  render(<UserVotes votes={MOCK_VOTES} />);

  const bob = screen.getByText(/bob (1)/i);
  expect(bob).toBeInTheDocument();
});
