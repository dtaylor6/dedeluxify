<div align="center">

![logo](https://github.com/dtaylor6/dedeluxify/assets/57015811/22a23ecc-71b2-4545-8af1-a4ad6b9ea744)

</div>

This repository contains the codebase for the dedeluxify React app. The source code for the backend Express app can be found [here](https://github.com/dtaylor6/dedeluxify-backend).

## About

Dedeluxify is a Spotify webplayer that excludes extraneous tracks from album playback. Extraneous tracks are tracks that were not originally part of an album's initial release, such as demos, outtakes, and live versions. Often, these tracks are tacked on to the end of a deluxe or remastered album release. When the original album isn't uploaded to Spotify, a listener stuck with the rerelease has to manually skip through extra tracks when playing an album. In some cases, the extra tracks may even double an album's length. By referencing the Discogs master releases, dedeluxify only queues the original tracks during album playback. Additionally, a user can set their own preferences to decide what tracks are played in an album. For instance, a listener may always want to skip a particular song. This allows a Spotify user to customize playback without filling their playlist section with albums. Ultimately, dedeluxify aims to declutter music streaming. 

### Demo (Click GIF to enlarge)

![demo](https://github.com/dtaylor6/dedeluxify/assets/57015811/ec2e8740-0aaa-4b75-a3ab-91bb361b3856)

The only version of The Byrd's 1966 album "Fifth Dimension" available on Spotify includes 6 bonus tracks. By referencing the Discogs master release, dedeluxify automatically excludes these extra tracks from queue. Finally, track preferences are set so that album playback always skips to the third track "Mr. Spaceman"

### Note

Spotify integration is currently in [development mode](https://developer.spotify.com/documentation/web-api/concepts/quota-modes). Users that wish to log in with their Spotify account must be added to the app's allowlist. If you wish to be added, send your first name and the email associated with your Spotify premium account to dedeluxify@gmail.com. Alternatively, a preview mode is available so that user's may demo the website without signing into Spotify.

### Technologies

Full-stack JavaScript: Powered by Node.js

Postgres: Data storage for saved user preferences

Express: Backend Express app with RESTful API

Discogs API: Album master release metadata

Spotify Web API: Music playback, track metadata, and OAuth authentication

React: Frontend React app
