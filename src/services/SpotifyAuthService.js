const SPOTIFY_TOKEN_NAME = 'spotify-auth-token'

export const SetToken = token => {
  window.localStorage.setItem(SPOTIFY_TOKEN_NAME, token)
}

export const GetToken = () => {
  return window.localStorage.getItem(SPOTIFY_TOKEN_NAME)
}

export const GetAuthHeader = () => {
  const token = GetToken()
  return (
    {
      'Authorization': `Bearer ${token}`
    }
  )
}

export const ClearToken = () => {
  window.localStorage.removeItem(SPOTIFY_TOKEN_NAME)
}