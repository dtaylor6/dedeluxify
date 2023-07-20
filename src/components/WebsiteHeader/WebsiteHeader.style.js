import styled from 'styled-components';

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;

  &:before {
    flex: 1;
    min-width: 0;
    content: '';
  }
`;

const StyledInput = styled.input`
  height: 5rem;
  width: 5rem;
  margin-right: 1rem;
  margin: 2rem 3rem 1rem 1rem;
  border: solid rgba(255, 255, 255, 0);
  border-radius: 10rem;

  &:hover {
    border: solid #1DB954;
  }
`;

const ImgWrapper = styled.div`
  flex: 1;
  text-align: right;
`;

export {
  StyledInput,
  HeaderWrapper,
  ImgWrapper
};
