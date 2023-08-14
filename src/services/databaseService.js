import axios from 'axios';

import { GetAuthHeader, GetPreview, GetBackendUrl } from './spotifyAuthService';
import {
  GetPreferencePreview,
  SetPreferencePreview,
  DeletePreferencePreview,
  DeleteAllPreferencePreview
} from './previewService';

const url = GetBackendUrl();

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

// Deletes user information and all track preferences in the database
const DeleteUser = () => {
  // Bypass backend and delete all preferences in local storage
  if (GetPreview()) {
    return DeleteAllPreferencePreview();
  }

  return (
    axios
      .delete(
        `${url}/api/trackPreferences/user`, {
          params: {},
          headers: GetAuthHeader()
        }
      )
  );
};

export {
  FetchTrackPreferences,
  PostTrackPreferences,
  DeleteTrackPreferences,
  DeleteUser
};
