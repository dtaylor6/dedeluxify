import React, { useState } from 'react'

import useSpotifySearch from '../hooks/useSpotifySearch'
import { PlayAlbum } from '../../services/SpotifyPlaybackService'
import {
  StyledSearchBar,
  StyledSearchInput,
  SearchInputContainer,
  StyledResultButton,
  StyledResults } from './SearchBar.style'

const SearchBar = (props) => {
  const [query, setQuery] = useState('')
  const searchResults = useSpotifySearch(query)

  const fetch = (event) => {
    event.preventDefault()
    setQuery(event.target.value)
  }

  return (
    <StyledSearchBar>
      <SearchInputContainer>
        <SearchInput onChange={fetch} />
      </SearchInputContainer>
      <Results results={(query !== '') ? searchResults : undefined} />
    </StyledSearchBar>
  )
}

const SearchInput = (props) => {
  return <StyledSearchInput title='Search' type='search' placeholder='Search' onChange={props.onChange} />
}

const Results = (props) => {
  let index = 0
  const results = props.results
  const showBorder = results && (results.length > 0)

  return (
    <StyledResults showBorder={showBorder}>
      { results && results.map(result => <ResultButton result={result} key={++index} />)}
    </StyledResults>
  )
}

const ResultButton = (props) => {
  return (
    <StyledResultButton
      title={`${props.result.name} | ${props.result.artists[0].name}`}
      onClick={() => PlayAlbum(props.result.uri)}
    >
      <b>{props.result.name}</b> | {props.result.artists[0].name}
    </StyledResultButton>
  )
}

export default SearchBar