import React from 'react'

import useDatabaseResponse from '../hooks/useDatabaseService'
import { FetchTrackPreferences, PostTrackPreferences } from '../../services/DatabaseService'
import {
  AlbumPreferenceFormWrapper,
  StyledAlbumPreferenceForm,
  StyledLabel,
  StyledCheckbox,
  StyledCheckboxWrapper
} from './AlbumPreferenceForm.style'

const AlbumPreferenceForm = (props) => {
  const albumUri = props.albumUri
  const tracks = useDatabaseResponse(FetchTrackPreferences, [albumUri])

  const SavePreferences = (event) => {
    event.preventDefault()
    const checkboxes = event.target.querySelectorAll('input')
    const uris = []
    checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        uris.push(checkbox.id)
      }
    })
    PostTrackPreferences(uris)
  }

  return(
    <AlbumPreferenceFormWrapper>
      <StyledAlbumPreferenceForm maxHeight={props.maxHeight} onSubmit={SavePreferences}>
        <StyledCheckboxWrapper>
          {
            !tracks.loading
            && tracks.data.map((track, index) => <CheckboxWrapper key={track.uri} track={track} index={index} />)
          }
          {tracks && console.log(tracks.data)}
        </StyledCheckboxWrapper>
        {!tracks.loading && <button type="submit">Save Preferences</button>}
      </StyledAlbumPreferenceForm>
    </AlbumPreferenceFormWrapper>
  )
}

const CheckboxWrapper = (props) => {
  return (
    <li title={props.track.name} >
      <StyledLabel>
        <StyledCheckbox
          type='checkbox'
          id={props.track.uri}
          defaultChecked={true}
        />
        <b>{props.index+1}.</b> {props.track.name}
      </StyledLabel>
    </li>
  )
}

export default AlbumPreferenceForm