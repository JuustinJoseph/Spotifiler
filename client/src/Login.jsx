import React from "react";

const Login = () => {
  const handleLoginClick = () => {
    window.location.href = "http://localhost:8080/login";
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <button
        onClick={handleLoginClick}
        className="bg-green-500 py-2 px-4 rounded text-white h-[50px]"
      >
        Login With Spotify
      </button>
    </div>
  );
};

export default Login;
