import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { JoinPoll } from './JoinPoll';

describe('JoinPoll', () => {
  test('should join with given name when clicking Join', () => {
    const INPUT_NAME = 'kirby';

    let name = '';
    const joinWithName = (n: string) => name = n;

    render(<JoinPoll joinWithName={joinWithName} />);

    const input = screen.getByTestId('join-poll-name');
    fireEvent.change(input, { target: { value: INPUT_NAME } });

    screen.getByText('Join').click();
    expect(name).toBe(INPUT_NAME);
  });
});