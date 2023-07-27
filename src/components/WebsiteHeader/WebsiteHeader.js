import React, { useEffect, useState, useRef } from 'react';

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
  const profileRef = useRef(null);
  const btnRef = useRef(null);

  // Hide search results when clicking outside of search bar or search results box
  const [showWindow, setShowWindow] = useState(false);
  useEffect(() => {
    document.addEventListener('click', (e) => {
      if (!e.target) {
        setShowWindow(false);
      }
      else if (
        btnRef.current
        && profileRef.current
        && !btnRef.current.contains(e.target)
        && !profileRef.current.contains(e.target)
      ) {
        setShowWindow(false);
      }
    });
  }, []);

  const toggleWindow = (event) => {
    event.preventDefault();
    setShowWindow(!showWindow);
  };

  return(
    <HeaderWrapper>
      <WebsiteLogo marginTop="1rem" marginBottom="2rem" marginLeft="1rem" />
      <ImgWrapper ref={profileRef}>
        <StyledInput
          type="image"
          src={profilePicSrc}
          showWindow={showWindow}
          onClick={toggleWindow}
          ref={btnRef}
        />
        {showWindow && <ProfileWindow />}
      </ImgWrapper>
    </HeaderWrapper>
  );
};

export default WebsiteHeader;
