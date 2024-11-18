import React, { useEffect, useState } from "react";
import { motion, delay, transform, easeIn } from "motion/react";
import { fetchTopSongs } from "../../../ults/spotify/ApiCalls";
import playIcon from "../../../assets/playIcon.png";
import WebPlayer from "../../WebPlayer/WebPlayer";
import { NavLink } from "react-router-dom";
import { LoadingBar } from "../../LoadingBar/LoadingBar";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, transform: "translateX(+100px)" },
  show: { opacity: 1, transform: "translateX(0px)" },
  transition: { type: "spring", ease: "easeOut" },
};

//  initial={{ transform: "translateX(+100px)" }}
//                 animate={{ transform: "translateX(0px)" }}
//                 transition={{ type: "spring" }}

export const TopSongs = ({ token, filterOption, hasNavButton = false }) => {
  const [songData, setSongs] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      setLoading(true);
      try {
        const data = await fetchTopSongs(token, filterOption); // Await the result of the async function
        setSongs(data.data);
        console.log("Fetched Songs Data ...", data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, [token, filterOption]);

  const millisecondsToSeconds = (milliSeconds) => {
    var minutes = Math.floor(milliSeconds / 60000);
    var seconds = ((milliSeconds % 60000) / 1000).toFixed(0);

    return seconds == 60
      ? minutes + 1 + ":00"
      : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  return (
    <section className="lg:basis-1/2 mb-32">
      {/* Header */}
      {hasNavButton && (
        <header className="flex flex-row justify-between items-center">
          <h1 className="text-green-600 text-3xl mb-4">Top Tracks</h1>

          <NavLink
            className="border-[1px] rounded-full px-8 py-2 text-base text-[#535353] border-[#535353] font-semibold hover:text-green-700 hover:border-green-700 text-center"
            to={"/top-songs"}
          >
            View More
          </NavLink>
        </header>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center text-white text-2xl">
          <LoadingBar />
        </div>
      ) : (
        // List of Songs
        <motion.div
          className="flex flex-col gap-2 mt-4 "
          variants={container}
          initial="hidden"
          animate="show"
        >
          {songData &&
            songData.items.map((songInfo, index) => (
              <motion.div
                variants={item}
                key={index}
                className="flex flex-row gap-8 justify-between items-center"
              >
                {/* Song Information */}
                <article className="flex flex-row gap-2 items-center">
                  <SongImage
                    songInfo={songInfo}
                    setSelectedSong={setSelectedSong}
                  />

                  {/* Album Information */}
                  <div className="flex flex-col gap-2 text-white text-sm lg:text-2xl">
                    <h1 className="text-xl lg:text-2xl">
                      {songInfo.name.replace(/\s*\(.*?\)\s*/g, "")}
                    </h1>
                    <div className="flex flex-col sm:flex-row gap-1 text-lg text-[#535353]">
                      <h2>{songInfo.album.artists[0].name}</h2>
                      <h2 className="hidden sm:block">◆</h2>
                      <h2>{songInfo.album.name}</h2>
                    </div>
                  </div>
                </article>

                {/* Song Duration */}
                <div>
                  <h1 className="text-white text-base lg:text-lg sm:block hidden">
                    {millisecondsToSeconds(songInfo.duration_ms)}
                  </h1>
                </div>
              </motion.div>
            ))}
        </motion.div>
      )}

      <WebPlayer token={token} songId={selectedSong} />
    </section>
  );
};

const SongImage = ({ songInfo, setSelectedSong }) => {
  const changeSelectedSong = (songId) => {
    setSelectedSong(songId);
  };

  return (
    <>
      <div className="group relative max-w-20 max-h-20 lg:max-w-32 lg:max-h-32 w-full h-full rounded-md">
        <img
          className="w-full h-full object-cover rounded-md"
          src={songInfo.album.images[0].url}
          alt={`${songInfo.name.replace(/\s*\(.*?\)\s*/g, "")} by ${
            songInfo.album.artists[0].name
          } cover art`}
        />

        <button
          className="group-hover:flex hidden bg-white bg-opacity-50 w-full h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center items-center"
          onClick={() => {
            changeSelectedSong(songInfo.id);
          }}
        >
          <img
            className="w-11 h-11 object-cover rounded-md"
            src={playIcon}
            alt={`Play button`}
          />
        </button>
      </div>
    </>
  );
};

export default TopSongs;
