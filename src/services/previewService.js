import previewAlbums from './previewAlbums';

const SearchPreview = () => {
  return previewAlbums;
};

const PlayPreview = (uri) => {
  const preferences = GetPreferencePreview(uri);
  const album = [];

  // Add track to playback if play is set to true
  preferences.data.forEach(track => {
    if (track.play) {
      album.push(track.trackObj);
    }
  });

  const customEvent = new CustomEvent('play', {
    detail: { album }
  });
  document.dispatchEvent(customEvent);
};

const QueuePreview = (uri) => {
  return PlayPreview(uri);
};

const GetPreferencePreview = (uri) => {
  const preferences = { data: [] };
  const prefString = JSON.parse(window.localStorage.getItem('album' + uri));

  // Map locally stored string to array of tracks with playback preference
  if (prefString !== null) {
    preferences['data'] = previewAlbums[uri-1].tracks.map((track, index) => {
      return({
        name: track.name,
        uri: track.uri,
        play: (prefString[index] === '1') ? true : false,
        trackObj: track
      });
    });
  }
  else {
    preferences['data'] = previewAlbums[uri-1].tracks.map((track) => {
      return({
        name: track.name,
        uri: track.uri,
        play: true,
        trackObj: track
      });
    });
  }

  return preferences;
};

const SetPreferencePreview = (uri, preferences) => {
  window.localStorage.setItem('album' + uri, JSON.stringify(preferences));
};

const DeletePreferencePreview = (uri) => {
  window.localStorage.removeItem('album' + uri);
};

export {
  SearchPreview,
  PlayPreview,
  QueuePreview,
  GetPreferencePreview,
  SetPreferencePreview,
  DeletePreferencePreview
};
