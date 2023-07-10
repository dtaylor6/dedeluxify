import axios from 'axios';

import { GetAuthHeader } from './SpotifyAuthService';

const url = PRODUCTION
  ? 'https://dedeluxify-backend.onrender.com'
  : 'http://localhost:3003';

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
