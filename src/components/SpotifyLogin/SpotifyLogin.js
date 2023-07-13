import React from 'react';

import {
  LoginWrapper,
  LoginSpan,
  LoginButton,
  LoginDiv,
  LogoDiv,
  LogoText
} from './SpotifyLogin.style';
import DedeluxifyLogo from '../../../images/dedeluxify-logo.svg';
import SpotifyLogo from '../../../images/Spotify_logo.svg';

const SpotifyLogin = () => {
  const url = PRODUCTION
    ? 'https://dedeluxify-backend.onrender.com/api/spotify/login'
    : 'http://localhost:3003/api/spotify/login';

  return (
    <LoginWrapper>
      <WebsiteName />
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

const WebsiteName = () => {
  return (
    <LogoDiv>
      <DedeluxifyLogo height="5rem" width="3rem" margin-top="3rem"/>
      <LogoText>edeluxify</LogoText>
    </LogoDiv>
  );
};

export default SpotifyLogin;
