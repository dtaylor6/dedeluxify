import React, { useEffect, useState } from 'react'
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

export const SpotifyPlayer = (props) => {
  const [isPaused, setPaused] = useState(false)
  const [isActive, setActive] = useState(false)
  const [player, setPlayer] = useState(undefined)
  const [currentTrack, setTrack] = useState(track)

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
            <b> Instance not active. Transfer your playback using your Spotify app </b>
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
