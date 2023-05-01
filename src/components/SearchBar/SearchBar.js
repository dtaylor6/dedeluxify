import React, { useEffect, useState } from 'react'

import useField from '../hooks/useField'
import useSpotifySearch from '../hooks/useSpotifySearch'
import { SearchAlbums } from '../../services/SpotifyPlaybackService'
import { StyledSearchBar, StyledSearchInput } from './SearchBar.style'

const SearchBar = (props) => {
  const [query, setQuery] = useState('')
  const searchResults = useSpotifySearch(query)

  const fetch = (event) => {
    event.preventDefault()
    setQuery(event.target.value)
  }

  return (
    <StyledSearchBar title='Search'>
      <SearchInput onChange={fetch} />
      <Results results={searchResults} />
    </StyledSearchBar>
  )
}

const SearchInput = (props) => {
  return (
    <StyledSearchInput type='search' onChange={props.onChange} />
  )
}

const Results = (props) => {
  console.log(props.results)

  return (
    <p>Temp...</p>
  )
}

const Result = (props) => {
  
}

// const Search = async (e) => {
//   console.log(e.target.value)
//   const result = await SearchAlbums(e.target.value)
//   console.log(result)
// }

export default SearchBar