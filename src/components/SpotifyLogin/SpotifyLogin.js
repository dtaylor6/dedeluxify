import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  LoginWrapper,
  LoginSpan,
  LoginButton,
  LoginDiv
} from './SpotifyLogin.style';
import { SetPreview } from '../../services/SpotifyAuthService';
import WebsiteLogo from '../WebsiteLogo/WebsiteLogo';
import SpotifyLogo from '../../../images/Spotify_logo.svg';

const spotifyLogin = (url) => {
  window.location.href=url;
};

const previewLogin = (navigate) => {
  SetPreview();
  navigate('/');
};

const SpotifyLogin = () => {
  const navigate = useNavigate();
  const url = PRODUCTION
    ? 'https://dedeluxify-backend.onrender.com/api/spotify/login'
    : 'http://localhost:3003/api/spotify/login';

  return (
    <LoginWrapper>
      <WebsiteLogo marginTop="2rem" marginBottom="7rem" />
      <LoginDiv>
        <h1>Log in</h1>
        <LoginButton onClick={() => spotifyLogin(url)}>
          <SpotifyLogo />
          <LoginSpan>Log in with Spotify</LoginSpan>
        </LoginButton>
        <br/>
        <LoginButton onClick={() => previewLogin(navigate)}>
          <LoginSpan>Preview without logging in</LoginSpan>
        </LoginButton>
      </LoginDiv>
    </LoginWrapper>
  );
};

export default SpotifyLogin;
