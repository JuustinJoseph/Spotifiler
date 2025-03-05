import React from "react";

const Sidebar = () => {
  return (
    <div className="flex md:flex-col px-2 bottom-0 w-screen h-[70px] items-center justify-evenly text-[0.80rem] bg-black text-neutral-50 fixed md:top-0 md:left-0 md:h-screen md:w-[100px] md:justify-between md:py-4">
      <div className="">ICON</div>
      <nav>
        <ul className="flex gap-4 md:flex-col ">
          <li>Profile</li>
          <li>Top Artists</li>
          <li>Top Tracks</li>
          <li>Recent</li>
          <li>Playlists</li>
        </ul>
      </nav>
      <div>ICON</div>
    </div>
  );
};

export default Sidebar;
