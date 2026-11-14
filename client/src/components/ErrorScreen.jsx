import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { clearTokens } from "../auth/pkce";

const ErrorScreen = ({ error }) => {
  const logout = () => {
    clearTokens();
    window.location.href = "/";
  };

  return (
    <div className="flex min-h-screen justify-center items-center p-10">
      <div className="bg-black p-10 rounded-2xl shadow-lg flex flex-col gap-6 items-center text-center max-w-lg">
        <FontAwesomeIcon
          icon={faTriangleExclamation}
          size="3x"
          className="text-red-500"
        />
        <h1 className="text-2xl font-semibold text-white">
          {error.status ? `${error.status} · ` : ""}
          {error.title}
        </h1>
        <p className="text-gray-300">{error.message}</p>
        {error.detail && (
          <p className="text-xs text-gray-500 bg-gray-900 rounded px-3 py-2 break-words w-full">
            Spotify says: {error.detail}
          </p>
        )}
        <div className="flex gap-4">
          {error.status !== 401 && error.status !== 403 && (
            <button
              onClick={() => window.location.reload()}
              className="bg-green-500 py-2 px-6 rounded-lg text-white hover:bg-green-600 transition duration-300 cursor-pointer"
            >
              Try again
            </button>
          )}
          <button
            onClick={logout}
            className="border border-gray-500 py-2 px-6 rounded-lg text-gray-200 hover:bg-gray-800 transition duration-300 cursor-pointer"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorScreen;
