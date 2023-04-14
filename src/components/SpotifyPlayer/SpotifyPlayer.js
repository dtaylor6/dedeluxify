import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { TransferPlayback } from '../../services/SpotifyPlaybackService'
import {
  StyledSpotifyContainer,
  StyledSpotifyWrapper,
  StyledNowPlayingCover,
  StyledNowPlayingSide,
  StyledNowPlayingName,
  StyledNowPlayingArtist,
  StyledSpotifyButton
} from './SpotifyPlayer.style'


export const track = {
  name: '',
  album: {
    images: [
      { url: '' }
    ]
  },
  artists: [
    { name: '' }
  ]
}

const SpotifyPlayer = (props) => {
  const [isPaused, setPaused] = useState(false)
  const [isActive, setActive] = useState(false)
  const [player, setPlayer] = useState(undefined)
  const [currentTrack, setTrack] = useState(track)
  const navigate = useNavigate()

  useEffect(() => {
    const script = document.createElement('script')

    script.src = 'https://sdk.scdn.co/spotify-player.js'
    script.async = true

    document.body.appendChild(script)

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Web Playback SDK',
        getOAuthToken: cb => { cb(props.access_token) },
        volume: 0.5
      })

      setPlayer(player)

      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id)
        TransferPlayback(device_id)
      })

      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id)
      })

      player.addListener('player_state_changed', ( state => {
        if (!state) {
          return
        }

        setTrack(state.track_window.current_track)
        setPaused(state.paused)

        player.getCurrentState().then( state => {
          (!state)? setActive(false) : setActive(true)
        })
      }))

      player.on('authentication_error', ({ message }) => {
        console.error('Failed to authenticate:', message)
        window.localStorage.removeItem('spotify-auth-token')
        navigate('/')
      })

      player.connect()
    }

    // Clean up external script after this effect
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  if (!isActive) {
    return (
      <>
        <StyledSpotifyContainer>
          <StyledSpotifyWrapper>
            <b> Loading player... </b>
          </StyledSpotifyWrapper>
        </StyledSpotifyContainer>
      </>
    )
  }
  else {
    return (
      <>
        <StyledSpotifyContainer>
          <StyledSpotifyWrapper>

            <StyledNowPlayingCover src={currentTrack.album.images[0].url} alt="" />

            <StyledNowPlayingSide>
              <StyledNowPlayingName>{currentTrack.name}</StyledNowPlayingName>
              <StyledNowPlayingArtist>{currentTrack.artists[0].name}</StyledNowPlayingArtist>

              <StyledSpotifyButton onClick={() => { player.previousTrack() }} >
                &lt;&lt;
              </StyledSpotifyButton>

              <StyledSpotifyButton onClick={() => { player.togglePlay() }} >
                { isPaused ? 'PLAY' : 'PAUSE' }
              </StyledSpotifyButton>

              <StyledSpotifyButton onClick={() => { player.nextTrack() }} >
                &gt;&gt;
              </StyledSpotifyButton>
            </StyledNowPlayingSide>
          </StyledSpotifyWrapper>
        </StyledSpotifyContainer>
      </>
    )
  }
}

export default SpotifyPlayer
