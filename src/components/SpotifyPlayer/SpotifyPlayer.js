import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { TransferPlayback } from '../../services/SpotifyPlaybackService';
import { GetPreview, Logout } from '../../services/SpotifyAuthService';
import PreviewPlayer from './PreviewPlayer';
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
  StyledSlider,
  StyledVolumeButton
} from './SpotifyPlayer.style';

import NextIcon from '../../../images/next-button.svg';
import PreviousIcon from '../../../images/previous-button.svg';
import PlayIcon from '../../../images/play-button.svg';
import PauseIcon from '../../../images/pause-button.svg';
import VolumeIcon from '../../../images/volume-icon.svg';
import MuteIcon from '../../../images/mute-icon.svg';

const INIT_VOLUME = 50;

const track = {
  name: 'Track',
  album: {
    images: [
      { url: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Redsquare.png' }
    ],
    name: ' A Album'
  },
  artists: [
    { name: 'Artist 1' }
  ]
};

const SpotifyPlayer = (props) => {
  const [isPaused, setPaused] = useState(false);
  const [isActive, setActive] = useState(false);
  const [player, setPlayer] = useState(undefined);
  const [currentTrack, setTrack] = useState(track);
  const navigate = useNavigate();

  useEffect(() => {
    if (GetPreview()) {
      // Use fake player without Spotify or database integration
      console.log('Preview Mode');
      const previewPlayer = new PreviewPlayer(setPaused, setTrack);
      setPlayer(previewPlayer);
      setActive(true);

      const fakeAlbum = [];
      for (let i = 1; i <= 10; i +=1) {
        const newTrack = structuredClone(track);
        newTrack['name'] = newTrack['name'] + ' ' + i;
        fakeAlbum.push(newTrack);
      }
      previewPlayer.setAlbum(fakeAlbum);
    }
    else {
      const script = document.createElement('script');

      script.src = 'https://sdk.scdn.co/spotify-player.js';
      script.async = true;

      document.body.appendChild(script);

      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new window.Spotify.Player({
          name: 'Web Playback SDK',
          getOAuthToken: cb => { cb(props.access_token); },
          volume: (INIT_VOLUME / 100)
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
    }
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
  const [isMuted, setIsMuted] = useState(false);
  const [sliderVal, setSliderVal] = useState(INIT_VOLUME);

  // Saves previous volume when toggling mute
  const volRef = useRef(INIT_VOLUME);

  const clickFunc = () => {
    setIsMuted(!isMuted);
    if (!isMuted) {
      setSliderVal(0);
    }
    else {
      setSliderVal(volRef.current);
    }
  };

  useEffect(() => {
    if (!isMuted) {
      volRef.current = sliderVal;
    }
  }, [sliderVal]);

  return(
    <VolumeWrapper>
      <VolumeButton isMuted={isMuted} onClick={clickFunc} />
      <VolumeSlider
        player={props.player}
        sliderVal={sliderVal}
        setSliderVal={setSliderVal}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
      />
    </VolumeWrapper>
  );
};

const VolumeSlider = (props) => {
  let isStale = false;
  const getPlayerVolume = async () => {
    if (props.player) {
      await props.player.setVolume(props.sliderVal / 100);
      const currVolume = await props.player.getVolume();
      if (!isStale) {
        props.setSliderVal(currVolume * 100);
      }
    }
  };

  useEffect(() => {
    getPlayerVolume();
    return () => isStale = true; // Prevent promise race condition
  }, [props.sliderVal]);

  const changeFunc = (event) => {
    // Unmute whenever the slider is changed
    props.setIsMuted(false);
    props.setSliderVal(event.target.value);
  };

  return(
    <StyledSlider
      type="range"
      min="0"
      max="100"
      title="Volume"
      value={props.sliderVal}
      onChange={changeFunc}
    >
      {props.children}
    </StyledSlider>
  );
};

const VolumeButton = (props) => {
  const title = props.isMuted ? 'Unmute' : 'Mute';

  return (
    <StyledVolumeButton onClick={props.onClick} title={title}>
      { props.isMuted
        ? <MuteIcon height="1.5rem" width="1.5rem" />
        : <VolumeIcon height="1.5rem" width="1.5rem"/>
      }
    </StyledVolumeButton>
  );
};

export default SpotifyPlayer;
