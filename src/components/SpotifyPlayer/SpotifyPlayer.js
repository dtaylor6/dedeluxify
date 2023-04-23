import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { TransferPlayback } from '../../services/SpotifyPlaybackService'
import { ClearToken } from '../../services/SpotifyAuthService'
import {
  PlayerContainer,
  StyledTrackWrapper,
  StyledButtonWrapper,
  NowPlayingCover,
  NowPlayingSide,
  NowPlayingName,
  NowPlayingArtist,
  StyledTrackButton,
  StyledPlayButton
} from './SpotifyPlayer.style'
import NextIcon from '../../../images/next-button.svg'
import PreviousIcon from '../../../images/previous-button.svg'
import PlayIcon from '../../../images/play-button.svg'
import PauseIcon from '../../../images/pause-button.svg'

const track = {
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
        ClearToken()
        navigate('/login')
      })

      player.connect()
    }

    // Clean up external script after this effect
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <>
      <PlayerContainer>
        <TrackWrapper
          isPaused={isPaused}
          isActive={isActive}
          player={player}
          currentTrack={currentTrack}
        />
        <ButtonWrapper
          isPaused={isPaused}
          isActive={isActive}
          player={player}
        />
      </PlayerContainer>
    </>
  )
}

const TrackWrapper = (props) => {
  if (!props.isActive) {
    return (
      <StyledTrackWrapper>
        <b>Loading player...</b>
      </StyledTrackWrapper>
    )
  }

  return (
    <StyledTrackWrapper>
      <NowPlayingCover src={props.currentTrack.album.images[0].url} alt="" />

      <NowPlayingSide>
        <NowPlayingName>{props.currentTrack.name}</NowPlayingName>
        <NowPlayingArtist>{props.currentTrack.artists[0].name}</NowPlayingArtist>
      </NowPlayingSide>
    </StyledTrackWrapper>
  )
}

const ButtonWrapper = (props) => {
  return (
    <StyledButtonWrapper>
      <PreviousButton onClick={() => { props.player.previousTrack() }} />
      <PlayButton onClick={() => { props.player.togglePlay() }} isPaused={props.isPaused} />
      <NextButton onClick={() => { props.player.nextTrack() }} />
    </StyledButtonWrapper>
  )
}

const NextButton = (props) => {
  return (
    <StyledTrackButton onClick={props.onClick}>
      <NextIcon />
    </StyledTrackButton>
  )
}

const PreviousButton = (props) => {
  return (
    <StyledTrackButton onClick={props.onClick}>
      <PreviousIcon />
    </StyledTrackButton>
  )
}

const PlayButton = (props) => {
  return (
    <StyledPlayButton onClick={props.onClick}>
      { props.isPaused ? <PlayIcon /> : <PauseIcon /> }
    </StyledPlayButton>
  )
}

export default SpotifyPlayer
