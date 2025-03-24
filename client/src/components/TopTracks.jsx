import { React, useEffect, useState } from "react";
import { fetchTopTracksLongTerm } from "../data/spotifyAPI";

const TopTracks = ({ access_token }) => {
  const [topTracks, setTopTracks] = useState(null);

  useEffect(() => {
    if (!access_token) {
      return;
    }
    const fetchData = async () => {
      const top_tracks = await fetchTopTracksLongTerm(access_token);
      setTopTracks(top_tracks);
      console.log(top_tracks);
    };
    fetchData();
  }, [access_token]);
  return (
    <div className="flex flex-col px-4 gap-4 overflow-x-hidden">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold  min-w-[80px] mt-[3rem] md:mt-0">
          Your Top Tracks
        </h2>
        <button className="border-1 px-6 py-2 rounded-[3rem] uppercase text-[0.85rem] w-[150px] font-light tracking-[1px] hover:bg-amber-50 hover:text-black transition duration-350 cursor-pointer">
          See more
        </button>
      </div>
      <ul>
        {topTracks &&
          topTracks.slice(0, 10).map((track) => (
            <li
              key={track.id}
              className="grid grid-cols-[1fr_3fr] md:grid-cols-[1fr_4fr] items-center py-2 justify-items-start gap-x-4"
            >
              <a href={track.external_urls.spotify} target="_blank">
                <img
                  src={track.album.images[1]?.url}
                  alt={track.name}
                  className="w-[70px] h-[70px] rounded-[5px] min-w-[70px] min-h-[70px]"
                />
              </a>
              <a
                href={track.external_urls.spotify}
                target="_blank"
                className="font-light tracking-[0.5px] text-[0.85rem] justify-items-start w-full overflow-hidden whitespace-nowrap text-ellipsis"
              >
                <p className=" hover:underline transition duration-350 w-full overflow-hidden whitespace-nowrap text-ellipsis">
                  {track.name}
                </p>
                <span className="text-gray-500 text-[0.75rem] w-full overflow-hidden block whitespace-nowrap text-ellipsis">
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
