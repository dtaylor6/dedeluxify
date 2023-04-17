import styled from 'styled-components'

export const PlayerContainer = styled.div`
  height: auto;
  width: 100%;
  position: fixed;
  bottom: 0%;
  align-items: center;
  display: flex;
  justify-content: center;
`

export const StyledPlayerWrapper = styled.div`
  padding-bottom: 2%;
  align-items: center;
  display: flex;
  height: 100%;
  margin: 0 auto;
  justify-content: center;
  position: relative;
  width: 80%;
  z-index: 1;
`
export const NowPlayingCover = styled.img`
  border-radius: 8px;
  float: left;
  margin-right: 10px;
  text-align: right;
  width: 150px;
  height: 150px;
`

export const NowPlayingSide = styled.div`
  margin-left: 2%;
  width: 45%;
`

export const NowPlayingName = styled.div`
  font-size: 1.5em;
  margin-bottom: 0.2em;
`

export const NowPlayingArtist = styled.div`
  margin-bottom: 0.2em;
`
export const StyledTrackButton = styled.button`
  display:inline-block;  
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
  display:inline-block;  
  cursor:pointer;
  border: none;
  height: 4rem;
  width: 4rem;
  padding: 0 0;
  background: none;
`