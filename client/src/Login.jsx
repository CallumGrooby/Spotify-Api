import React from "react";

export const Login = () => {
  const handleLogin = () => {
    window.location.href =
      // "https://nodejs-serverless-function-express-eight-zeta.vercel.app/login"
      "http://localhost:3050/login"; // Redirect to Spotify login
  };

  return (
    <div className="flex justify-center items-center h-svh">
      <button
        className="flex justify-center items-center"
        onClick={handleLogin}
      >
        Log in with Spotify
      </button>
    </div>
  );
};
