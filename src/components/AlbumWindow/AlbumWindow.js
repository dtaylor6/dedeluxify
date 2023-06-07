import React, { useState } from 'react'

import { PlayAlbum, QueueAlbum } from '../../services/SpotifyPlaybackService'

import AlbumReportForm from '../AlbumReportForm/AlbumReportForm'
import {
  StyledAlbumWrapper,
  StyledAlbumDiv,
  AlbumCover,
  AlbumSide,
  AlbumName,
  AlbumArtist,
  CloseButton
} from './AlbumWindow.style'

const Play = (albumUri, setAlbum) => {
  PlayAlbum(albumUri)
  setAlbum(undefined)
}

const Queue = (albumUri, setAlbum) => {
  QueueAlbum(albumUri)
  setAlbum(undefined)
}

const AlbumWrapper = (props) => {
  return(
    <StyledAlbumWrapper>
      <AlbumDiv album={props.album} setAlbum={props.setAlbum} />
    </StyledAlbumWrapper>
  )
}

const AlbumDiv = (props) => {
  const [showForm, setShowForm] = useState(false)

  return(
    <StyledAlbumDiv id='album-div'>
      <CloseButton onClick={() => props.setAlbum(undefined)}>X</CloseButton>
      <AlbumSide>
        <AlbumCover src={props.album.images[0].url} alt="" />
        <AlbumName title={props.album.name}>
          {props.album.name}
        </AlbumName>
        <AlbumArtist title={`${props.album.artists[0].name}`}>
          {props.album.artists[0].name}
        </AlbumArtist>
        <button onClick={() => Play(props.album.uri, props.setAlbum)}>Play</button>
        <button onClick={() => Queue(props.album.uri, props.setAlbum)}>Queue</button>
      </AlbumSide>
      {showForm && <AlbumReportForm />}
    </StyledAlbumDiv>
  )
}

export default AlbumWrapper