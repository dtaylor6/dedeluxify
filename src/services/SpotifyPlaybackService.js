import axios from 'axios'

import { GetAuthHeader } from './SpotifyAuthService'

export const TransferPlayback = device_id => {
  return(
    axios
      .put(
        'https://api.spotify.com/v1/me/player',
        {
          'device_ids':[device_id],
          play: true
        },
        {
          headers: GetAuthHeader()
        }
      )
  )
}