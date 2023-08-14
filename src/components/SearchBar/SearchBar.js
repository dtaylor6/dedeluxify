import React, { useState, useEffect, useRef, forwardRef } from 'react';

import useSpotifySearch from '../../hooks/useSpotifySearch';
import AlbumWindow from '../AlbumWindow/AlbumWindow';
import {
  StyledSearchBar,
  StyledSearchInput,
  SearchInputContainer,
  StyledResultButton,
  StyledResults
} from './SearchBar.style';

const SearchBar = (props) => {
  const [query, setQuery] = useState('');
  const searchResults = useSpotifySearch(query);
  const searchInput = useRef(null);
  const results = useRef(null);

  const [album, setAlbum] = useState(undefined);
  const albumRef = useRef(undefined);
  const setAlbumFunc = (val) => {
    albumRef.current = val;
    setAlbum(val);
  };

  const fetch = (event) => {
    event.preventDefault();
    setQuery(event.target.value);
  };

  // Hide search results when clicking outside of search bar or search results box
  const [showResults, setShowResults] = useState(false);
  useEffect(() => {
    document.addEventListener('click', (e) => {
      if (!e.target) {
        setShowResults(false);
      }
      else if (searchInput.current && searchInput.current.contains(e.target)){
        setShowResults(true);
      }
      else if (results.current && results.current.contains(e.target)){
        setShowResults(true);
      }
      else {
        if (!albumRef.current) {
          // Clicked outside the box without album window open
          setShowResults(false);
        }
      }
    });
  }, []);

  return (
    <StyledSearchBar>
      <SearchInputContainer>
        <SearchInput onChange={fetch} ref={searchInput} />
      </SearchInputContainer>
      <Results
        results={(query !== '') ? searchResults : undefined}
        showResults={showResults}
        ref={results}
        album={album}
        setAlbum={setAlbumFunc}
      />
    </StyledSearchBar>
  );
};

const SearchInput = forwardRef((props, ref) => {
  return (
    <StyledSearchInput
      title="Search"
      type="search"
      placeholder="Search"
      onChange={props.onChange}
      ref={ref}
    />
  );
});
SearchInput.displayName = 'SearchInput';

const Results = forwardRef((props, ref) => {
  let index = 0;
  const showBorder = props.results && (props.results.length > 0);

  return (
    <StyledResults showBorder={showBorder} showResults={props.showResults} ref={ref} id='search-results'>
      {props.album && <AlbumWindow album={props.album} setAlbum={props.setAlbum} />}
      {
        props.results
        && !props.results.loading
        && props.results.map(result => <ResultButton result={result} setAlbum={props.setAlbum} key={index++} />)
      }
    </StyledResults>
  );
});
Results.displayName = 'Results';

const ResultButton = (props) => {
  return (
    <div>
      <StyledResultButton
        title={`${props.result.name} | ${props.result.artists[0].name}`}
        onClick={() => props.setAlbum(props.result)}
      >
        <b>{props.result.name}</b> | {props.result.artists[0].name}
      </StyledResultButton>
    </div>
  );
};

export default SearchBar;
