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

  return(
    <StyledAlbumReportForm maxHeight={props.maxHeight}>
      <StyledCheckboxWrapper>
        {
          tracks && !tracks.loading
          && tracks.data.map((track, index) => <CheckboxWrapper key={track.uri} track={track} index={index} />)
        }
        {tracks && console.log(tracks.data)}
      </StyledCheckboxWrapper>
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