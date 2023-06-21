import styled from 'styled-components'

// Prevents auto scroll bar from repositioning neighbor elements
export const AlbumPreferenceFormWrapper = styled.div`
  height: '13rem;'
`

export const StyledAlbumPreferenceForm = styled.form`
  overflow-y: auto;
  height: auto;
  max-height: 12rem;
  margin-bottom: 0.5rem;
`

export const StyledCheckboxWrapper = styled.ul`
  columns: 3 12em;
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