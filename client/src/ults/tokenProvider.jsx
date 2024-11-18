import React, { createContext, useContext } from "react";

const TokenContext = createContext();

export const TokenProvider = ({ children, token }) => {
  return (
    <TokenContext.Provider value={token}>{children}</TokenContext.Provider>
  );
};

export const useToken = () => {
  return useContext(TokenContext);
};
