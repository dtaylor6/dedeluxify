import styled from 'styled-components'

export const StyledSpotifyContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  height: 100%;
`

export const StyledSpotifyWrapper = styled.div`
  padding-top: 45px;
  align-items: center;
  display: flex;
  height: 100%;
  margin: 0 auto;
  justify-content: center;
  position: relative;
  width: 80%;
  z-index: 1;
`
export const StyledNowPlayingCover = styled.img`
  border-radius: 8px;
  float: left;
  margin-right: 10px;
  text-align: right;
  width: 150px;
  height: 150px;
`

export const StyledNowPlayingSide = styled.div`
  margin-left: 2%;
  width: 45%;
`

export const StyledNowPlayingName = styled.div`
  font-size: 1.5em;
  margin-bottom: 0.2em;
`

export const StyledNowPlayingArtist = styled.div`
  margin-bottom: 0.2em;
`
export const StyledSpotifyButton = styled.button`
  background-color:#44c767;
  border-radius:28px;
  border:1px solid #18ab29;
  display:inline-block;
  cursor:pointer;
  color:#ffffff;
  font-family:Arial;
  font-size:17px;
  padding:16px 31px;
  text-decoration:none;
  text-shadow:0px 1px 0px #2f6627;

  &:active {
    position:relative;
    top:1px;
  }
`