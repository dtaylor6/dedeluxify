import styled from 'styled-components';

const LoginWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 15%;
  width: 100%;
  overflow: clip;
  min-height: 100vh;
  font-family: Roboto, Arial, sans-serif;
  background-color: #F3F3F3;
  text-align: center;
`;

const LoginSpan = styled.span`
  margin-left: 0.5rem;
`;

const LoginButton = styled.button`

`;

export {
  LoginWrapper,
  LoginSpan,
  LoginButton
};
