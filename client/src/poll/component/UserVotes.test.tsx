import React from 'react';
import { render, screen } from '@testing-library/react';
import { IVote } from '../api/poll.interface';
import { UserVotes } from './UserVotes';

describe('UserVotes', () => {

  test('renders users and votes', () => {
    const MOCK_VOTES: IVote[] = [
      { user: { id: '1', name: 'bob' }, vote: '1' },
      { user: { id: '2', name: 'alice' }, vote: '2' },
    ];
    
    render(<UserVotes votes={MOCK_VOTES} />);
    
    const bob = screen.getByText(/bob/i);
    expect(bob).toBeInTheDocument();
    
    const bobVote = screen.getByText(/1/i);
    expect(bobVote).toBeInTheDocument();
    
    const alice = screen.getByText(/alice/i);
    expect(alice).toBeInTheDocument();
    
    const aliceVote = screen.getByText(/2/i);
    expect(aliceVote).toBeInTheDocument();
  });
});
