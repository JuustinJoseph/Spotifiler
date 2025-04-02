import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import Sidebar from "./components/Sidebar";
import TopArtists from "./pages/TopArtists";
import TopTracks from "./pages/TopTracks";
import Recent from "./pages/Recent";
import Playlists from "./pages/Playlists";
import Login from "./Login";
import UseAuth from "./UseAuth";

const App = () => {
  const access_token = UseAuth();

  return (
    <BrowserRouter>
      {!access_token ? (
        <Login />
      ) : (
        <>
          <Sidebar />
          <div className="md:ml-[100px] md:mr-[80px] md:mb-[20px] mb-[80px]">
            <Routes>
              <Route
                path="/"
                element={<ProfilePage access_token={access_token} />}
              />
              <Route
                path="/artists"
                element={<TopArtists access_token={access_token} />}
              />
              <Route
                path="/tracks"
                element={<TopTracks access_token={access_token} />}
              />
              <Route
                path="/recent"
                element={<Recent access_token={access_token} />}
              />
              <Route
                path="/playlists"
                element={<Playlists access_token={access_token} />}
              />
            </Routes>
          </div>
        </>
      )}
    </BrowserRouter>
  );
};

export default App;
