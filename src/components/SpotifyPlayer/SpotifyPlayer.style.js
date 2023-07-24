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
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;

  &:hover {
    opacity: 1;
  }

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
  margin: 0 1rem;
`;

const VolumeWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const StyledSlider = styled.input`
  width: 10rem;
  height: 0.5rem;
  margin-right: 1rem;
  margin-left: 0.5rem;
  max-width: 15vw;
  background: #d3d3d3;
  accent-color: black;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
  border-radius: 1rem;

  &:hover {
    opacity: 1;
  }
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
  StyledPlayButton,
  VolumeWrapper,
  StyledSlider
};
