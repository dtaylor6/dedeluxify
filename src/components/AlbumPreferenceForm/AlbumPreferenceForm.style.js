import styled from 'styled-components';

// Wrapper prevents auto scroll bar from repositioning neighbor elements
const AlbumPreferenceFormWrapper = styled.div`
  height: '20rem;'
`;

const StyledAlbumPreferenceForm = styled.form`
  overflow-y: auto;
  height: auto;
  max-height: 19rem;
  margin-bottom: 0.5rem;
`;

const StyledCheckboxWrapper = styled.ol`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
  gap: 10px;
  list-style-type: none;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 1rem;
  margin-left: 1rem;
  padding: 0;
`;

const StyledLabel = styled.label`
  width: 12em;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledCheckbox = styled.input`
`;

export {
  AlbumPreferenceFormWrapper,
  StyledAlbumPreferenceForm,
  StyledCheckboxWrapper,
  StyledLabel,
  StyledCheckbox
};