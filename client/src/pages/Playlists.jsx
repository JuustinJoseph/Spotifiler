import { React, useState, useEffect } from "react";
import { fetchUserPlaylists } from "../data/spotifyAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";

const Playlists = ({ access_token }) => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!access_token) {
      console.log("access token not found");
      return;
    }

    const fetchData = async () => {
      const playlist = await fetchUserPlaylists(access_token);

      setPlaylists(playlist);
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
            Your Playlists
          </h1>
        </div>
        <div className="m-8">
          <ul>
            {playlists &&
              playlists.slice(0, 10).map((playlist) => (
                <li
                  key={playlist.id}
                  className="flex items-center gap-8 mb-[2rem]"
                >
                  <a href={playlist.external_urls.spotify} target="_blank">
                    <img
                      src={playlist.images[0]?.url}
                      alt={playlist.name}
                      className="w-[100px] h-[100px] min-w-[100px] md:w-[150px] md:h-[150px] md:min-w-[150px]"
                    />
                  </a>
                  <a
                    href={playlist.external_urls.spotify}
                    target="_blank"
                    className="font-light tracking-[0.5px] text-[0.85rem] hover:underline transition duration-350 justify-items-start w-full overflow-hidden whitespace-nowrap text-ellipsis"
                  >
                    {playlist.name}
                  </a>
                  <a
                    href={playlist.owner.external_urls.spotify}
                    target="_blank"
                    className="hover:underline text-gray-500 text-[0.7rem] hidden md:block min-w-fit"
                  >
                    {playlist.owner.display_name}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Playlists;
