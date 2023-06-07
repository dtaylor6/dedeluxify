import styled from 'styled-components'

export const StyledSearchBar = styled.div`
  flex: 1;
  width: 100%;
  height: calc(100vh - 5rem); /*Subtract height of player*/
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
  border: 0.1rem solid black;
  height: 3rem;
  font-size: 1.5rem;
  margin-top: 1em;
  padding-left: 0.5em;

  &:focus {
    outline: 0;
    border: 0.1rem solid #2886fd;
  }
`

export const StyledResults = styled.div`
  width: 50%;
  max-height: 100%;
  display: ${props => props.showResults ? 'block' : 'none'};
  /* Prevent border from being displayed with no search results */
  border: ${props => props.showBorder ? 'thin solid black' : 'none'};
  border-radius: 0.25rem;
  padding: 0.25rem 0;
  margin-bottom: 0.5rem;
`

export const StyledResultButton = styled.button`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  background-color: #F3F3F3;
  border-width: 0;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #D2D2D2;
  }

  &:active {
    background-color: #949494;
  }
`

