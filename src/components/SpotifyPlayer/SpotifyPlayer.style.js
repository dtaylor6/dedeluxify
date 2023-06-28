import styled from 'styled-components';

const PlayerContainer = styled.div`
  height: 5rem;
  width: 100%;
  align-items: center;
  display: flex;
  position: sticky;
  bottom: 0;
  justify-content: space-between;
  border-top: thin solid;
  background-color: white;
  z-index: 2;

  &:after {
    flex: 1;
    min-width: 0;
    content: '';
  }
`;

const StyledTrackWrapper = styled.div`
  flex: 1;
  text-align: center;
  display: inline-block;
  min-width: 0;
  height: auto;
  margin-left: 1%;
  position: relative;
`;

const StyledButtonWrapper = styled.div`
  flex: 1;
  display: flex;
  text-align: center;
  justify-content: center;
  min-width: auto;
  white-space: nowrap;
`;

const NowPlayingCover = styled.img`
  float: left;
  width: 4rem;
  height: 4rem;
  margin-right: 0.75rem;
`;

const NowPlayingSide = styled.div`
  text-align: left;
  margin-top: 0.5rem;
`;

const NowPlayingName = styled.div`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.2em;
  margin-right: 0;
  overflow: hidden;
  text-overflow: clip;
  white-space: nowrap;
`;

const NowPlayingArtist = styled.div`
  margin-bottom: 0.2rem;
  font-size: .75rem;
  overflow: hidden;
  text-overflow: clip;
  white-space: nowrap;
`;

const StyledTrackButton = styled.button`
  cursor: pointer;
  border: none;
  height: 3rem;
  width: 3rem;
  padding: 0 0;
  background: none;

  &:active {
    position:relative;
    top:1px;
  }
`;

const StyledPlayButton = styled.button`
  cursor: pointer;
  border: none;
  height: 3rem;
  width: 3rem;
  padding: 0 0;
  background: none;
  margin: 0 1em;
`;

export {
  PlayerContainer,
  StyledTrackWrapper,
  StyledButtonWrapper,
  NowPlayingCover,
  NowPlayingSide,
  NowPlayingName,
  NowPlayingArtist,
  StyledTrackButton,
  StyledPlayButton
};
