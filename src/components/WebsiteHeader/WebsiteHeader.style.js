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

const StyledImg = styled.img`
  height: 5rem;
  width: 5rem;
  margin-right: 1rem;
  margin: 1rem 3rem 1rem 1rem;
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
  StyledImg,
  HeaderWrapper,
  ImgWrapper
};
