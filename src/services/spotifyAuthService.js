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
  const d = new Date();
  d.setTime(d.getTime() + (60*60*1000)); // Expires in 1 hour
  let expires = 'expires='+ d.toUTCString();
  document.cookie = SPOTIFY_TOKEN_NAME + '=' + token + ';' + expires + ';path=/';
};

const GetToken = () => {
  if (GetPreview()) {
    return 'preview';
  }

  let name = SPOTIFY_TOKEN_NAME + '=';
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }

  // Token cookie was not found
  return '';
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
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
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
