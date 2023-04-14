const LOCAL_TOKEN_NAME = 'spotify-auth-token'

export const SetToken = token => {
  window.localStorage.setItem(LOCAL_TOKEN_NAME)
}

export const GetToken = () => {
  return window.localStorage.getItem(LOCAL_TOKEN_NAME)
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
  window.localStorage.removeItem(LOCAL_TOKEN_NAME)
}