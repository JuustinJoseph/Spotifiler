import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import {
  faMicrophone,
  faMusic,
  faClockRotateLeft,
  faList,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  return (
    <nav>
      <div className="flex md:flex-col px-2 bottom-0 w-screen h-[70px] items-center justify-evenly text-[0.80rem] bg-black text-neutral-50 fixed md:top-0 md:left-0 md:h-screen md:w-[100px] md:justify-between md:py-4 gap-[0.5rem]">
        <div className="hidden md:block cursor-pointer">
          <FontAwesomeIcon icon={faSpotify} size="3x" color="green" />
        </div>
        <ul className="flex  md:flex-col text-gray-500 text-[0.5rem] gap-3">
          <li className="flex flex-col items-center gap-2 hover:bg-gray-800 py-4 px-8 cursor-pointer hover:border-l-4 hover:border-l-emerald-500">
            <FontAwesomeIcon icon={faUser} className="text-2xl" />
            <span>Profile</span>
          </li>
          <li className="flex flex-col items-center gap-2  hover:bg-gray-800 py-4 px-8 cursor-pointer hover:border-l-4 hover:border-l-emerald-500">
            <FontAwesomeIcon icon={faMicrophone} className="text-2xl" />
            <span>Top Artists</span>
          </li>
          <li className="flex flex-col items-center gap-2  hover:bg-gray-800 py-4 px-8 cursor-pointer hover:border-l-4 hover:border-l-emerald-500">
            <FontAwesomeIcon icon={faMusic} className="text-2xl" />
            <span>Top Tracks</span>
          </li>
          <li className="flex flex-col items-center gap-2  hover:bg-gray-800 py-4 px-8 cursor-pointer hover:border-l-4 hover:border-l-emerald-500">
            <FontAwesomeIcon icon={faClockRotateLeft} className="text-2xl" />
            <span>Recent</span>
          </li>
          <li className="flex flex-col items-center gap-2  hover:bg-gray-800 py-4 px-8 cursor-pointer hover:border-l-4 hover:border-l-emerald-500">
            <FontAwesomeIcon icon={faList} className="text-2xl" />
            <span>Playlists</span>
          </li>
        </ul>
        <div className="text-gray-500 md:text-white">
          <a href="https://github.com/JuustinJoseph" target="_blank">
            <FontAwesomeIcon icon={faGithub} bounce size="3x" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
