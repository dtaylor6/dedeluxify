import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Logout } from '../../services/SpotifyAuthService';
import { ProfileWindowWrapper, StyledButton } from './ProfileWindow.style';

const Signout = (navigate) => {
  Logout();
  navigate('/login');
};

const ProfileWindow = (props) => {
  const navigate = useNavigate();

  return(
    <ProfileWindowWrapper >
      <StyledButton onClick={() => Signout(navigate)}>Sign out</StyledButton>
    </ProfileWindowWrapper>
  );
};

export default ProfileWindow;
