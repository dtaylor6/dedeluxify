import styled from 'styled-components';

const ProfileWindowWrapper = styled.div`
  display: block;
  position: absolute;
  z-index: 99;
  right: 4rem;
  top: 7rem;
`;

const StyledButton = styled.button`
  height: 3rem;
  width: 12rem;
  text-align: center;
  border: 0.1rem solid black;
  border-radius: 0.25rem;
  font-size: 1.5rem;
  color: #191414;
  background-color: #F3F3F3;

  &:hover {
    transition: background-color 0.5s ease;
    background-color: #191414;
    border-radius: 0.25rem;
    color: #F3F3F3;
  }
`;

export {
  ProfileWindowWrapper,
  StyledButton
};
