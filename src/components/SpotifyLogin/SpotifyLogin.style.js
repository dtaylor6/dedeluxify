import styled from 'styled-components';

const LoginWrapper = styled.div`
  left: 0;
  width: 100%;
  height: auto;
  overflow: clip;
  font-family: Roboto, Arial, sans-serif;
  background-color: #F3F3F3;
  text-align: center;
  display: block;
  overflow: auto;
`;

const LoginDiv = styled.div`
  width: 100%;
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
  padding: 0.5rem;
  background-color: white;

  &:hover {
    transition: background-color 0.5s ease;
    background-color: #191414;
    border-radius: 0.25rem;
    color: #F3F3F3;
  }
`;

const MessageDiv = styled.div`
  width: 29rem;
  border: thin solid red;
  border-radius: 0.25rem;
  background-color: white;
  text-align: left;
  color: red;
  margin: auto;
  margin-top: 3rem;
  padding: 0.5rem;

  & > a {
    color: red;
  }
`;

const IconWrapper = styled.div`
  text-align: center;
`;

export {
  LoginWrapper,
  LoginDiv,
  LoginSpan,
  LoginButton,
  MessageDiv,
  IconWrapper
};
