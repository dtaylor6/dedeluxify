import React, { useState } from 'react';

import useDatabaseResponse from '../hooks/useDatabaseResponse';
import { FetchTrackPreferences, PostTrackPreferences } from '../../services/DatabaseService';
import {
  AlbumPreferenceFormWrapper,
  StyledAlbumPreferenceForm,
  StyledLabel,
  StyledCheckbox,
  StyledCheckboxWrapper
} from './AlbumPreferenceForm.style';

const AlbumPreferenceForm = (props) => {
  const albumUri = props.albumUri;
  const tracks = useDatabaseResponse(FetchTrackPreferences, [albumUri]);
  const [buttonText, setButtonText] = useState('Save Preferences');
  const [buttonDisable, setButtonDisable] = useState(false);

  const SavePreferences = async (event) => {
    event.preventDefault();
    setButtonDisable(true);
    setButtonText('Saving...');
    const checkboxes = event.target.querySelectorAll('input');

    let preferenceStr = '';
    checkboxes.forEach(checkbox => {
      preferenceStr += checkbox.checked ? '1' : '0';
    });

    await PostTrackPreferences(albumUri, tracks.data.length, preferenceStr);
    setButtonText('Save Preferences');
    setButtonDisable(false);
  };

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
  );
};

const CheckboxWrapper = (props) => {
  return (
    <li title={props.track.name}>
      <StyledLabel>
        <StyledCheckbox
          type="checkbox"
          id={props.track.uri}
          defaultChecked={true}
        />
        <b>{props.index+1}.</b> {props.track.name}
      </StyledLabel>
    </li>
  );
};

export default AlbumPreferenceForm;
