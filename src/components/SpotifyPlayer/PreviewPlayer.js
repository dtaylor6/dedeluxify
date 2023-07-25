class PreviewPlayer {
  constructor(setPaused, setTrack) {
    this.setPaused = setPaused;
    this.setTrack = setTrack;
    this.paused = false;
    this.volume = 0.5;
    this.trackNum = 1;
    this.album = undefined;
  }

  previousTrack() {
    if (this.album) {
      this.trackNum = (this.trackNum > 1)? (this.trackNum-1) : this.album.length;
      this.setTrack(this.album[this.trackNum-1]);

      this.paused = false;
      this.setPaused(false);
    }
  }

  nextTrack() {
    if (this.album) {
      this.trackNum = (this.trackNum < this.album.length)? (this.trackNum+1) : 1;
      this.setTrack(this.album[this.trackNum-1]);

      this.paused = false;
      this.setPaused(false);
    }
  }

  togglePlay() {
    this.paused = !this.paused;
    this.setPaused(this.paused);
  }

  setVolume(volume) {
    this.volume = volume;
  }

  getVolume() {
    return this.volume;
  }

  setAlbum(album) {
    if (Array.isArray(album) && album.length > 0) {
      this.album = album;
      this.trackNum = 1;
      this.setTrack(this.album[this.trackNum-1]);

      this.paused = false;
      this.setPaused(false);
    }
  }
}

export default PreviewPlayer;