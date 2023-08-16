import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import 'jest-styled-components';

import * as playbackModule from '../../src/services/spotifyPlaybackService';
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
