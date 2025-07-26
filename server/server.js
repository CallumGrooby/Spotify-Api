require("dotenv").config();
const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");

const app = express();
const port = 3050;

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: "http://localhost:3050/callback",
});

app.get("/login", (req, res) => {
  const scopes = [
    "user-read-private",
    "user-read-email",
    "user-follow-read",
    "playlist-read-private",
    "playlist-read-collaborative",
    "user-top-read",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "streaming",
  ];

  res.redirect(spotifyApi.createAuthorizeURL(scopes, null, true));
});

spotifyApi.authorizationCodeGrant(code).then((data) => {
  const accessToken = data.body.access_token;
  const refreshToken = data.body.refresh_token;
  const expiresIn = data.body.expires_in;
  const scope = data.body.scope; // ← log this

  console.log("Granted scopes:", scope);

  res.redirect(
    `http://localhost:5173?access_token=${accessToken}&refresh_token=${refreshToken}&expires_in=${expiresIn}`
  );
});

app.get("/search", (req, res) => {
  // Extract the search query parameter.
  const { q } = req.query;

  // Make a call to Spotify's search API with the provided query.
  spotifyApi
    .searchTracks(q)
    .then((searchData) => {
      // Extract the URI of the first track from the search results.
      const trackUri = searchData.body.tracks.items[0].uri;
      // Send the track URI back to the client.
      res.send({ uri: trackUri });
    })
    .catch((err) => {
      console.error("Search Error:", err);
      res.send("Error occurred during search");
    });
});

app.get("/play", (req, res) => {
  // Extract the track URI from the query parameters.
  const { uri } = req.query;

  // Send a request to Spotify to start playback of the track with the given URI.
  spotifyApi
    .play({ uris: [uri] })
    .then(() => {
      res.send("Playback started");
    })
    .catch((err) => {
      console.error("Play Error:", err);
      res.send("Error occurred during playback");
    });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
