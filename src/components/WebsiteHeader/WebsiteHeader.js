import React from 'react';

import WebsiteLogo from '../WebsiteLogo/WebsiteLogo';
import { HeaderWrapper, StyledImg } from './WebsiteHeader.style';

const DEFAULT_PFP = 'https://i.scdn.co/image/ab6761610000517458efbed422ab46484466822b';

const WebsiteHeader = (props) => {
  const profilePicSrc = props.profilePic ? props.profilePic : DEFAULT_PFP;

  return(
    <HeaderWrapper>
      <WebsiteLogo marginTop="1rem" marginBottom="2rem" marginLeft="1rem" />
      <StyledImg src={profilePicSrc} />
    </HeaderWrapper>
  );
};

export default WebsiteHeader;