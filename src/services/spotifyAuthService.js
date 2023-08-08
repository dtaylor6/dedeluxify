import { DeleteAllPreferencePreview } from './previewService';

const SPOTIFY_TOKEN_NAME = 'spotify-auth-token';
const PROFILE_PIC_NAME = 'profile-picture-url';
const PREVIEW_NAME = 'preview';

const GetBackendUrl = () => {
  const url = __PRODUCTION__
    ? 'https://dedeluxify-backend.onrender.com'
    : 'https://test-dedeluxify-backend.onrender.com';

  const localUrl = 'http://localhost:3003';

  return __LOCAL__ ? localUrl : url;
};

const SetToken = (token) => {
  window.localStorage.setItem(SPOTIFY_TOKEN_NAME, token);
};

const GetToken = () => {
  if (GetPreview()) {
    return 'preview';
  }

  return window.localStorage.getItem(SPOTIFY_TOKEN_NAME);
};

const GetAuthHeader = () => {
  const token = GetToken();
  return (
    {
      'Authorization': `Bearer ${token}`
    }
  );
};

const ClearToken = () => {
  window.localStorage.removeItem(SPOTIFY_TOKEN_NAME);
};

const SetProfilePic = (url) => {
  window.localStorage.setItem(PROFILE_PIC_NAME, url);
};

const GetProfilePic = () => {
  return window.localStorage.getItem(PROFILE_PIC_NAME);
};

const ClearProfilePic = () => {
  window.localStorage.removeItem(PROFILE_PIC_NAME);
};

const SetPreview = () => {
  window.localStorage.setItem(PREVIEW_NAME, JSON.stringify(true));
};

const GetPreview = () => {
  const preview = JSON.parse(window.localStorage.getItem(PREVIEW_NAME));
  return preview ? true : false;
};

const ClearPreview = () => {
  window.localStorage.removeItem(PREVIEW_NAME);
};

const Logout = () => {
  ClearToken();
  ClearProfilePic();

  ClearPreview();
  DeleteAllPreferencePreview();
};

export {
  GetBackendUrl,
  SetToken,
  GetToken,
  GetAuthHeader,
  ClearToken,
  SetProfilePic,
  GetProfilePic,
  ClearProfilePic,
  Logout,
  SetPreview,
  GetPreview
};
