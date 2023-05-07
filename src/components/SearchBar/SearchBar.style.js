import styled from 'styled-components'

export const StyledSearchBar = styled.div`
  flex: 1;
  width: 100%;
  top: 0%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  align-content: flex-start;
`

export const SearchInputContainer = styled.div`
  width: 100%;
  height: auto;
  text-align: center;
`
export const StyledSearchInput = styled.input`
  width: 50%;
  border-radius: 0.25rem;
  border-width: thin;
  height: 2rem;
  font-size: 100%;
  margin-top: 1em;
  padding-left: 0.5em;
`

export const StyledResults = styled.div`
  width: 50%;
  max-height: 100%;
`

export const StyledResultButton = styled.button`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  background-color: white;
  border-width: 0;
  cursor: pointer;

  &:hover {
    background-color: #EAEAEA;
  }

  &:active {
    background-color: #D2D2D2;
  }
`

