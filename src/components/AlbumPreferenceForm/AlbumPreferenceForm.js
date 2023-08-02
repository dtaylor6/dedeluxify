import React, { useState } from 'react';

import useDatabaseResponse from '../../hooks/useDatabaseResponse';
import { DeleteTrackPreferences, FetchTrackPreferences, PostTrackPreferences } from '../../services/databaseService';
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

  const SavePreferences = async (event) => {
    event.preventDefault();
    props.setButtonDisable(true);
    setButtonText('Saving...');
    const checkboxes = event.target.querySelectorAll('input');

    let preferenceStr = '';
    checkboxes.forEach(checkbox => {
      preferenceStr += checkbox.checked ? '1' : '0';
    });

    try {
      await PostTrackPreferences(albumUri, tracks.data.length, preferenceStr);
    }
    finally {
      setButtonText('Save Preferences');
      props.setButtonDisable(false);
      props.setShowForm(false); // Close form
    }
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
        <StyledButton type="submit" disabled={props.buttonDisable}>{buttonText}</StyledButton>
        <DeleteButton
          albumUri={props.albumUri}
          setShowForm={props.setShowForm}
          buttonDisable={props.buttonDisable}
          setButtonDisable={props.setButtonDisable}
        />
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

  const DeletePreferences = async (event) => {
    event.preventDefault();
    props.setButtonDisable(true);
    setButtonText('Deleting...');

    try {
      await DeleteTrackPreferences(props.albumUri);
    }
    finally {
      props.setButtonDisable(false);
      setButtonText('Delete Preferences');
      props.setShowForm(false); // Close form
    }
  };

  return(
    <StyledButton disabled={props.buttonDisable} onClick={DeletePreferences}>
      {buttonText}
    </StyledButton>
  );
};

export default AlbumPreferenceForm;
