import React from "react";

export const Login = () => {
  const handleLogin = () => {
    window.location.href =
      "https://nodejs-serverless-function-express-eight-zeta.vercel.app/login"; // Redirect to Spotify login
  };

  return <button onClick={handleLogin}>Log in with Spotify</button>;
};
