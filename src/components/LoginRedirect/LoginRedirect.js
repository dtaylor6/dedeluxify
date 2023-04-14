import React from 'react'
import { useSearchParams, Navigate } from 'react-router-dom'

import SpotifyLogin from '../SpotifyLogin/SpotifyLogin'
import { SetToken } from '../../services/SpotifyAuthService'

const LoginRedirect = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const access_token = searchParams.get('access_token')

  // Spotify auth token passed in from url params
  if (access_token) {
    SetToken(access_token)

    // Save new token and navigate back to home page
    return (
      <>
        <Navigate to={'/'} replace={false}/>
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