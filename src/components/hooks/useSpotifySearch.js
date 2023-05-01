import { useEffect, useState } from 'react'

import { SearchAlbums } from '../../services/SpotifyPlaybackService'

// Fetch album query from Spotify service
const useSpotifySearch = (query) => {
  const [results, setResults] = useState(undefined)

  useEffect(() => {
    const getQuery = async () => {
      const queryResult = await SearchAlbums(query)
      setResults(queryResult)
    }
    getQuery()
  }, [query])

  return results
}

export default useSpotifySearch