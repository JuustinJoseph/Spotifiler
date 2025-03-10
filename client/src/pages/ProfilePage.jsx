import React from "react";
import { useEffect, useState } from "react";
import {
  fetchUserProfile,
  fetchFollowingArtists,
  fetchPlaylists,
} from "../data/spotifyAPI";
import TopArtists from "../components/TopArtists";
import TopTracks from "../components/TopTracks";
import Footer from "../components/Footer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";

const ProfilePage = ({ access_token }) => {
  const [profile, setProfile] = useState(null);
  const [following, setFollowing] = useState(null);
  const [playlists, setPlaylists] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/";
  };

  useEffect(() => {
    if (!access_token) {
      return;
    }

    const getData = async () => {
      const userProfile = await fetchUserProfile(access_token);
      const followingCount = await fetchFollowingArtists(access_token);
      const userPlaylists = await fetchPlaylists(access_token);

      setProfile(userProfile);
      setFollowing(followingCount);
      setPlaylists(userPlaylists);
    };

    getData();
  }, [access_token]);

  if (!profile || !following || !playlists) {
    return (
      <div className="flex justify-center items-center h-screen text-green-600 opacity-40 gap-4">
        <FontAwesomeIcon icon={faCirclePlay} size="4x" fade />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <header className="flex flex-col justify-center items-center mt-20 gap-8">
        <img
          src={profile.images[0]?.url}
          alt="Profile"
          className="w-[150px] rounded-[5rem]"
        />
        <h1 className="text-5xl font-medium">{profile.display_name}</h1>
        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <p className="text-[1.20rem] text-green-600 font-bold">
              {profile.followers.total}
            </p>
            <p className="uppercase text-[0.85rem] font-light text-gray-500 tracking-[1px]">
              Followers
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-[1.20rem] text-green-600 font-bold">
              {following}
            </p>
            <p className="uppercase text-[0.85rem] font-light text-gray-500 tracking-[1px]">
              Following
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-[1.20rem] text-green-600 font-bold">
              {playlists.total}
            </p>
            <p className="uppercase text-[0.85rem] font-light text-gray-500 tracking-[1px]">
              Playlists
            </p>
          </div>
        </div>
        <button
          className="border-1 px-6 py-2 rounded-[3rem] uppercase text-[0.85rem] font-light tracking-[1px] hover:bg-amber-50 hover:text-black transition duration-350 cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>
      <main className="mt-6 md:grid md:grid-cols-2 md:py-[3rem] md:px-[8rem] md:gap-8 font-extralight ">
        <TopArtists access_token={access_token} />
        <TopTracks access_token={access_token} />
      </main>
      <Footer />
    </>
  );
};

export default ProfilePage;
