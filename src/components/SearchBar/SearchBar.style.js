import styled from 'styled-components';

const StyledSearchBar = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  align-content: flex-start;
`;

const SearchInputContainer = styled.div`
  width: 100%;
  height: auto;
  text-align: center;
`;
const StyledSearchInput = styled.input`
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
`;

const StyledResults = styled.div`
  width: 50%;
  max-height: 100%;
  display: ${props => props.showResults ? 'block' : 'none'};
  /* Prevent border from being displayed with no search results */
  border: ${props => props.showBorder ? 'thin solid black' : 'none'};
  border-radius: 0.25rem;
  padding: ${props => props.showBorder ? '0.25rem 0' : 'none'};
  margin-bottom: 0.5rem;
  background-color: white;
`;

const StyledResultButton = styled.button`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  border-width: 0;
  cursor: pointer;
  font-size: 1rem;
  background-color: white;

  &:hover {
    background-color: #D2D2D2;
  }

  &:active {
    background-color: #949494;
  }
`;

export {
  StyledSearchBar,
  SearchInputContainer,
  StyledSearchInput,
  StyledResults,
  StyledResultButton
};
