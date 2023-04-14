import React, { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'

import SpotifyLogin from '../SpotifyLogin/SpotifyLogin'
import SpotifyPlayer from '../SpotifyPlayer/SpotifyPlayer'

const LoginRedirect = (props) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const access_token = searchParams.get('access_token')
  const navigate = useNavigate()

  // Spotify auth token passed in from url params
  if (access_token) {
    window.localStorage.setItem('spotify-auth-token', access_token)
    useEffect(() => {
      navigate('/')
    }, [])

    return (
      <>
        <b>Loading playback...</b>
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