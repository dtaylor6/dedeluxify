import React, { useState } from 'react';

import { PlayAlbum, QueueAlbum } from '../../services/spotifyPlaybackService';

import AlbumPreferenceForm from '../AlbumPreferenceForm/AlbumPreferenceForm';
import {
  StyledAlbumWrapper,
  StyledAlbumDiv,
  AlbumCover,
  AlbumSide,
  AlbumName,
  AlbumArtist,
  CloseButton,
  StyledButton
} from './AlbumWindow.style';

const Play = (albumUri, setAlbum) => {
  PlayAlbum(albumUri);
  setAlbum(undefined);
};

const Queue = (albumUri, setAlbum) => {
  QueueAlbum(albumUri);
  setAlbum(undefined);
};

const AlbumWindow = (props) => {
  return(
    <StyledAlbumWrapper>
      <AlbumDiv album={props.album} setAlbum={props.setAlbum} />
    </StyledAlbumWrapper>
  );
};

const AlbumDiv = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(false);

  return(
    <StyledAlbumDiv id='album-div'>
      <CloseButton disabled={buttonDisable} onClick={() => props.setAlbum(undefined)}>X</CloseButton>
      <AlbumSide>
        <AlbumCover src={props.album.images[0].url} alt="" />
        <AlbumName title={props.album.name}>
          {props.album.name}
        </AlbumName>
        <AlbumArtist title={`${props.album.artists[0].name}`}>
          {props.album.artists[0].name}
        </AlbumArtist>
        <StyledButton disabled={buttonDisable} onClick={() => Play(props.album.uri, props.setAlbum)}>
          Play
        </StyledButton>
        <StyledButton disabled={buttonDisable} onClick={() => Queue(props.album.uri, props.setAlbum)}>
          Queue
        </StyledButton>
        <StyledButton disabled={buttonDisable} onClick={() => setShowForm(!showForm)}>
          Set Tracks
        </StyledButton>
      </AlbumSide>
      {
        showForm &&
        <AlbumPreferenceForm
          albumUri={props.album.uri}
          setShowForm={setShowForm}
          buttonDisable={buttonDisable}
          setButtonDisable={setButtonDisable}
        />
      }
    </StyledAlbumDiv>
  );
};

export default AlbumWindow;
