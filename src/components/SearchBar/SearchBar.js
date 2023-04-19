import React from 'react'

import { SearchAlbums } from '../../services/SpotifyPlaybackService'
import { StyledSearchInput } from './SearchBar.style'

const SearchBar = (props) => {
  return (
    <>
      <SearchInput />
    </>
  )
}

const SearchInput = (props) => {
  return (
    <StyledSearchInput type='search' onChange={(e => Search(e))}/>
  )
}

const Search = async (e) => {
  console.log(e.target.value)
  const result = await SearchAlbums(e.target.value)
  console.log(result)
}

export default SearchBar