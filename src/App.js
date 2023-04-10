import React, { useState, useEffect } from 'react' // we need this now also in component files
import SpotifyPlayer from './components/Spotify/SpotifyPlayer'
import SpotifyLoginPage from './components/Spotify/SpotifyLoginPage'
import {
  BrowserRouter,
  Routes,
  Route,
  useSearchParams
} from 'react-router-dom'

const LoginOrPlayer = (props) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const access_token = searchParams.get('access_token')

  // Spotify auth token passed in from url params
  if (access_token) {
    window.localStorage.setItem('spotify-auth-token', access_token)
    return (
      <>
        <SpotifyPlayer access_token={access_token} />
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
      <SpotifyLoginPage />
    </>
  )
}


const App = () => {
  const [token, setToken] = useState('')
  //const [spotifyUser, setSpotifyUser] = useState(null)

  // Fetch playback token saved to local storage
  useEffect(() => {
    // const loggedSpotifyUserJSON = window.localStorage.getItem('spotify-auth-token')
    // if (loggedSpotifyUserJSON && loggedSpotifyUserJSON !== 'undefined') {
    //   const user = JSON.parse(loggedSpotifyUserJSON)
    //   setSpotifyUser(user)
    //   setToken(user.token)
    // }
    const savedToken = window.localStorage.getItem('spotify-auth-token')
    if (savedToken) {
      setToken(savedToken)
    }
  }, [])

  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route path='/' element={<LoginOrPlayer access_token={token} />} />
        </Routes>
      </>
    </BrowserRouter>
  )
}

export default App