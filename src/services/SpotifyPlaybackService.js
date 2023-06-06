import axios from 'axios'

import { GetAuthHeader } from './SpotifyAuthService'

export const TransferPlayback = (device_id) => {
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

export const SearchAlbums = (search) => {
  if (search === '') {
    return undefined
  }

  return (
    axios
      .get(
        'http://localhost:3000/api/spotify/search', {
          params: {
            q: search
          },
          headers: GetAuthHeader()
        }
      )
      .then(
        response => response.data
      )
  )
}

export const PlayAlbum = (uri) => {
  return (
    axios
      .get(
        'http://localhost:3000/api/spotify/play/', {
          params: {
            uri
          },
          headers: GetAuthHeader()
        }
      )
  )
}

export const QueueAlbum = (uri) => {
  return (
    axios
      .get(
        'http://localhost:3000/api/spotify/queue/', {
          params: {
            uri
          },
          headers: GetAuthHeader()
        }
      )
  )
}