import styled from 'styled-components';

const StyledAlbumWrapper = styled.div`
  position: absolute;
  z-index: 1;
  height: 100%;
  width: 100%;
  background-color: rgba(0,0,0,0.3);
  top: 0;
  left: 0;
  display: block;
  text-align: center;
`;

const StyledAlbumDiv = styled.div`
  display: inline-flex;
  flex-direction: column;
  min-height: 15rem;
  max-height: 32rem;
  width: 45rem;
  max-width: 90vw;
  position: relative;
  top: 10%;
  background-color: rgba(255,255,255,1);
  border-radius: 0.25rem;
  border: 0.1rem solid black;
`;

const AlbumCover = styled.img`
  float: left;
  width: 9rem;
  height: 9rem;
  margin-left: 1rem;
  margin-right: 0.75rem;
`;

const AlbumSide = styled.div`
  text-align: left;
  display: block;
  height: 9rem;
  margin-bottom: 0.5rem;
`;

const AlbumName = styled.div`
  font-weight: bold;
  margin-bottom: 0.2rem;
  margin-right: 0;
  padding-top: 2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const AlbumArtist = styled.div`
  margin-bottom: 0.2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledButton = styled.button`
  margin-top: 0.5rem;
  margin-right: 0.5rem;
`;

const CloseButton = styled.button`
  font-size: 2rem;
  margin-left: auto;
  width: 3rem;
  height: 3rem;
  padding: 0.25rem;
  border: none;
  border-radius: 0.25rem;
  background-color: rgba(255,255,255,0);

  &:hover {
    background-color: #D2D2D2;
  }

  &:active {
    position:relative;
    top:1px;
  }
`;

export {
  StyledAlbumWrapper,
  StyledAlbumDiv,
  AlbumCover,
  AlbumSide,
  AlbumName,
  AlbumArtist,
  StyledButton,
  CloseButton
};
