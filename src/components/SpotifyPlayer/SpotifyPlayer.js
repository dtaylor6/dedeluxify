import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { TransferPlayback } from '../../services/SpotifyPlaybackService';
import { Logout } from '../../services/SpotifyAuthService';
import {
  PlayerContainer,
  StyledTrackWrapper,
  StyledButtonWrapper,
  NowPlayingCover,
  NowPlayingSide,
  NowPlayingName,
  NowPlayingArtist,
  StyledTrackButton,
  StyledPlayButton,
  VolumeWrapper,
  StyledSlider
} from './SpotifyPlayer.style';

import NextIcon from '../../../images/next-button.svg';
import PreviousIcon from '../../../images/previous-button.svg';
import PlayIcon from '../../../images/play-button.svg';
import PauseIcon from '../../../images/pause-button.svg';
import VolumeIcon from '../../../images/volume-icon.svg';
import MuteIcon from '../../../images/mute-icon.svg';

const track = {
  name: '',
  album: {
    images: [
      { url: '' }
    ],
    name: ''
  },
  artists: [
    { name: '' }
  ]
};

const SpotifyPlayer = (props) => {
  const [isPaused, setPaused] = useState(false);
  const [isActive, setActive] = useState(false);
  const [player, setPlayer] = useState(undefined);
  const [currentTrack, setTrack] = useState(track);
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement('script');

    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Web Playback SDK',
        getOAuthToken: cb => { cb(props.access_token); },
        volume: 0.5
      });

      setPlayer(player);

      player.setName('Dedeluxify Player');

      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        TransferPlayback(device_id);
      });

      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      player.addListener('player_state_changed', ( state => {
        if (!state) {
          return;
        }

        setTrack(state.track_window.current_track);
        setPaused(state.paused);

        player.getCurrentState().then( state => {
          (!state)? setActive(false) : setActive(true);
        });
      }));

      player.on('authentication_error', ({ message }) => {
        console.error('Failed to authenticate:', message);
        Logout();
        navigate('/login');
      });

      player.connect();
    };

    // Clean up external script after this effect
    return () => {
      document.body.removeChild(script);
    };
  }, []);

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
        <VolumeContainer player={player} />
      </PlayerContainer>
    </>
  );
};

const TrackWrapper = (props) => {
  if (!props.isActive || !props.currentTrack) {
    return (
      <StyledTrackWrapper>
        <b>Loading player...</b>
      </StyledTrackWrapper>
    );
  }

  return (
    <StyledTrackWrapper>
      <NowPlayingCover src={props.currentTrack.album.images[0].url} alt="" />

      <NowPlayingSide>
        <NowPlayingName title={props.currentTrack.name}>
          {props.currentTrack.name}
        </NowPlayingName>
        <NowPlayingArtist title={`${props.currentTrack.artists[0].name} | ${props.currentTrack.album.name}`}>
          {props.currentTrack.artists[0].name} | {props.currentTrack.album.name}
        </NowPlayingArtist>
      </NowPlayingSide>
    </StyledTrackWrapper>
  );
};

const ButtonWrapper = (props) => {
  return (
    <StyledButtonWrapper>
      <PreviousButton onClick={() => { props.player.previousTrack(); }} />
      <PlayButton onClick={() => { props.player.togglePlay(); }} isPaused={props.isPaused} />
      <NextButton onClick={() => { props.player.nextTrack(); }} />
    </StyledButtonWrapper>
  );
};

const NextButton = (props) => {
  return (
    <StyledTrackButton onClick={props.onClick} title="Next">
      <NextIcon />
    </StyledTrackButton>
  );
};

const PreviousButton = (props) => {
  return (
    <StyledTrackButton onClick={props.onClick} title="Previous">
      <PreviousIcon />
    </StyledTrackButton>
  );
};

const PlayButton = (props) => {
  const title = props.isPaused ? 'Play' : 'Pause';

  return (
    <StyledPlayButton onClick={props.onClick} title={title}>
      { props.isPaused ? <PlayIcon /> : <PauseIcon /> }
    </StyledPlayButton>
  );
};

const VolumeContainer = (props) => {
  return(
    <VolumeWrapper>
      <VolumeIcon height="1.5rem" width="1.5rem" />
      <VolumeSlider player={props.player} />
    </VolumeWrapper>
  );
};

const VolumeSlider = (props) => {
  const [sliderVal, setSliderVal] = useState(50);
  const [volume, setVolume]  = useState(50);

  let isStale = false;
  const getPlayerVolume = async () => {
    if (props.player) {
      setVolume(sliderVal);
      await props.player.setVolume(sliderVal / 100);
      const currVolume = await props.player.getVolume();
      if (!isStale) {
        setVolume(currVolume * 100);
      }
    }
  };

  useEffect(() => {
    getPlayerVolume();
    return () => isStale = true; // Prevent promise race condition
  }, [sliderVal]);

  return(
    <StyledSlider
      type="range"
      min="0"
      max="100"
      value={volume}
      onChange={(event) => setSliderVal(event.target.value)}
    >
      {props.children}
    </StyledSlider>
  );
};

export default SpotifyPlayer;
