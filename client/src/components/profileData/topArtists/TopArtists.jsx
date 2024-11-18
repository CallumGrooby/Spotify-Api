import React, { useEffect, useState } from "react";
import { fetchTopArtists } from "../../../ults/spotify/ApiCalls";
import { LoadingBar } from "../../LoadingBar/LoadingBar";
import { NavLink } from "react-router-dom";
import { motion } from "motion/react";

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
  hidden: { opacity: 0, transform: "translateX(-100px)" },
  show: { opacity: 1, transform: "translateX(0px)" },
  transition: { type: "spring", ease: "easeOut" },
};

export const TopArtists = ({ token, filterOption }) => {
  const [artistsData, setArtists] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      setLoading(true);
      try {
        const data = await fetchTopArtists(token, filterOption); // Await the result of the async function
        setArtists(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, [token, filterOption]);

  return (
    <section className="basis-1/2 w-full">
      <header className="flex flex-row justify-between items-center">
        <h1 className="text-green-600 text-3xl mb-4">Top Artists</h1>

        <NavLink
          to={"/top-artists"}
          className="border-[1px] rounded-full px-8 py-2 text-base text-[#535353] border-[#535353] font-semibold hover:text-green-700 hover:border-green-700 text-center"
        >
          View More
        </NavLink>
      </header>

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
          {artistsData &&
            artistsData.items.map((artistData, index) => (
              <motion.div
                variants={item} // Apply the item variants here
                key={index}
                className="flex flex-row gap-8"
              >
                <div className="max-w-20 max-h-20 lg:max-w-36 lg:max-h-36 w-full h-full rounded-full">
                  <img
                    className="w-full h-full object-cover rounded-full"
                    src={artistData.images[1].url}
                    alt={`${artistData.name} profile picture`}
                  />
                </div>

                <div className="flex flex-col gap-2 justify-center">
                  <h1 key={index} className="text-2xl lg:text-4xl">
                    {artistData.name}
                  </h1>
                  <div className="text-lg lg:text-2xl">
                    <h1>
                      Followers:{" "}
                      <span className="text-green-700 font-bold">
                        {artistData.followers.total}
                      </span>
                    </h1>
                  </div>
                </div>
              </motion.div>
            ))}
        </motion.div>
      )}
    </section>
  );
};

export default TopArtists;
