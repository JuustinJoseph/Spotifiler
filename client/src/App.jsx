import React from "react";
import ProfilePage from "./pages/ProfilePage";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
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
    <>
      {!access_token ? (
        <Login />
      ) : (
        <div>
          <Sidebar />
          <div className="md:ml-[100px] ">
            <Routes>
              <Route
                path="/"
                element={<ProfilePage access_token={access_token} />}
              />
              <Route path="/artists" element={<TopArtists />} />
              <Route path="/tracks" element={<TopTracks />} />
              <Route path="/recent" element={<Recent />} />
              <Route path="/playlists" element={<Playlists />} />
            </Routes>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
