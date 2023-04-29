import styled from 'styled-components'

export const PlayerContainer = styled.div`
  height: 6rem;
  width: 100%;
  position: fixed;
  bottom: 0%;
  align-items: center;
  display: flex;
  justify-content: space-between;
  border-top: thin solid;
  background-color: white;

  &:after {
    flex: 1;
    min-width: 0;
    content: '';
  }
`

export const StyledTrackWrapper = styled.div`
  flex: 1;
  text-align: center;
  display: inline-block;
  min-width: 0;
  height: auto;
  margin-left: 1%;
  position: relative;
  z-index: 1;
`
export const StyledButtonWrapper = styled.div`
  flex: 1;
  display: flex;
  text-align: center;
  justify-content: center;
  min-width: auto;
  white-space: nowrap;
`

export const NowPlayingCover = styled.img`
  border-radius: 0.5em;
  float: left;
  width: 4rem;
  height: 4rem;
  margin-right: 0.5rem;
`

export const NowPlayingSide = styled.div`
  text-align: left;
`

export const NowPlayingName = styled.div`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.2em;
  margin-right: 0;
  overflow: hidden;
  text-overflow: clip;
  white-space: nowrap;
`

export const NowPlayingArtist = styled.div`
  margin-bottom: 0.2rem;
  font-size: 1rem;
  overflow: hidden;
  text-overflow: clip;
  white-space: nowrap;
`
export const StyledTrackButton = styled.button`
  cursor:pointer;
  border: none;
  height: 3rem;
  width: 3rem;
  padding: 0 0;
  background: none;

  &:active {
    position:relative;
    top:1px;
  }
`

export const StyledPlayButton = styled.button`
  cursor:pointer;
  border: none;
  height: 3rem;
  width: 3rem;
  padding: 0 0;
  background: none;
  margin: 0 1em;
`