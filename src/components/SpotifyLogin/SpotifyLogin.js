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
import { SetPreview, GetBackendUrl } from '../../services/spotifyAuthService';
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
  const backendUrl = GetBackendUrl();
  const url = `${backendUrl}/api/spotify/login`;

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
          Spotify integration is currently in <a href="https://developer.spotify.com/documentation/web-api/concepts/quota-modes" target="_blank" rel="noopener noreferrer">development mode</a>
          . Users that wish to log in with their Spotify account must be added to the {'app\'s'} allowlist. If you wish to be added, send your first name and the email associated with your Spotify premium account to <a href='mailto:dedeluxify@gmail.com'>dedeluxify@gmail.com</a>
        </MessageDiv>
      </LoginDiv>
    </LoginWrapper>
  );
};

export default SpotifyLogin;
