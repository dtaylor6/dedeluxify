const SPOTIFY_TOKEN_NAME = 'spotify-auth-token';

const SetToken = token => {
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

export {
  SetToken,
  GetToken,
  GetAuthHeader,
  ClearToken
};
