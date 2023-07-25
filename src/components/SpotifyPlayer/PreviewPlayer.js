class PreviewPlayer {
  constructor(track, setPaused) {
    this.track = track;
    this.setPaused = setPaused;
    this.paused = false;
    this.volume = 0.5;
  }

  previousTrack() {
    console.log('PrevTrack');
  }

  nextTrack() {
    console.log('NextTrack');
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
}

export default PreviewPlayer;