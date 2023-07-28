import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Logout } from '../../services/spotifyAuthService';

import {
  LoginWrapper,
  LoginSpan,
  LoginButton,
  LoginDiv
} from './SpotifyLogin.style';
import { SetPreview } from '../../services/spotifyAuthService';
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
        <div>
          The Spotify integration is currently in <a href="https://developer.spotify.com/documentation/web-api/concepts/quota-modes" target="_blank" rel="noopener noreferrer">development mode</a>
          . Each user that wishes to log in with their Spotify account must be added to the {'app\'s'} allowlist. If you wish to be added, send your first name and the email associated with your Spotify premium account to <a href='mailto:dedeluxify@gmail.com'>dedeluxify@gmail.com</a>
        </div>
      </LoginDiv>
    </LoginWrapper>
  );
};

export default SpotifyLogin;
