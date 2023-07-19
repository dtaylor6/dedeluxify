import styled from 'styled-components';

const LogoDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: ${props => props.marginTop};
  margin-bottom: ${props => props.marginBottom};
`;

const LogoText = styled.span`
  text-align: left;
  font-size: 2.5rem;
  margin-top: 2rem;
`;

export {
  LogoDiv,
  LogoText
};
