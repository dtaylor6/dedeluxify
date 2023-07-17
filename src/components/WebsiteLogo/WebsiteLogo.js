import React from 'react';

import { LogoDiv, LogoText } from './WebsiteLogo.style';
import DedeluxifyLogo from '../../../images/dedeluxify-logo.svg';

const WebsiteLogo = (props) => {
  return (
    <LogoDiv>
      <DedeluxifyLogo height={props.height} width={props.width} margin-top={props.margin-top}/>
      <LogoText>edeluxify</LogoText>
    </LogoDiv>
  );
};

export default WebsiteLogo;
