import React from 'react'

import { PlayAlbum } from '../../services/SpotifyPlaybackService'


import {
  StyledAlbumWrapper,
  StyledAlbumDiv,
  AlbumCover,
  AlbumSide,
  AlbumName,
  AlbumArtist
} from './AlbumWindow.style'

const AlbumWrapper = (props) => {
  return(
    <StyledAlbumWrapper>
      <AlbumDiv album={props.album} />
    </StyledAlbumWrapper>
  )
}

const AlbumDiv = (props) => {
  return(
    <StyledAlbumDiv>
      <AlbumCover src={props.album.images[0].url} alt="" />

      <AlbumSide>
        <AlbumName title={props.album.name}>
          {props.album.name}
        </AlbumName>
        <AlbumArtist title={`${props.album.artists[0].name}`}>
          {props.album.artists[0].name}
        </AlbumArtist>
      </AlbumSide>
    </StyledAlbumDiv>
  )
}

export default AlbumWrapper