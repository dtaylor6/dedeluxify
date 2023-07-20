import React, { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { Logout } from '../../services/SpotifyAuthService';
import { ProfileWindowWrapper, StyledButton } from './ProfileWindow.style';

const Signout = (navigate) => {
  Logout();
  navigate('/login');
};

const ProfileWindow = forwardRef((props, ref) => {
  const navigate = useNavigate();

  return(
    <ProfileWindowWrapper ref={ref}>
      <StyledButton onClick={() => Signout(navigate)}>Sign out</StyledButton>
    </ProfileWindowWrapper>
  );
});
ProfileWindow.displayName = 'ProfileWindow';

export default ProfileWindow;
