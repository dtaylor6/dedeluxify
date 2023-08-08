import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Logout } from '../../services/spotifyAuthService';

import {
  LoginWrapper,
  LoginSpan,
  LoginButton,
  LoginDiv,
  MessageDiv,
  IconWrapper
} from './SpotifyLogin.style';
import { SetPreview } from '../../services/spotifyAuthService';
import WebsiteLogo from '../WebsiteLogo/WebsiteLogo';
import SpotifyLogo from '../../../images/Spotify_logo.svg';
import CautionIcon from '../../../images/caution.svg';

const spotifyLogin = (url) => {
  window.location.href=url;
};

const previewLogin = (navigate) => {
  SetPreview();
  navigate('/');
};

const SpotifyLogin = () => {
  Logout();
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
        <MessageDiv>
          <IconWrapper><CautionIcon height="2rem" width="2rem" /></IconWrapper>
          This is the test website for <a href="https://dedeluxify.com/" target="_blank" rel="noopener noreferrer">dedeluxify.</a>
        </MessageDiv>
      </LoginDiv>
    </LoginWrapper>
  );
};

export default SpotifyLogin;
