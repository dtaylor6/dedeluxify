import styled from 'styled-components'

export const StyledAlbumWrapper = styled.div`
  position: absolute;
  z-index: 1;
  height: 100%;
  width: 100%;
  background-color: rgba(0,0,0,0.3);
  top: 0;
  left: 0;
  display: block;
  text-align: center;
`

export const StyledAlbumDiv = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 9rem;
  width: 25rem;
  position: relative;
  top: 33%;
  transform: translateY(-50%);
  background-color: rgba(255,255,255,1);
  border-radius: 0.25rem;
  border: 0.1rem solid black;
`

export const AlbumCover = styled.img`
  border-radius: 0.5rem;
  float: left;
  width: 6rem;
  height: 6rem;
  margin-left: 1rem;
  margin-right: 0.75rem;
`

export const AlbumSide = styled.div`
  text-align: left;
  display: block;
  height: 6rem;
`

export const AlbumName = styled.div`
  font-size: 1rem;
  font-weight: bold;
  margin-top: 1rem;
  margin-bottom: 0.2rem;
  margin-right: 0;
  overflow: hidden;
  text-overflow: clip;
  white-space: nowrap;
`

export const AlbumArtist = styled.div`
  margin-bottom: 0.2rem;
  font-size: .75rem;
  overflow: hidden;
  text-overflow: clip;
  white-space: nowrap;
`