import React from 'react'

import useDatabaseResponse from '../hooks/useDatabaseService'
import { FetchTrackPreferences } from '../../services/DatabaseService'
import {
  StyledAlbumReportForm,
  StyledLabel,
  StyledCheckbox,
  StyledCheckboxWrapper
} from './AlbumPreferenceForm.style'

const AlbumPreferenceForm = (props) => {
  const albumUri = props.albumUri
  const tracks = useDatabaseResponse(FetchTrackPreferences, [albumUri])

  const SavePreferences = (event) => {
    event.preventDefault()
    console.log('Submitted')
  }

  return(
    <StyledAlbumReportForm maxHeight={props.maxHeight} onSubmit={SavePreferences}>
      <StyledCheckboxWrapper>
        {
          !tracks.loading
          && tracks.data.map((track, index) => <CheckboxWrapper key={track.uri} track={track} index={index} />)
        }
        {tracks && console.log(tracks.data)}
      </StyledCheckboxWrapper>
      {!tracks.loading && <button type="submit">Save Preferences</button>}
    </StyledAlbumReportForm>
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
        {props.index+1}. {props.track.name}
      </StyledLabel>
    </li>
  )
}

export default AlbumPreferenceForm