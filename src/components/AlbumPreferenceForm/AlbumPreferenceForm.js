import React, { useState } from 'react'

import useDatabaseResponse from '../hooks/useDatabaseResponse'
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
  const [buttonText, setButtonText] = useState('Save Preferences')
  const [buttonDisable, setButtonDisable] = useState(false)

  const SavePreferences = async (event) => {
    event.preventDefault()
    setButtonDisable(true)
    setButtonText('Saving...')
    const checkboxes = event.target.querySelectorAll('input')
    const uris = []
    checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        uris.push(checkbox.id)
      }
    })
    await PostTrackPreferences(uris)
    setButtonText('Save Preferences')
    setButtonDisable(false)
  }

  return(!tracks.loading &&
    <AlbumPreferenceFormWrapper>
      <StyledAlbumPreferenceForm maxHeight={props.maxHeight} onSubmit={SavePreferences}>
        <StyledCheckboxWrapper>
          {
            tracks.data
            && tracks.data.map((track, index) => <CheckboxWrapper key={track.uri} track={track} index={index} />)
          }
        </StyledCheckboxWrapper>
        <button type="submit" disabled={buttonDisable}>{buttonText}</button>
      </StyledAlbumPreferenceForm>
    </AlbumPreferenceFormWrapper>
  )
}

const CheckboxWrapper = (props) => {
  return (
    <li title={props.track.name}>
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