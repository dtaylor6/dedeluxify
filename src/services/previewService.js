import previewAlbums from './previewAlbums';

const SearchPreview = () => {
  return previewAlbums;
};

const PlayPreview = (uri) => {
  const customEvent = new CustomEvent('play', {
    detail: {
      album: previewAlbums[uri-1].tracks
    }
  });
  document.dispatchEvent(customEvent);
};

const QueuePreview = (uri) => {
  return PlayPreview(uri);
};

const GetPreferencePreview = (uri) => {
  const preferences = { data: [] };
  const prefString = JSON.parse(window.localStorage.getItem('album' + uri));

  if (prefString !== null) {
    preferences['data'] = previewAlbums[uri-1].tracks.map((track, index) => {
      return({
        name: track.name,
        uri: track.uri,
        play: (prefString[index] === '1') ? true : false
      });
    });
  }
  else {
    preferences['data'] = previewAlbums[uri-1].tracks.map((track) => {
      return({
        name: track.name,
        uri: track.uri,
        play: true
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
