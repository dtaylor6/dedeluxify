import React, { useState } from 'react';
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

const DeleteData = async (setDisabled) => {
  setDisabled(true);
  const response = confirm('Delete user data and all track preferences?');
  if (response) {
    await DeleteUser();
    setDisabled(false);
  }
};

const ProfileWindow = (props) => {
  // Prevent sign out before user delete service receives a response
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  return(
    <ProfileWindowWrapper>
      <ButtonWrapper>
        <StyledButton disabled={disabled} onClick={() => Signout(navigate)}>
          Sign out
        </StyledButton>
      </ButtonWrapper>
      <ButtonWrapper>
        <StyledButton disabled={disabled} onClick={() => DeleteData(setDisabled)}>
          Delete data
        </StyledButton>
      </ButtonWrapper>
    </ProfileWindowWrapper>
  );
};

export default ProfileWindow;
