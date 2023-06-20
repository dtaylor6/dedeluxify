import React from 'react'

import useDatabaseResponse from '../hooks/useDatabaseService'
import { FetchTrackPreferences } from '../../services/DatabaseService'
import {
  StyledAlbumReportForm,
  StyledLabel,
  StyledCheckbox
} from './AlbumPreferenceForm.style'

const AlbumPreferenceForm = (props) => {
  const albumUri = props.albumUri
  const tracks = useDatabaseResponse(FetchTrackPreferences, [albumUri])

  return(
    <StyledAlbumReportForm maxHeight={props.maxHeight}>
      {
        tracks && !tracks.loading
        && tracks.data.map(track => <CheckboxWrapper key={track.uri} track={track} />)
      }
      {tracks && console.log(tracks.data)}
    </StyledAlbumReportForm>
  )
}

const CheckboxWrapper = (props) => {
  return (
    <StyledLabel>
      <StyledCheckbox
        type='checkbox'
        id={props.track.uri}
        defaultChecked={true}
      />
      {props.track.name}
    </StyledLabel>
  )
}

export default AlbumPreferenceForm