import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import 'jest-styled-components';

import * as playbackModule from '../../src/services/spotifyPlaybackService';
import * as authModule from '../../src/services/spotifyAuthService';
import previewAlbums from '../../src/services/previewAlbums';
import AlbumWindow from '../../src/components/AlbumWindow/AlbumWindow';

const FAKE_ALBUM = previewAlbums[0];

let mockedSetAlbum;
let mockedPlayAlbum;
let mockedQueueAlbum;

describe('album window tests', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    mockedSetAlbum = jest.fn();
    mockedSetAlbum.mockImplementation((album) => album);

    mockedPlayAlbum = jest
      .spyOn(playbackModule, 'PlayAlbum')
      .mockImplementation((albumUri) => albumUri);

    mockedQueueAlbum = jest
      .spyOn(playbackModule, 'QueueAlbum')
      .mockImplementation((albumUri) => albumUri);
  });

  afterEach(() => {
    mockedSetAlbum.mockRestore();
    mockedPlayAlbum.mockRestore();
    mockedQueueAlbum.mockRestore();
  });

  test('play album', async () => {
    render(<AlbumWindow album={FAKE_ALBUM} setAlbum={mockedSetAlbum} />);
    const user = userEvent.setup();
    const playBtn = screen.getByText('Play');
    await user.click(playBtn);
    expect(mockedSetAlbum).toHaveBeenCalledTimes(1);
    expect(mockedPlayAlbum).toHaveBeenCalledTimes(1);
    expect(mockedQueueAlbum).toHaveBeenCalledTimes(0);
  });

  test('queue album', async () => {
    render(<AlbumWindow album={FAKE_ALBUM} setAlbum={mockedSetAlbum} />);
    const user = userEvent.setup();
    const queueBtn = screen.getByText('Queue');
    await user.click(queueBtn);
    expect(mockedSetAlbum).toHaveBeenCalledTimes(1);
    expect(mockedPlayAlbum).toHaveBeenCalledTimes(0);
    expect(mockedQueueAlbum).toHaveBeenCalledTimes(1);
  });
});

let mockedGetPreview;

describe('album preference form tests', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockedGetPreview = jest
      .spyOn(authModule, 'GetPreview')
      .mockImplementation(() => true);

    window.localStorage.clear();
  });

  afterEach(() => {
    mockedGetPreview.mockRestore();
  });

  test('click set tracks', async () => {
    render(<AlbumWindow album={FAKE_ALBUM} setAlbum={mockedSetAlbum} />);
    expect(screen.queryByText('Track 1')).toBeFalsy();

    const user = userEvent.setup();
    const fetchBtn = screen.getByText('Set Tracks');
    await user.click(fetchBtn);
    expect(screen.queryByText('Track 1')).toBeTruthy();
  });

  test('click set tracks twice', async () => {
    render(<AlbumWindow album={FAKE_ALBUM} setAlbum={mockedSetAlbum} />);
    expect(screen.queryByText('Track 1')).toBeFalsy();

    const user = userEvent.setup();
    const fetchBtn = screen.getByText('Set Tracks');
    await user.click(fetchBtn);
    expect(screen.queryByText('Track 1')).toBeTruthy();

    // Click set tracks button again to make form disappear
    await user.click(fetchBtn);
    expect(screen.queryByText('Track 1')).toBeFalsy();
  });

  test('track preferences are all set true by default', async () => {
    render(<AlbumWindow album={FAKE_ALBUM} setAlbum={mockedSetAlbum} />);
    expect(screen.queryByText('Track 1')).toBeFalsy();

    const user = userEvent.setup();
    const fetchBtn = screen.getByText('Set Tracks');
    await user.click(fetchBtn);
    expect(screen.queryByText('Track 1')).toBeTruthy();

    const checkboxes = screen.queryAllByRole('checkbox');
    checkboxes.forEach((checkbox) => expect(checkbox).toBeChecked());
  });

  test('set track preference', async () => {
    render(<AlbumWindow album={FAKE_ALBUM} setAlbum={mockedSetAlbum} />);
    expect(screen.queryByText('Track 1')).toBeFalsy();

    const user = userEvent.setup();
    const fetchBtn = screen.getByText('Set Tracks');
    await user.click(fetchBtn);

    // Uncheck first track
    const trackCheckbox = screen.queryAllByRole('checkbox')[0];
    expect(trackCheckbox).toBeChecked();
    await trackCheckbox.click();
    expect(trackCheckbox).not.toBeChecked();
    const saveBtn = screen.getByText('Save Preferences');
    await user.click(saveBtn);

    // Expect first track to still be unchecked after fetching again
    await user.click(fetchBtn);
    const trackCheckboxFresh = screen.queryAllByRole('checkbox')[0];
    expect(trackCheckboxFresh).not.toBeChecked();
  });

  test('delete track preferences', async () => {
    render(<AlbumWindow album={FAKE_ALBUM} setAlbum={mockedSetAlbum} />);
    expect(screen.queryByText('Track 1')).toBeFalsy();

    const user = userEvent.setup();
    const fetchBtn = screen.getByText('Set Tracks');
    await user.click(fetchBtn);

    // Delete preferences and expect all track to still be checked
    const deleteBtn = screen.getByText('Delete Preferences');
    await user.click(deleteBtn);
    await user.click(fetchBtn);
    const checkboxes = screen.queryAllByRole('checkbox');
    checkboxes.forEach((checkbox) => expect(checkbox).toBeChecked());
  });

  test('delete track preferences after setting', async () => {
    render(<AlbumWindow album={FAKE_ALBUM} setAlbum={mockedSetAlbum} />);
    expect(screen.queryByText('Track 1')).toBeFalsy();

    const user = userEvent.setup();
    const fetchBtn = screen.getByText('Set Tracks');
    await user.click(fetchBtn);

    // Uncheck first track
    const trackCheckbox = screen.queryAllByRole('checkbox')[0];
    expect(trackCheckbox).toBeChecked();
    await trackCheckbox.click();
    expect(trackCheckbox).not.toBeChecked();
    const saveBtn = screen.getByText('Save Preferences');
    await user.click(saveBtn);

    // Expect first track to still be unchecked after fetching again
    await user.click(fetchBtn);
    const trackCheckboxFresh = screen.queryAllByRole('checkbox')[0];
    expect(trackCheckboxFresh).not.toBeChecked();

    // Delete preferences and expect first track to be checked again
    const deleteBtn = screen.getByText('Delete Preferences');
    await user.click(deleteBtn);
    await user.click(fetchBtn);
    const checkboxes = screen.queryAllByRole('checkbox');
    checkboxes.forEach((checkbox) => expect(checkbox).toBeChecked());
  });
});
