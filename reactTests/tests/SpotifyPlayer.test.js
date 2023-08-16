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

describe('button tests', () => {
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

  test('changes back to pause on two clicks', async () => {
    render(<SpotifyPlayer />);
    const user = userEvent.setup();
    const pauseBtn = screen.getByTitle('Pause');
    await user.click(pauseBtn);
    expect(pauseBtn.title).toBe('Play');
    await user.click(pauseBtn);
    expect(pauseBtn.title).toBe('Pause');
  });

  test('skip to next track', async () => {
    render(<SpotifyPlayer />);
    const user = userEvent.setup();
    const nextBtn = screen.getByTitle('Next');
    expect(screen.getByText('Track 1'));
    await user.click(nextBtn);
    expect(screen.getByText('Track 2'));
  });

  test('go to previous track', async () => {
    render(<SpotifyPlayer />);
    const user = userEvent.setup();
    const nextBtn = screen.getByTitle('Next');
    expect(screen.getByText('Track 1'));
    await user.click(nextBtn);
    expect(screen.getByText('Track 2'));

    const prevBtn = screen.getByTitle('Previous');
    expect(screen.getByText('Track 2'));
    await user.click(prevBtn);
    expect(screen.getByText('Track 1'));
  });

  test('mute button changes on click', async () => {
    render(<SpotifyPlayer />);
    const user = userEvent.setup();
    const muteBtn = screen.getByTitle('Mute');
    await user.click(muteBtn);
    expect(muteBtn.title).toBe('Unmute');
  });

  test('volume slider changes on mute', async () => {
    render(<SpotifyPlayer />);
    const user = userEvent.setup();
    const muteBtn = screen.getByTitle('Mute');
    const slider = screen.getByTitle('Volume');
    expect(slider.value).toBe('50');

    // Mute volume
    await user.click(muteBtn);
    expect(muteBtn.title).toBe('Unmute');
    expect(slider.value).toBe('0');
  });

  test('volume slider changes back on unmute', async () => {
    render(<SpotifyPlayer />);
    const user = userEvent.setup();
    const muteBtn = screen.getByTitle('Mute');
    const slider = screen.getByTitle('Volume');
    expect(slider.value).toBe('50');

    // Mute
    await user.click(muteBtn);
    expect(muteBtn.title).toBe('Unmute');
    expect(slider.value).toBe('0');

    // Unmute
    await user.click(muteBtn);
    expect(muteBtn.title).toBe('Mute');
    expect(slider.value).toBe('50');
  });
});