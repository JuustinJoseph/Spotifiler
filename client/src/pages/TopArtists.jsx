import { React, useEffect, useState } from "react";
import { fetchTopArtistsLongTerm } from "../data/spotifyAPI";
import Footer from "../components/Footer";

const TopArtists = ({ access_token }) => {
  const [topArtists, setTopArtists] = useState([]);

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
    <>
      <main className="md:ml-[4rem] mb-[5rem]">
        <div className="flex justify-center items-center text-2xl flex-col gap-8 md:flex-row md:justify-between md:gap-0">
          <h1 className="pt-8 font-medium md:w-full">Top Artists</h1>
          <ul className="flex justify-evenly md:justify-end md:gap-[2rem] items-center w-full text-[0.8rem]  md:pt-8 ">
            <li className="w-fit hover:underline cursor-pointer transition duration-350">
              All Time
            </li>
            <li className="w-fit hover:underline cursor-pointer transition duration-350">
              Last 6 months
            </li>
            <li className="w-fit hover:underline cursor-pointer transition duration-350">
              Last 4 weeks
            </li>
          </ul>
        </div>
        <div>
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] justify-items-center items-center pt-12 gap-y-8 md:gap-[5rem]">
            {topArtists.map((artist) => (
              <div className="flex flex-col items-center gap-2 sm:w-1/2 md:w-1/4 justify-center  min-w-[150px]">
                <img
                  src={artist.images[0].url}
                  alt={artist.name}
                  className="rounded-[5rem] w-[110px] h-[110px] md:w-[200px] md:h-[150px] hover:opacity-50 cursor-pointer"
                />
                <h3 className="text-[0.9rem]">{artist.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default TopArtists;
