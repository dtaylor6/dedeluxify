import React from 'react';
import { useSearchParams, Navigate } from 'react-router-dom';

import SpotifyLogin from '../SpotifyLogin/SpotifyLogin';
import { SetToken, SetProfilePic } from '../../services/SpotifyAuthService';

const LoginRedirect = () => {
  const [searchParams] = useSearchParams();
  const access_token = searchParams.get('access_token');
  const profile_pic = searchParams.get('profile_pic');

  // Spotify auth token passed in from url params
  if (access_token) {
    SetToken(access_token);

    if (profile_pic) {
      SetProfilePic(profile_pic);
    }

    // Save new token and navigate back to home page
    return (
      <>
        <Navigate to="/" replace={false}/>
      </>
    );
  }

  return (
    <>
      <SpotifyLogin />
    </>
  );
};

export default LoginRedirect;
