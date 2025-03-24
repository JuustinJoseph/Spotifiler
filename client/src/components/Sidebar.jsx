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
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav>
      <div className="flex md:flex-col  bottom-0 w-screen h-[70px] px-0 items-center text-[0.80rem] bg-black text-neutral-50 fixed md:top-0 md:left-0 md:h-screen md:w-[100px] md:justify-between md:py-4">
        <div className="hidden md:block cursor-pointer">
          <FontAwesomeIcon icon={faSpotify} size="3x" color="green" />
        </div>
        <ul className="flex md:flex-col text-gray-500 text-[0.5rem] justify-evenly items-center h-full  md:h-fit w-full">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "h-full w-full text-white bg-gray-950 border-t-3 border-t-emerald-500 md:border-l-3 md:border-t-0 md:border-emerald-500"
                : "h-full w-full hover:bg-gray-950 hover:border-t-3 hover:border-t-emerald-500 md:border-t-0 md:hover:border-t-0 md:hover:border-l-3 md:hover:border-l-emerald-500"
            }
          >
            <li className="flex flex-col items-center gap-2 md:py-4 h-full py-4 cursor-pointer w-full">
              <FontAwesomeIcon icon={faUser} className="text-2xl" />
              <span>Profile</span>
            </li>
          </NavLink>
          <NavLink
            to="/artists"
            className={({ isActive }) =>
              isActive
                ? "h-full w-full text-white bg-gray-950 border-t-3 border-t-emerald-500 md:border-l-3 md:border-t-0 md:border-emerald-500"
                : "h-full w-full hover:bg-gray-950 hover:border-t-3 hover:border-t-emerald-500 md:border-t-0 md:hover:border-t-0 md:hover:border-l-3 md:hover:border-l-emerald-500"
            }
          >
            <li className="flex flex-col items-center gap-2 md:py-4 h-full py-4 cursor-pointer w-full">
              <FontAwesomeIcon icon={faMicrophone} className="text-2xl" />
              <span>Top Artists</span>
            </li>
          </NavLink>
          <NavLink
            to="/tracks"
            className={({ isActive }) =>
              isActive
                ? "h-full w-full text-white bg-gray-950 border-t-3 border-t-emerald-500 md:border-l-3 md:border-t-0 md:border-emerald-500"
                : "h-full w-full hover:bg-gray-950 hover:border-t-3 hover:border-t-emerald-500 md:border-t-0 md:hover:border-t-0 md:hover:border-l-3 md:hover:border-l-emerald-500"
            }
          >
            <li className="flex flex-col items-center gap-2   md:py-4 h-full py-4 cursor-pointer w-full">
              <FontAwesomeIcon icon={faMusic} className="text-2xl" />
              <span>Top Tracks</span>
            </li>
          </NavLink>
          <NavLink
            to="/recent"
            className={({ isActive }) =>
              isActive
                ? "h-full w-full text-white bg-gray-950 border-t-3 border-t-emerald-500 md:border-l-3 md:border-t-0 md:border-emerald-500"
                : "h-full w-full hover:bg-gray-950 hover:border-t-3 hover:border-t-emerald-500 md:border-t-0 md:hover:border-t-0 md:hover:border-l-3 md:hover:border-l-emerald-500"
            }
          >
            <li className="flex flex-col items-center gap-2 md:py-4 h-full py-4 cursor-pointer w-full">
              <FontAwesomeIcon icon={faClockRotateLeft} className="text-2xl" />
              <span>Recent</span>
            </li>
          </NavLink>
          <NavLink
            to="/playlists"
            className={({ isActive }) =>
              isActive
                ? "h-full w-full text-white bg-gray-950 border-t-3 border-t-emerald-500 md:border-l-3 md:border-t-0 md:border-emerald-500"
                : "h-full w-full hover:bg-gray-950 hover:border-t-3 hover:border-t-emerald-500 md:border-t-0 md:hover:border-t-0 md:hover:border-l-3 md:hover:border-l-emerald-500"
            }
          >
            <li className="flex flex-col items-center gap-2 md:py-4 h-full py-4 cursor-pointer w-full">
              <FontAwesomeIcon icon={faList} className="text-2xl" />
              <span>Playlists</span>
            </li>
          </NavLink>
        </ul>
        <div className="text-gray-500 md:text-white hidden md:block">
          <a href="https://github.com/JuustinJoseph" target="_blank">
            <FontAwesomeIcon icon={faGithub} bounce size="3x" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
