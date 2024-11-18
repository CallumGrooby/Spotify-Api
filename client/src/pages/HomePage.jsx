import React, { useState } from "react";
import { useToken } from "../ults/tokenProvider";

import ProfileData from "../components/profileData/userProfile/UserProfile";
import TopArtists from "../components/profileData/topArtists/TopArtists";
import TopSongs from "../components/profileData/topSongs/TopSongs";
import Filters from "../components/FilterOptions/options";
import WebPlayer from "../components/WebPlayer/WebPlayer";

export default function HomePage() {
  const accessToken = useToken();
  const [filterValue, setFilterValue] = useState("short_term");

  return (
    <section className="container mx-auto text-white">
      <section className="px-4 md:px-20">
        <ProfileData token={accessToken} />
        <Filters filterValue={filterValue} setFilterValue={setFilterValue} />

        <section className="container mx-auto flex flex-col lg:flex-row gap-16 justify-between">
          <TopArtists token={accessToken} filterOption={filterValue} />
          <TopSongs
            token={accessToken}
            filterOption={filterValue}
            hasNavButton={true}
          />
        </section>
      </section>
    </section>
  );
}
