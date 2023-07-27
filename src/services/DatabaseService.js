import axios from 'axios';

import { GetAuthHeader } from './spotifyAuthService';

const url = PRODUCTION
  ? 'https://dedeluxify-backend.onrender.com'
  : 'http://localhost:3003';

const FetchTrackPreferences = (uri) => {
  return (
    axios
      .get(
        `${url}/api/trackPreferences/`, {
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
        `${url}/api/trackPreferences/`,
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

const DeleteTrackPreferences = (uri) => {
  return (
    axios
      .delete(
        `${url}/api/trackPreferences/`, {
          params: {
            uri
          },
          headers: GetAuthHeader()
        }
      )
  );
};

export {
  FetchTrackPreferences,
  PostTrackPreferences,
  DeleteTrackPreferences
};
