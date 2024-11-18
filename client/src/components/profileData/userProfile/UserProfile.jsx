import React, { useEffect, useMemo, useState } from "react";
import { combineUserData } from "../../../ults/spotify/ApiCalls";

const blankProfileImage = (
  <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path d="M843.282963 870.115556c-8.438519-140.515556-104.296296-257.422222-233.908148-297.14963C687.881481 536.272593 742.4 456.533333 742.4 364.088889c0-127.241481-103.158519-230.4-230.4-230.4S281.6 236.847407 281.6 364.088889c0 92.444444 54.518519 172.183704 133.12 208.877037-129.611852 39.727407-225.46963 156.634074-233.908148 297.14963-0.663704 10.903704 7.964444 20.195556 18.962963 20.195556l0 0c9.955556 0 18.299259-7.774815 18.962963-17.73037C227.745185 718.506667 355.65037 596.385185 512 596.385185s284.254815 122.121481 293.357037 276.195556c0.568889 9.955556 8.912593 17.73037 18.962963 17.73037C835.318519 890.311111 843.946667 881.019259 843.282963 870.115556zM319.525926 364.088889c0-106.287407 86.186667-192.474074 192.474074-192.474074s192.474074 86.186667 192.474074 192.474074c0 106.287407-86.186667 192.474074-192.474074 192.474074S319.525926 470.376296 319.525926 364.088889z" />
  </svg>
);

const DataHolder = ({ digit, text }) => {
  return (
    <div className="flex flex-col gap-2 capitalize justify-center items-center">
      <h1 className="text-green-600 text-xl sm:text-3xl font-bold">{digit}</h1>
      <h2 className="text-white text-lg sm:text-2xl">{text}</h2>
    </div>
  );
};

const ProfileData = ({ token }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Memoize the fetched user data
  const memoizedUserData = useMemo(() => {
    if (!userData) return null;
    return userData;
  }, [userData]); // Calls only when userData changes

  useEffect(() => {
    getUserData();
  }, [token]);

  const getUserData = async () => {
    console.log("Token", token);
    if (!token) return;
    setLoading(true);

    try {
      if (!memoizedUserData) {
        const data = await combineUserData(token); // Await the result of the async function
        setUserData(data);
        console.log("Fetched User Data ...", data);
      } else {
        console.log("Using Memorized Data ...", memoizedUserData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const ProfileImage = () => {
    if (!userData) return;

    if (userData.user.images.length <= 0) return blankProfileImage;
    return userData.user.images[0];
  };

  return (
    <section className="container mx-auto">
      <header className="flex flex-col items-center gap-4">
        <div className="bg-white rounded-full max-w-48 w-full h-full max-h-48 p-1 mt-16">
          {ProfileImage()}
        </div>

        {userData && (
          <h1 className="text-white text-2xl sm:text-4xl">
            {userData.user.display_name}
          </h1>
        )}

        {userData && (
          <div className=" flex flex-row gap-4">
            {/* Creates a array of the values from the user data,
        and asigns a label to each, then maps through the 
        array and create a new element with the values from the array */}
            {[
              {
                value: userData.followedArtists.artists.total,
                label: "following",
              },
              { value: userData.user.followers.total, label: "followers" },
              { value: userData.playlists.total, label: "playlists" },
            ].map((item, index) => (
              <DataHolder key={index} digit={item.value} text={item.label} />
            ))}
          </div>
        )}
      </header>
    </section>
  );
};

export default ProfileData;
