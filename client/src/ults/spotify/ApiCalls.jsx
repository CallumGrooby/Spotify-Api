import axios from "axios";
import React, { useState } from "react";

export const logout = () => {
  window.localStorage.removeItem("token");
};
// API Calls

// User Data--------------------------------------------------------------------------------------------
export const fetchUserData = async (token) => {
  const userData = await axios.get("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return userData;
};

export const fetchUserFollowingData = async (token) => {
  const followData = await axios.get(
    "https://api.spotify.com/v1/me/following?type=artist",
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return followData;
};

export const fetchUserPlaylistData = async (token) => {
  const playlistData = await axios.get(
    "https://api.spotify.com/v1/me/playlists",
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return playlistData;
};

export const combineUserData = async (token) => {
  console.log("Combining user data", token);
  const userData = await axios
    .all([
      fetchUserData(token),
      fetchUserFollowingData(token),
      fetchUserPlaylistData(token),
    ])
    .then(
      axios.spread((user, followedArtists, playlists) => ({
        user: user.data,
        followedArtists: followedArtists.data,
        playlists: playlists.data,
      }))
    );

  return userData;
};

// Top Artists ----------------------------------------------------------------------------------------

export const fetchTopArtists = async (token, filterOption) => {
  const topArtistsData = await axios.get(
    `https://api.spotify.com/v1/me/top/artists?limit=50&time_range=${filterOption}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return topArtistsData;
};

export const fetchTopSongs = async (token, filterOption) => {
  const topSongsData = await axios.get(
    `https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=${filterOption}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  console.log(topSongsData);
  return topSongsData;
};

export const fetchArtistTopTracks = async (token, artistId) => {
  const artistTopTrackData = await axios.get(
    `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=UK?limit=3`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return artistTopTrackData;
};
