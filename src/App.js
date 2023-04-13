import React, { useState, useEffect } from 'react' // we need this now also in component files
import LoginRedirect from './components/LoginRedirect/LoginRedirect'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'


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
          <Route path='/' element={<LoginRedirect access_token={token} />} />
        </Routes>
      </>
    </BrowserRouter>
  )
}

export default App