import React, { useState } from 'react'

import useSpotifySearch from '../hooks/useSpotifySearch'
import AlbumWrapper from '../AlbumWindow/AlbumWindow'
import {
  StyledSearchBar,
  StyledSearchInput,
  SearchInputContainer,
  StyledResultButton,
  StyledResults
} from './SearchBar.style'

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
  const [album, setAlbum] = useState(undefined)

  return (
    <StyledResults showBorder={showBorder}>
      {album && <AlbumWrapper album={album} setAlbum={setAlbum} />}
      { results && results.map(result => <ResultButton result={result} setAlbum={setAlbum} key={index++} />)}
    </StyledResults>
  )
}

const ResultButton = (props) => {
  const setAlbum = props.setAlbum

  return (
    <div>
      <StyledResultButton
        title={`${props.result.name} | ${props.result.artists[0].name}`}
        onClick={() => setAlbum(props.result)}
      >
        <b>{props.result.name}</b> | {props.result.artists[0].name}
      </StyledResultButton>
    </div>
  )
}

export default SearchBar