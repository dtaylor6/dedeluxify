import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import 'jest-styled-components';

import WebsiteHeader from '../../src/components/WebsiteHeader/WebsiteHeader';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('WebsiteHeader tests', () => {
  beforeEach(() => {
    mockedUsedNavigate.mockReset();
  });

  test('profile button turns green when clicked', async () => {
    const user = userEvent.setup();
    render(<WebsiteHeader  profilePic="" />);
    const profileBtn = screen.getByRole('button');

    // Border should be changed to Spotify green
    await user.click(profileBtn);
    expect(profileBtn).toHaveStyleRule('border', 'solid #1DB954');
  });
});

