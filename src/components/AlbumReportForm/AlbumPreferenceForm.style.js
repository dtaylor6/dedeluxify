import styled from 'styled-components'

// Prevents auto scroll bar from repositioning neighbor elements
export const AlbumPreferenceFormWrapper = styled.div`
  height: '20rem;'
`

export const StyledAlbumPreferenceForm = styled.form`
  overflow-y: auto;
  height: auto;
  max-height: 19rem;
  margin-bottom: 0.5rem;
`

export const StyledCheckboxWrapper = styled.ol`
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
`

export const StyledLabel = styled.label`
  width: 14em;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const StyledCheckbox = styled.input`
`