import { React, useState, useEffect } from "react";
import { fetchRecentlyPlayedTracks } from "../data/spotifyAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";

const Recent = ({ access_token }) => {
  const [recentTracks, setRecentTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!access_token) {
      console.log("access token not found");
      return;
    }

    const fetchData = async () => {
      const tracks = await fetchRecentlyPlayedTracks(access_token);

      setRecentTracks(tracks);
      setLoading(false);
    };

    fetchData();
  }, [access_token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-green-600 opacity-40 gap-4">
        <FontAwesomeIcon icon={faCirclePlay} size="4x" fade />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <main className="md:mx-[10rem] mb-[5rem]">
        <div className="flex justify-center items-center text-2xl flex-col gap-8 md:flex-row md:justify-between md:gap-0">
          <h1 className="mt-[3rem] ml-8 font-medium md:w-full">
            Recent Played Tracks
          </h1>
        </div>
        <div className="m-8">
          {recentTracks.map((track) => (
            <li
              key={`${track.track.id}-${track.played_at}`}
              className="grid grid-cols-[1fr_3fr] md:grid-cols-[1fr_4fr] items-center py-2 justify-items-start gap-x-4"
            >
              <a href={track.track.external_urls.spotify} target="_blank">
                <img
                  src={track.track.album.images[1]?.url}
                  alt={track.track.name}
                  className="w-[70px] h-[70px] rounded-[5px] min-w-[70px] min-h-[70px]"
                />
              </a>
              <a
                href={track.track.external_urls.spotify}
                target="_blank"
                className="font-light tracking-[0.5px] text-[0.85rem] justify-items-start w-full overflow-hidden whitespace-nowrap text-ellipsis"
              >
                <p className=" hover:underline transition duration-350 w-full overflow-hidden whitespace-nowrap text-ellipsis">
                  {track.track.name}
                </p>
                <span className="text-gray-500 text-[0.75rem] w-full overflow-hidden block whitespace-nowrap text-ellipsis">
                  {track.track.artists.map((artist) => artist.name).join(", ")}{" "}
                  ⋅ {track.track.album.name}
                </span>
              </a>
            </li>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Recent;
