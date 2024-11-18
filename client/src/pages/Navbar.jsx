import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import artists from "../assets/icons8-micro-48.png";
import topSongs from "../assets/icons8-musical-note-48.png";
import home from "../assets/icons8-user-48.png";
import signInButton from "../assets/signInButton.png";

export const Navbar = ({ logOut: SignOut }) => {
  const links = [
    { text: "Home", to: "/", icon: home },
    { text: "Top Artists", to: "/top-artists", icon: artists },
    { text: "Top Songs", to: "/top-songs", icon: topSongs },
  ];

  const logOut = () => {
    SignOut();
  };

  return (
    <>
      {/* flex flex-row gap-4 text-white sticky top-0 justify-center lg:justify-start */}
      <nav
        className={`
        text-white h-full bg-[#2B2B2B] sticky top-0 flex justify-center items-center
        lg:fixed lg:top-1/2 lg:transform lg:-translate-y-1/2 
        z-50`}
      >
        <div className="flex flex-row lg:flex-col justify-center gap-1">
          {links.map((link, index) => {
            return (
              <NavLink
                key={index}
                className={
                  "group relative bg-[#2B2B2B] w-20 h-20 flex flex-col gap-1 justify-center items-center aspect-square p-1 focus:bg-green-600 overflow-hidden"
                }
                to={link.to}
              >
                <div className="w-8 h-8">
                  <img src={link.icon} alt="" />
                </div>
                <a className="text-sm">{link.text}</a>

                {/* <span className="absolute w-full bottom-0 block bg-green-600 h-1 hover:animate-slideInFromLeft "></span> */}
                <span className="absolute w-full bottom-0 block bg-green-600 h-1 transform -translate-x-full group-hover:translate-x-0 group-hover:animate-slideInFromLeft transition-all duration-75"></span>
              </NavLink>
            );
          })}

          <button
            className={
              "group relative bg-[#2B2B2B]  w-20 h-20 flex flex-col gap-1 justify-center items-center aspect-square p-1 focus:bg-green-600 overflow-hidden"
            }
            onClick={logOut}
          >
            <div className="w-8 h-8">
              <img src={signInButton} alt="" />
            </div>
            <a className="text-sm">{"Logout"}</a>

            {/* <span className="absolute w-full bottom-0 block bg-green-600 h-1 hover:animate-slideInFromLeft "></span> */}
            <span className="absolute w-full bottom-0 block bg-green-600 h-1 transform -translate-x-full group-hover:translate-x-0 group-hover:animate-slideInFromLeft transition-all duration-75"></span>
          </button>
        </div>
      </nav>

      <Outlet />
    </>
  );
};
