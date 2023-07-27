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
  return window.localStorage.getItem('album' + uri);
};

const SetPreferencePreview = (uri, preferences) => {
  window.localStorage.setItem('album' + uri, JSON.stringify(preferences));
};

export {
  SearchPreview,
  PlayPreview,
  QueuePreview
};
