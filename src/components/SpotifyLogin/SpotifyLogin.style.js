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
  margin-left: 1rem;
`;

const LoginButton = styled.button`
  white-space: pre-line;
  margin: 1rem 1rem;
  font-size: 2rem;
  height: 4rem;
  width: 30rem;
  text-align: center;
  border: 0.2rem solid black;
  border-radius: 0.25rem;

  &:hover {
    transition: background-color 0.5s ease;
    background-color: black;
    border-radius: 0.25rem;
    color: #F3F3F3;
  }
`;

export {
  LoginWrapper,
  LoginSpan,
  LoginButton
};
