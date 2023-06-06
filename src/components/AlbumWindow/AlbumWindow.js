import React from 'react'

import { PlayAlbum, QueueAlbum } from '../../services/SpotifyPlaybackService'

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
      <AlbumDiv album={props.album} setAlbum={props.setAlbum} />
    </StyledAlbumWrapper>
  )
}

const AlbumDiv = (props) => {
  const Play = (albumUri) => {
    PlayAlbum(albumUri)
    props.setAlbum(undefined)
  }

  const Queue = (albumUri) => {
    QueueAlbum(albumUri)
    props.setAlbum(undefined)
  }

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
        <button onClick={() => Play(props.album.uri)}>Play</button>
        <button onClick={() => Queue(props.album.uri)}>Queue</button>
      </AlbumSide>
    </StyledAlbumDiv>
  )
}

export default AlbumWrapper