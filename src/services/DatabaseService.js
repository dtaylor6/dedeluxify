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

const PostTrackPreferences = (uris) => {
  return(
    axios
      .post(
        'http://localhost:3000/api/trackPreferences/',
        {
          uris
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
