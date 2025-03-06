import { React, useEffect, useState } from "react";
import { fetchTopTracksShortTerm } from "../data/spotifyAPI";

const TopTracks = ({ access_token }) => {
  const [topTracks, setTopTracks] = useState(null);

  useEffect(() => {
    if (!access_token) {
      return;
    }
    const fetchData = async () => {
      const top_tracks = await fetchTopTracksShortTerm(access_token);
      setTopTracks(top_tracks);
      console.log(top_tracks);
    };
    fetchData();
  }, [access_token]);
  return (
    <div className="flex flex-col px-4 gap-4 ">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold">Your Top Tracks</h2>
        <button className="border-1 px-6 py-2 rounded-[3rem] uppercase text-[0.85rem] font-light tracking-[1px] hover:bg-amber-50 hover:text-black transition duration-350">
          See more
        </button>
      </div>
      <ul>
        {topTracks &&
          topTracks.slice(0, 10).map((track) => (
            <li
              key={track.id}
              className="grid grid-cols-[1fr_2fr] items-center py-2 justify-items-start"
            >
              <a href={track.external_urls.spotify} target="_blank">
                <img
                  src={track.album.images[1]?.url}
                  alt={track.name}
                  className="w-[69px] h-[69px] rounded-[5px]"
                />
              </a>
              <a
                href={track.external_urls.spotify}
                target="_blank"
                className="font-light tracking-[0.5px] text-[0.85rem] justify-items-start"
              >
                <p className=" hover:underline transition duration-350">
                  {track.name}
                </p>
                <span className="text-gray-500 text-[0.75rem]">
                  {track.artists.map((artist) => artist.name).join(", ")} ⋅{" "}
                  {track.album.name}
                </span>
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TopTracks;
