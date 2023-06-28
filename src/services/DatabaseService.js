import axios from 'axios';

import { GetAuthHeader } from './SpotifyAuthService';

const FetchTrackPreferences = (uri) => {
  return (
    axios
      .get(
        'http://localhost:3000/api/trackPreferences/', {
          params: {
            uri
          },
          headers: GetAuthHeader()
        }
      )
  );
};

const PostTrackPreferences = (uri, numTracks, preferences) => {
  return(
    axios
      .post(
        'http://localhost:3000/api/trackPreferences/',
        {
          uri,
          numTracks,
          preferences
        },
        {
          headers: GetAuthHeader()
        }
      )
  );
};

export {
  FetchTrackPreferences,
  PostTrackPreferences
};
