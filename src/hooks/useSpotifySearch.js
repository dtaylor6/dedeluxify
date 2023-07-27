import { useEffect, useState } from 'react';

import { SearchAlbums } from '../services/spotifyPlaybackService';

// How many ms to wait to search after user stops typing
const SEARCH_TIMEOUT = 500;

// Fetch album query from Spotify service
const useSpotifySearch = (query) => {
  const [results, setResults] = useState(undefined);
  const [loading, setLoading] = useState(true);
  let isStale = false;

  // Wait for user to finish typing before sending search request
  useEffect(() => {
    const getQuery = async () => {
      if (query) {
        const queryResult = await SearchAlbums(query);
        queryResult['loading'] = false;
        setLoading(false);
        if (!isStale) {
          setResults(queryResult);
        }
      }
      else {
        setLoading(false);
      }
    };

    let debouncer = setTimeout(() => {
      getQuery();
    }, SEARCH_TIMEOUT);

    return () => {
      clearTimeout(debouncer);
      // Prevent old response from being set as state if hook is called multiple times
      isStale = true;
    };
  }, [query]);

  return loading ? { loading } : results;
};

export default useSpotifySearch;
