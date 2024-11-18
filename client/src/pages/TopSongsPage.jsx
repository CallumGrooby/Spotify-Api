import React, { useState } from "react";
import TopSongs from "../components/profileData/topSongs/TopSongs";
import { useToken } from "../ults/tokenProvider";
import Filters from "../components/FilterOptions/options";
import { LoadingBar } from "../components/LoadingBar/LoadingBar";

export const TopSongsPage = () => {
  const accessToken = useToken();
  const [filterValue, setFilterValue] = useState("short_term");

  return (
    <section className="container mx-auto md:px-24 px-2">
      <div>
        <h1 className="text-green-600 text-3xl mb-4">Top Songs</h1>
        <Filters filterValue={filterValue} setFilterValue={setFilterValue} />
      </div>

      <TopSongs token={accessToken} filterOption={filterValue} />
    </section>
  );
};
