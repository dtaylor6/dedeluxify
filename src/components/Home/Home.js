import React from 'react';
import { Navigate } from 'react-router-dom';

import SearchBar from '../SearchBar/SearchBar';
import SpotifyPlayer from '../../components/SpotifyPlayer/SpotifyPlayer';
import { GetToken } from '../../services/SpotifyAuthService';

const Home = () => {
  const token = GetToken();

  return (
    <>
      {(token !== '')?
        <HomePage access_token={token} />
        :<Navigate to="/login" replace={false} />
      }
    </>
  );
};

const HomePage = (props) => {
  return(
    <>
      <SearchBar />
      <SpotifyPlayer access_token={props.access_token} />
    </>
  );
};

export default Home;
