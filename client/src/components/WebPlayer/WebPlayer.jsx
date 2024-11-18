import React, { useEffect, useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

export const WebPlayer = ({ token: accessToken, songId }) => {
  if (!accessToken || !songId) return null;

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 ">
      <SpotifyPlayer
        token={accessToken}
        uris={[`spotify:track:${songId}`]}
        play={true}
      />
    </div>
  );
};

export default WebPlayer;
