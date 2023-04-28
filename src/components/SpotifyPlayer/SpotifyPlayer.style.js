import styled from 'styled-components'

//import ScrollingText from '../ScrollingText/ScrollingText'

export const PlayerContainer = styled.div`
  height: 6rem;
  width: 100%;
  position: fixed;
  bottom: 0%;
  align-items: center;
  display: flex;
  justify-content: space-between;
  border-top: 0.1rem solid;
  background-color: white;

  &:after {
    flex: 1;
    content: '';
  }
`

export const StyledTrackWrapper = styled.div`
  flex: 1;
  text-align: center;
  display: inline-block;
  height: 100%;
  justify-content: center;
  position: relative;
  z-index: 1;
`
export const StyledButtonWrapper = styled.div`
  flex: 1;
  min-width: 
  display: flex;
  text-align: center;
  min-width: 20em;
  white-space: nowrap;
`

export const NowPlayingCover = styled.img`
  border-radius: 0.5em;
  float: left;

  width: 5em;
  height: 5em;
`

export const NowPlayingSide = styled.div`
  text-align: left;
`

export const NowPlayingName = styled.div`
  font-size: 1.5em;
  margin-bottom: 0.2em;
  margin-right: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const NowPlayingArtist = styled.div`
  margin-bottom: 0.2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
export const StyledTrackButton = styled.button`
  cursor:pointer;
  border: none;
  height: 4rem;
  width: 4rem;
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
  height: 4rem;
  width: 4rem;
  padding: 0 0;
  background: none;
  margin: 0 1rem;
`