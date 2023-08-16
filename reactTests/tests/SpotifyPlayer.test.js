import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import 'jest-styled-components';

import SpotifyPlayer from '../../src/components/SpotifyPlayer/SpotifyPlayer';

import * as authModule from '../../src/services/spotifyAuthService';
let mockedGetPreview;

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('track tests', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockedGetPreview = jest
      .spyOn(authModule, 'GetPreview')
      .mockImplementation(() => true);
  });

  afterEach(() => {
    mockedGetPreview.mockRestore();
  });

  test('pause button changes on click', async () => {
    render(<SpotifyPlayer />);
    const user = userEvent.setup();
    const pauseBtn = screen.getByTitle('Pause');
    await user.click(pauseBtn);
    expect(pauseBtn.title).toBe('Play');
  });
});