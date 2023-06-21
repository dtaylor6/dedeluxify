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
  height: 30rem;
  width: 45rem;
  max-width: 90vw;
  position: relative;
  top: 33%;
  transform: translateY(-50%);
  background-color: rgba(255,255,255,1);
  border-radius: 0.25rem;
  border: 0.1rem solid black;
`

export const AlbumCover = styled.img`
  float: left;
  width: 9rem;
  height: 9rem;
  margin-left: 1rem;
  margin-right: 0.75rem;
`

export const AlbumSide = styled.div`
  text-align: left;
  display: block;
  height: 9rem;
  margin-bottom: 0.5rem;
`

export const AlbumName = styled.div`
  font-weight: bold;
  margin-bottom: 0.2rem;
  margin-right: 0;
  padding-top: 2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const AlbumArtist = styled.div`
  margin-bottom: 0.2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const CloseButton = styled.button`
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
`