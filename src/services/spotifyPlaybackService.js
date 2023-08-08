import axios from 'axios';

import { GetAuthHeader, GetPreview, GetBackendUrl } from './spotifyAuthService';
import {
  SearchPreview,
  PlayPreview,
  QueuePreview
} from './previewService';


const url = GetBackendUrl();

const TransferPlayback = (device_id) => {
  return (
    axios
      .put(
        'https://api.spotify.com/v1/me/player',
        {
          device_ids:[device_id],
          play: true
        },
        {
          headers: GetAuthHeader()
        }
      )
  );
};

const SearchAlbums = (search) => {
  if (search === '') {
    return undefined;
  }

  // Bypass backend and use preview search in preview mode
  if (GetPreview()) {
    return SearchPreview();
  }

  return (
    axios
      .get(
        `${url}/api/spotify/search`, {
          params: {
            q: search
          },
          headers: GetAuthHeader()
        }
      )
      .then(
        response => response.data
      )
  );
};

const PlayAlbum = (uri) => {
  // Bypass backend and use preview playback in preview mode
  if (GetPreview()) {
    return PlayPreview(uri);
  }

  return (
    axios
      .get(
        `${url}/api/spotify/play/`, {
          params: {
            uri
          },
          headers: GetAuthHeader()
        }
      )
  );
};

const QueueAlbum = (uri) => {
  // Bypass backend and use preview playback in preview mode
  if (GetPreview()) {
    return QueuePreview(uri);
  }

  return (
    axios
      .get(
        `${url}/api/spotify/queue/`, {
          params: {
            uri
          },
          headers: GetAuthHeader()
        }
      )
  );
};

export {
  TransferPlayback,
  SearchAlbums,
  PlayAlbum,
  QueueAlbum
};
