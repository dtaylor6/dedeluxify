import axios from 'axios'

import { GetAuthHeader, GetToken } from './SpotifyAuthService'

export const TransferPlayback = device_id => {
  return (
    axios
      .put(
        'https://api.spotify.com/v1/me/player',
        {
          device_ids:[device_id],
          play: true
        },
        {
          headers: GetAuthHeader()
        }
      )
  )
}

export const SearchAlbums = search => {
  const token = GetToken()

  return (
    axios
      .get(
        'http://localhost:3000/api/spotify/search', {
          params: {
            q: search
          },
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      )
      .then(
        response => response.data
      )
  )
}