import styled from 'styled-components';

const ProfileWindowWrapper = styled.div`
  display: block;
  position: absolute;
  z-index: 99;
  right: 4rem;
  top: 7rem;
  border: 0.1rem solid #191414;
  border-radius: 0.25rem;
  padding: 0.25rem 0;
  background-color: white;
`;

const ButtonWrapper = styled.div`
  color: #191414;
  background-color: white;
  padding: 0.25rem;

  &:hover {
    transition: background-color 0.5s ease;
    background-color: #191414;
    color: #F3F3F3;
  }

  &:hover > button {
    transition: background-color 0.5s ease;
    background-color: #191414;
    color: #F3F3F3;
  }
`;

const StyledButton = styled.button`
  height: 3rem;
  width: 12rem;
  text-align: center;
  border: none;
  font-size: 1.5rem;
  color: #191414;
  background-color: white;
`;

export {
  ProfileWindowWrapper,
  ButtonWrapper,
  StyledButton
};
