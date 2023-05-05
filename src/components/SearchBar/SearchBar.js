import React, { useState } from 'react'

import useSpotifySearch from '../hooks/useSpotifySearch'
import {
  StyledSearchBar,
  StyledSearchInput,
  SearchInputContainer,
  StyledResult,
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
  return (
    <StyledResults>
      { props.results && props.results.map(result => <Result result={result} key={++index} />)}
    </StyledResults>
  )
}

const Result = (props) => {
  return (
    <StyledResult title={`${props.result.name} | ${props.result.artists[0].name}`}>
      <b>{props.result.name}</b> | {props.result.artists[0].name}
    </StyledResult>
  )
}

export default SearchBar