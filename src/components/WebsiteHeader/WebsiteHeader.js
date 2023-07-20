import React, { useRef } from 'react';

import WebsiteLogo from '../WebsiteLogo/WebsiteLogo';
import ProfileWindow from '../ProfileWindow/ProfileWindow';
import {
  HeaderWrapper,
  StyledInput,
  ImgWrapper
} from './WebsiteHeader.style';

const DEFAULT_PFP = 'https://i.scdn.co/image/ab6761610000517458efbed422ab46484466822b';

const WebsiteHeader = (props) => {
  const profilePicSrc = props.profilePic ? props.profilePic : DEFAULT_PFP;
  const profileElement = useRef(null);

  const focusElement = () => {
    console.log('FOCUSING');
    profileElement.current.focus();
  };

  return(
    <HeaderWrapper>
      <WebsiteLogo marginTop="1rem" marginBottom="2rem" marginLeft="1rem" />
      <ImgWrapper>
        <StyledInput type="image" src={profilePicSrc} onClick={focusElement} />
        <ProfileWindow ref={profileElement} />
      </ImgWrapper>
    </HeaderWrapper>
  );
};

export default WebsiteHeader;
