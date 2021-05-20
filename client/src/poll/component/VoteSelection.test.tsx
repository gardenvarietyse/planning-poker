import React from 'react';
import { render, screen } from '@testing-library/react';
import { VoteSelection } from './VoteSelection';

describe('VoteSelection', () => {
  test('should trigger castVote when clicking a button', () => {
    let vote = '';
    const castVote = (v: string) => vote = v;

    render(<VoteSelection votes={['a', 'b', 'c']} castVote={castVote} />);

    screen.getByText('b').click();
    expect(vote).toBe('b');

    screen.getByText('c').click();
    expect(vote).toBe('c');
  });
});