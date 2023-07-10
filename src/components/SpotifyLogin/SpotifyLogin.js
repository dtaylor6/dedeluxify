import React from 'react';

const SpotifyLogin = () => {
  const url = PRODUCTION
    ? 'https://dedeluxify-backend.onrender.com/api/spotify/login'
    : 'http://localhost:3003/api/spotify/login';

  return (
    <div className="App">
      <header className="App-header">
        <a href={url} >
          Login with Spotify
        </a>
      </header>
    </div>
  );
};

export default SpotifyLogin;
