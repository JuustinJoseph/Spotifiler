import { React, useEffect, useState } from "react";
import { fetchTopArtistsLongTerm } from "../data/spotifyAPI";
import { useNavigate } from "react-router-dom";

const TopArtists = ({ access_token }) => {
  const navigate = useNavigate();

  const [topArtists, setTopArtists] = useState(null);

  useEffect(() => {
    if (!access_token) {
      return;
    }
    const fetchData = async () => {
      const top_artists = await fetchTopArtistsLongTerm(access_token);
      setTopArtists(top_artists);
    };
    fetchData();
  }, [access_token]);
  return (
    <div className="flex flex-col px-4 gap-4 ">
      <div className="flex justify-between items-center mt-[3rem]">
        <h2 className="font-semibold  min-w-[80px] md:mt-0">
          Your Top Artists
        </h2>
        <button
          className="border-1 px-6 py-2 rounded-[3rem] uppercase text-[0.85rem] w-[150px] font-light tracking-[1px] hover:bg-amber-50 hover:text-black transition duration-350 cursor-pointer"
          onClick={() => navigate("/artists")}
        >
          See more
        </button>
      </div>
      <ul>
        {topArtists &&
          topArtists.slice(0, 10).map((artist) => (
            <li
              key={artist.id}
              className="grid md:grid-cols-[1fr_4fr] grid-cols-[1fr_3fr] items-center py-2 justify-items-start w-full gap-x-4"
            >
              <a href={artist.external_urls.spotify} target="_blank">
                <img
                  src={artist.images[1]?.url}
                  alt={artist.name}
                  className="w-[70px] h-[70px] rounded-[5rem] min-w-[70px]"
                />
              </a>
              <a
                href={artist.external_urls.spotify}
                target="_blank"
                className="font-light tracking-[0.5px] text-[0.85rem] hover:underline transition duration-350 justify-items-start min-w-fit "
              >
                {artist.name}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TopArtists;
