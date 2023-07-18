import React from 'react';

import {
  LoginWrapper,
  LoginSpan,
  LoginButton,
  LoginDiv
} from './SpotifyLogin.style';
import WebsiteLogo from '../WebsiteLogo/WebsiteLogo';
import SpotifyLogo from '../../../images/Spotify_logo.svg';

const SpotifyLogin = () => {
  const url = PRODUCTION
    ? 'https://dedeluxify-backend.onrender.com/api/spotify/login'
    : 'http://localhost:3003/api/spotify/login';

  return (
    <LoginWrapper>
      <WebsiteLogo marginTop="2rem" marginBottom="7rem" />
      <LoginDiv>
        <h1>Log in</h1>
        <LoginButton onClick={() => window.location.href=url}>
          <SpotifyLogo />
          <LoginSpan>Log in with Spotify</LoginSpan>
        </LoginButton>
        <br/>
        <LoginButton onClick={() => console.log('Preview mode')}>
          <LoginSpan>Preview without logging in</LoginSpan>
        </LoginButton>
      </LoginDiv>
    </LoginWrapper>
  );
};

export default SpotifyLogin;
