import React from "react";
import { fetchTopArtistsLongTerm } from "../data/spotifyAPI";

const TopArtists = ({ access_token }) => {
  return (
    <>
      <main>
        <div className="w-screen flex justify-center items-center text-2xl">
          <h1 className="pt-8 font-medium">Top Artists</h1>
        </div>
        <div className="pt-8">
          <ul className="flex justify-evenly">
            <li>All Time</li>
            <li>Last 6 months</li>
            <li>Last 4 weeks</li>
          </ul>
        </div>
      </main>
    </>
  );
};

export default TopArtists;
