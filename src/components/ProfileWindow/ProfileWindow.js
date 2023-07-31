import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Logout } from '../../services/spotifyAuthService';
import { DeleteUser } from '../../services/databaseService';
import {
  ProfileWindowWrapper,
  ButtonWrapper,
  StyledButton
} from './ProfileWindow.style';

const Signout = (navigate) => {
  Logout();
  navigate('/login');
  // Force web browser to kill player on signout
  window.location.reload();
};

const ProfileWindow = (props) => {
  const navigate = useNavigate();

  return(
    <ProfileWindowWrapper >
      <ButtonWrapper>
        <StyledButton onClick={() => Signout(navigate)}>Sign out</StyledButton>
      </ButtonWrapper>
      <ButtonWrapper>
        <StyledButton onClick={() => DeleteUser()}>Delete Data</StyledButton>
      </ButtonWrapper>
    </ProfileWindowWrapper>
  );
};

export default ProfileWindow;
