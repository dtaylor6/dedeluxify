import axios from 'axios';

import { GetAuthHeader, GetPreview } from './spotifyAuthService';
import {
  GetPreferencePreview,
  SetPreferencePreview,
  DeletePreferencePreview
} from './previewService';

const url = PRODUCTION
  ? 'https://dedeluxify-backend.onrender.com'
  : 'http://localhost:3003';

const FetchTrackPreferences = (uri) => {
  // Bypass backend and get track preferences in local storage
  if (GetPreview()) {
    return GetPreferencePreview(uri);
  }

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
  // Bypass backend and set track preferences in local storage
  if (GetPreview()) {
    return SetPreferencePreview(uri, preferences);
  }

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
  // Bypass backend and delete preferences in local storage
  if (GetPreview()) {
    return DeletePreferencePreview(uri);
  }

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