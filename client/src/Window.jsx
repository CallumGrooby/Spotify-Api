import React from "react";
import { useAuth } from "./ults/useAuth/useAuth";

export const Window = ({ code }) => {
  console.log("Window called with code: ", code);
  // const accessToken = useAuth(code);
  return (
    <div>{code}</div>
    // <div>{accessToken ? `Access Token: ${accessToken}` : "Loading..."}</div>
  );
};
