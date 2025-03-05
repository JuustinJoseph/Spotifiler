import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const ProfilePage = ({ access_token }) => {
  const [profile, setProfile] = useState(null);
  const [following, setFollowing] = useState(null);

  useEffect(() => {
    if (!access_token) {
      return;
    }

    axios
      .get("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch profile:", err);
      });
  }, [access_token]);

  useEffect(() => {
    if (!access_token) {
      return;
    }

    axios
      .get("https://api.spotify.com/v1/me/following?type=artist", {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((res) => {
        setFollowing(res.data.artists.total);
      })
      .catch((err) => {
        console.error("Failed to fetch following artists:", err);
      });
  }, [access_token]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center mt-20 gap-4">
      <img
        src={profile.images[0]?.url}
        alt="Profile"
        className="w-[150px] rounded-[5rem]"
      />
      <h1>{profile.display_name}</h1>
      <div className="flex gap-4">
        <p>Followers: {profile.followers.total}</p>
        <p>Following: {following}</p>
      </div>
      <button>Logout</button>
    </div>
  );
};

export default ProfilePage;
