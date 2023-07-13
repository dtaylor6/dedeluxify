import React from 'react';

import { LoginWrapper, LoginSpan, LoginButton } from './SpotifyLogin.style';
import SpotifyLogo from '../../../images/Spotify_logo.svg';

const SpotifyLogin = () => {
  const url = PRODUCTION
    ? 'https://dedeluxify-backend.onrender.com/api/spotify/login'
    : 'http://localhost:3003/api/spotify/login';

  return (
    <LoginWrapper>
      <h1>Log in</h1>
      <LoginButton onClick={() => window.location.href=url}>
        <SpotifyLogo />
        <LoginSpan>Log in with Spotify</LoginSpan>
      </LoginButton>
      <br/>
      <LoginButton onClick={() => console.log('Preview mode')}>
        <LoginSpan>Preview without logging in</LoginSpan>
      </LoginButton>
    </LoginWrapper>
  );
};

export default SpotifyLogin;
