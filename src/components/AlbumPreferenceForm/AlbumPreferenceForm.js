import React, { useState } from 'react';

import useDatabaseResponse from '../../hooks/useDatabaseResponse';
import { DeleteTrackPreferences, FetchTrackPreferences, PostTrackPreferences } from '../../services/DatabaseService';
import {
  AlbumPreferenceFormWrapper,
  StyledAlbumPreferenceForm,
  StyledLabel,
  StyledCheckbox,
  StyledCheckboxWrapper,
  StyledButton
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
    props.setShowForm(false); // Close form
  };

  return(!tracks.loading &&
    <AlbumPreferenceFormWrapper>
      <StyledAlbumPreferenceForm maxHeight={props.maxHeight} onSubmit={SavePreferences}>
        <StyledCheckboxWrapper>
          {
            tracks.data
            && tracks.data.map((track, index) =>
              <CheckboxWrapper key={track.uri} track={track} index={index} checked={track.play} />)
          }
        </StyledCheckboxWrapper>
        <StyledButton type="submit" disabled={buttonDisable}>{buttonText}</StyledButton>
        <DeleteButton albumUri={props.albumUri} setShowForm={props.setShowForm} />
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
          defaultChecked={props.checked}
        />
        <b>{props.index+1}.</b> {props.track.name}
      </StyledLabel>
    </li>
  );
};

const DeleteButton = (props) => {
  const [buttonText, setButtonText] = useState('Delete Preferences');
  const [buttonDisable, setButtonDisable] = useState(false);

  const DeletePreferences = async (event) => {
    event.preventDefault();
    setButtonDisable(true);
    setButtonText('Deleting...');

    await DeleteTrackPreferences(props.albumUri);
    setButtonDisable(false);
    setButtonText('Delete Preferences');
    props.setShowForm(false); // Close form
  };

  return(
    <StyledButton disabled={buttonDisable} onClick={DeletePreferences}>
      {buttonText}
    </StyledButton>
  );
};

export default AlbumPreferenceForm;
