import React, { useState } from 'react'

import useSpotifySearch from '../hooks/useSpotifySearch'
import {
  StyledSearchBar,
  StyledSearchInput,
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
      <SearchInput onChange={fetch} />
      <Results results={(query !== '') ? searchResults : undefined} />
    </StyledSearchBar>
  )
}

const SearchInput = (props) => {
  return <StyledSearchInput title='Search' type='search' onChange={props.onChange} />
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
  return <StyledResult>{props.result.name}</StyledResult>
}

// const Search = async (e) => {
//   console.log(e.target.value)
//   const result = await SearchAlbums(e.target.value)
//   console.log(result)
// }

export default SearchBar