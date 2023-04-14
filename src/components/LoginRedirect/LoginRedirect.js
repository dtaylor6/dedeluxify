import React from 'react'
import { useSearchParams, Navigate } from 'react-router-dom'

import SpotifyLogin from '../SpotifyLogin/SpotifyLogin'
import SpotifyPlayer from '../SpotifyPlayer/SpotifyPlayer'

const LoginRedirect = (props) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const access_token = searchParams.get('access_token')

  // Spotify auth token passed in from url params
  if (access_token) {
    window.localStorage.setItem('spotify-auth-token', access_token)

    return (
      <>
        <Navigate to={'/'} replace={true}/>
      </>
    )
  }
  // Spotify auth token passed in from local storage
  else if (props.access_token) {
    return (
      <>
        <SpotifyPlayer access_token={props.access_token} />
      </>
    )
  }

  return (
    <>
      <SpotifyLogin />
    </>
  )
}

export default LoginRedirect