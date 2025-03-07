import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadphones } from "@fortawesome/free-solid-svg-icons";
import { faSpotify, faGithub } from "@fortawesome/free-brands-svg-icons";
import Footer from "./components/Footer";

const Login = () => {
  const handleLoginClick = () => {
    window.location.href = "http://localhost:8080/login";
  };

  return (
    <>
      <div className="flex min-h-screen justify-center items-center flex-col p-10 gap-10 relative">
        <div className="absolute inset-0 flex justify-center items-center text-gray-700 opacity-15 z-[-1] md:text-[50rem] overflow-hidden">
          <FontAwesomeIcon icon={faHeadphones} />
        </div>

        <div className="bg-black p-10 rounded-2xl shadow-lg flex flex-col gap-8 items-center text-center max-w-lg ">
          <p className="text-3xl font-semibold text-white">
            Welcome to <strong>Spotifiler!</strong>
          </p>
          <p className="text-lg text-gray-300 mt-4">
            No need to wait until the end of the year for your Spotify Wrapped!{" "}
          </p>
          <p>
            Login now to explore your top artists, tracks, and more—in real
            time.
          </p>
          <div className="w-full h-[1px] bg-gray-600 my-4"></div>
          <button
            onClick={handleLoginClick}
            className=" bg-green-500 py-3 px-6 rounded-lg text-white text-lg font-medium hover:bg-green-600 transition duration-300 flex justify-center items-center cursor-pointer"
          >
            Login with Spotify &nbsp; <FontAwesomeIcon icon={faSpotify} />
          </button>
        </div>
        <Footer />
      </div>
      <a href="https://github.com/JuustinJoseph" target="_blank">
        <FontAwesomeIcon
          icon={faGithub}
          size="3x"
          flip
          className="fixed bottom-0 right-0 text-gray-400 p-4"
        />
      </a>
    </>
  );
};

export default Login;
