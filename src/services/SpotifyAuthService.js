const SPOTIFY_TOKEN_NAME = 'spotify-auth-token';
const PROFILE_PIC_NAME = 'profile-picture-url';

const SetToken = (token) => {
  window.localStorage.setItem(SPOTIFY_TOKEN_NAME, token);
};

const GetToken = () => {
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

const Logout = () => {
  ClearToken();
  ClearProfilePic();
};

export {
  SetToken,
  GetToken,
  GetAuthHeader,
  ClearToken,
  SetProfilePic,
  GetProfilePic,
  ClearProfilePic,
  Logout
};
