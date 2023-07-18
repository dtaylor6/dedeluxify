import React from 'react';

import { LogoDiv, LogoText } from './WebsiteLogo.style';
import DedeluxifyLogo from '../../../images/dedeluxify-logo.svg';

const WebsiteLogo = (props) => {
  return (
    <LogoDiv marginTop={props.marginTop} marginBottom={props.marginBottom}>
      <DedeluxifyLogo height="5rem" width="3rem" />
      <LogoText>edeluxify</LogoText>
    </LogoDiv>
  );
};

export default WebsiteLogo;
