import React, { useEffect, useState } from "react";
import { useToken } from "../ults/tokenProvider";
import Filters from "../components/FilterOptions/options";
import {
  fetchArtistTopTracks,
  fetchTopArtists,
} from "../ults/spotify/ApiCalls";
import { useExtractColors } from "react-extract-colors";

export const TopArtistsPage = () => {
  const accessToken = useToken();
  const [filterValue, setFilterValue] = useState("short_term");

  return (
    <>
      <section className="container mx-auto md:px-24 px-2  ">
        <div>
          <h1 className="text-green-600 text-3xl mb-4">Top Artists</h1>
          <Filters filterValue={filterValue} setFilterValue={setFilterValue} />
        </div>

        <Artists token={accessToken} filterOption={filterValue} />
      </section>
    </>
  );
};

const Artists = ({ token, filterOption }) => {
  const [artistsData, setArtists] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get top artists
        const usersTopArtists = await fetchTopArtists(token, filterOption);
        // Get top songs for each artist
        const getArtistsSongs = async () => {
          const ArrayOfArtistsWithTopSongs = await Promise.all(
            usersTopArtists.data.items.map(async (artistsData) => {
              const songsResponse = await fetchArtistTopTracks(
                token,
                artistsData.id
              );
              return {
                ...artistsData,
                topSongs: songsResponse.data.tracks.slice(0, 3), // Add top songs to each artist
              };
            })
          );
          return ArrayOfArtistsWithTopSongs;
        };

        const artistsSongsData = await getArtistsSongs();
        setArtists(artistsSongsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [token, filterOption]);

  return (
    <section className="flex flex-col gap-4">
      {artistsData &&
        artistsData.map((artistData, index) => (
          <ArtistDisplay key={index} data={artistData} />
        ))}
    </section>
  );
};

const ArtistDisplay = ({ data: artistData }) => {
  const { colors } = useExtractColors(artistData.images[0].url, {
    maxColors: 2,
    format: "hex",
    maxSize: 200,
    orderBy: "vibrance",
  });

  const [color1, color2] = colors;

  return (
    <article
      style={{ background: `linear-gradient(to bottom, #282828, ${color2})` }}
      className={`flex flex-col px-4 sm:px-12 py-4 gap-4 sm:flex-row rounded-lg items-center min-h-[424px] h-fit max-h-max`}
    >
      {/* bg-gradient-to-b from-[#282828] to-[#b1242421] */}
      {/* Artist Data */}
      <section className="basis-1/5 flex flex-col gap-2 justify-center">
        <div className="w-56 h-56 rounded-2xl">
          <img
            className="w-full h-full object-cover rounded-2xl"
            src={artistData.images[0].url}
            alt={`${artistData.name}'s spotify profile picture`}
          />
        </div>
        <h1 className="text-white w-full overflow-hidden whitespace-nowrap text-2xl font-semibold max-w-[300px]">
          {artistData.name}
        </h1>
        <div className="flex flex-col gap-2 capitalize">
          <h2 className="text-white text-lg">
            <span className="text-green-600">
              {Number(artistData.followers.total)}
            </span>
            {" Followers"}
          </h2>
        </div>
      </section>

      {/* Top Songs Info */}
      <section className="w-full flex flex-col gap-2 xl:flex-row items-start basis-4/5 justify-center max-h-72">
        {artistData.topSongs.map((songData, index) => (
          <article
            key={index}
            className="flex flex-row xl:flex-col gap-2 items-center  basis-4/12 xl:max-w-[210px]"
          >
            <div className="max-w-20 max-h-20 lg:max-w-32 lg:max-h-32 w-full h-full rounded-md">
              <img
                className="w-full h-full object-cover rounded-md"
                src={songData.album.images[0].url}
                alt={`${songData.name} by ${songData.album.artists[0].name} cover art`}
              />
            </div>

            <div className="flex flex-col gap-2 text-white text-sm lg:text-2xl">
              <h1 className="text-xl lg:text-2xl xl:text-center">
                {songData.name.replace(/\s*\(.*?\)\s*/g, "")}
              </h1>
              <div className="flex flex-row xl:flex-col xl:items-center xl:gap-0 gap-1 text-lg text-white sm:text-center mix-blend-overlay">
                <h2>{songData.album.name.replace(/\s*\(.*?\)\s*/g, "")}</h2>
              </div>
            </div>
          </article>
        ))}
      </section>
    </article>
  );
};
