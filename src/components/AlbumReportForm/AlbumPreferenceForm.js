import React from 'react'

import useDatabaseResponse from '../hooks/useDatabaseService'
import { FetchTrackPreferences } from '../../services/DatabaseService'
import {
  StyledAlbumReportForm,
  StyledLabel,
  StyledCheckboxWrapper
} from './AlbumPreferenceForm.style'

const AlbumPreferenceForm = (props) => {
  const albumUri = props.albumUri
  const tracks = useDatabaseResponse(FetchTrackPreferences, [albumUri])
  console.log(tracks)

  return(
    <StyledAlbumReportForm maxHeight={props.maxHeight}>
      {
        tracks && tracks.length > 0
        && tracks.map(track => <CheckboxWrapper key={track.uri}>track.name</CheckboxWrapper>)
      }
    </StyledAlbumReportForm>
  )
}

const CheckboxWrapper = (props) => {
  return (
    <StyledLabel>
      <StyledCheckboxWrapper
        type='checkbox'
        id={props.id}
        checked={props.checked}
      >
        {props.children}
      </StyledCheckboxWrapper>
    </StyledLabel>
  )
}

export default AlbumPreferenceForm