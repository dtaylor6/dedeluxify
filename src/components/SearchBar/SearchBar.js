import React, { useState, useEffect } from 'react'

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

  // Hide search results when clicking outside of search bar or search results box
  const [showResults, setShowResults] = useState(false)
  useEffect(() => {
    document.addEventListener('click', (e) => {
      if (document.getElementById('search-bar').contains(e.target)) {
        setShowResults(true)
      }
      else if (document.getElementById('search-results').contains(e.target)) {
        setShowResults(true)
      }
      else {
        // Clicked outside the box
        setShowResults(false)
      }
    })
  }, [])

  return (
    <StyledSearchBar>
      <SearchInputContainer>
        <SearchInput onChange={fetch} />
      </SearchInputContainer>
      <Results
        results={(query !== '') ? searchResults : undefined}
        showResults={showResults}
      />
    </StyledSearchBar>
  )
}

const SearchInput = (props) => {
  return <StyledSearchInput id='search-bar' title='Search' type='search' placeholder='Search' onChange={props.onChange} />
}

const Results = (props) => {
  let index = 0
  const results = props.results
  const showResults = props.showResults
  const showBorder = results && (results.length > 0)
  const [album, setAlbum] = useState(undefined)

  return (
    <StyledResults id='search-results' showBorder={showBorder} showResults={showResults}>
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