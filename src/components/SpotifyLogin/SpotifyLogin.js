import React from 'react';

import { LoginWrapper, LoginSpan, LoginButton } from './SpotifyLogin.style';
import SpotifyLogo from '../../../images/Spotify_logo.svg';

const SpotifyLogin = () => {
  const url = PRODUCTION
    ? 'https://dedeluxify-backend.onrender.com/api/spotify/login'
    : 'http://localhost:3003/api/spotify/login';

  return (
    <LoginWrapper>
      <LoginButton onClick={() => window.location.href=url}>
        <SpotifyLogo />
        <LoginSpan>Log in with Spotify</LoginSpan>
      </LoginButton>
    </LoginWrapper>
  );
};

export default SpotifyLogin;
