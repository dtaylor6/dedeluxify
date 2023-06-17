import axios from 'axios'

import { GetAuthHeader } from './SpotifyAuthService'

export const FetchTrackPreferences = (uri) => {
  return (
    axios
      .get(
        'http://localhost:3000/api/trackPreferences/', {
          params: {
            uri
          },
          headers: GetAuthHeader()
        }
      )
  )
}