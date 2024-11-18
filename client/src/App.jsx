import { useEffect, useState } from "react";
import "./index.css";
import { Login } from "./Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Navbar } from "./pages/Navbar";
import { ErrorPage } from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import { TopArtistsPage } from "./pages/TopArtistsPage";
import { TopSongsPage } from "./pages/TopSongsPage";
import { TokenProvider } from "./ults/tokenProvider";
function App() {
  // const logout = () => {
  //   setToken("");
  //   window.localStorage.removeItem("token");
  // };const urlParams = new URLSearchParams(window.location.search);
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [expirersTime, setexpiresTime] = useState("");

  const [filterValue, setFilterValue] = useState("short_term");

  useEffect(() => {
    // Check if the URL contains access_token and refresh_token
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("access_token");
    const refreshToken = urlParams.get("refresh_token");
    const expiresIn = urlParams.get("expires_in");

    if (accessToken) {
      // Save tokens to state or localStorage
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setexpiresTime(expiresIn);
    }
  }, []);

  const logOut = () => {
    setAccessToken("");
    setRefreshToken("");
    setexpiresTime("");
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar logOut={logOut} />,
      errorElement: <ErrorPage />,

      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/top-artists",
          element: <TopArtistsPage />,
        },
        {
          path: "/top-songs",
          element: <TopSongsPage />,
        },
      ],
    },
  ]);

  return (
    <div>
      {!accessToken && (
        <div className="text-white">
          <Login />
        </div>
      )}

      {accessToken && (
        <TokenProvider token={accessToken}>
          <RouterProvider router={router} />
        </TokenProvider>
      )}
    </div>
  );
}

export default App;
