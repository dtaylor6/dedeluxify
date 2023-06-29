import { useEffect, useState } from 'react';

import { SearchAlbums } from '../services/SpotifyPlaybackService';

// How many ms to wait to search after user stops typing
const SEARCH_TIMEOUT = 500;

// Fetch album query from Spotify service
const useSpotifySearch = (query) => {
  const [results, setResults] = useState(undefined);

  // Wait for user to finish typing before sending search request
  useEffect(() => {
    const getQuery = async () => {
      const queryResult = await SearchAlbums(query);
      setResults(queryResult);
    };

    let debouncer = setTimeout(() => {
      getQuery();
    }, SEARCH_TIMEOUT);

    return () => {
      clearTimeout(debouncer);
    };
  }, [query]);

  return results;
};

export default useSpotifySearch;
