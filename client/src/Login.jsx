import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadphones } from "@fortawesome/free-solid-svg-icons";
import { faSpotify, faGithub } from "@fortawesome/free-brands-svg-icons";
import Footer from "./components/Footer";
import {
  startLogin,
  DEFAULT_CLIENT_ID,
  getRedirectUri,
} from "./auth/pkce";

const Login = () => {
  const [clientId, setClientId] = useState(
    localStorage.getItem("client_id") || ""
  );
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(() => {
    const e = sessionStorage.getItem("login_error");
    sessionStorage.removeItem("login_error");
    return e;
  });

  const redirectUri = getRedirectUri();

  const handleLoginClick = () => {
    if (!DEFAULT_CLIENT_ID) {
      setError(
        "this site has no Client ID configured. The admin needs to set VITE_SPOTIFY_CLIENT_ID and redeploy"
      );
      return;
    }
    startLogin(DEFAULT_CLIENT_ID).catch((e) => setError(e.message));
  };

  const handleOwnLogin = (e) => {
    e.preventDefault();
    const id = clientId.trim();
    if (!/^[a-f0-9]{32}$/i.test(id)) return;
    startLogin(id).catch((e) => setError(e.message));
  };

  const copyRedirect = () => {
    navigator.clipboard.writeText(redirectUri);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
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

          <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-4 text-sm text-yellow-100 text-left">
            <strong>Heads up:</strong> Spotify currently limits apps like this
            one to a handful of approved users. To use Spotifiler, connect
            with your own free Spotify Client ID using the steps below.
          </div>
            <div className="text-left text-sm text-gray-300 w-full flex flex-col gap-3">
              <ol className="list-decimal list-inside flex flex-col gap-2">
                <li>
                  Open the{" "}
                  <a
                    href="https://developer.spotify.com/dashboard/create"
                    target="_blank"
                    className="underline text-green-400"
                  >
                    Spotify Developer Dashboard
                  </a>{" "}
                  and create an app (any name and description).
                </li>
                <li>
                  Add this Redirect URI:
                  <div className="flex gap-2 mt-1">
                    <code className="bg-gray-800 px-2 py-1 rounded break-all flex-1">
                      {redirectUri}
                    </code>
                    <button
                      onClick={copyRedirect}
                      className="bg-gray-700 px-2 rounded hover:bg-gray-600 cursor-pointer"
                    >
                      {copied ? "Copied" : "Copy"}
                    </button>
                  </div>
                </li>
                <li>Tick <strong>Web API</strong> and save.</li>
                <li>
                  Under <strong>User Management</strong>, add your Spotify
                  email.
                </li>
                <li>Copy the app's Client ID and paste it here:</li>
              </ol>
              <form onSubmit={handleOwnLogin} className="flex gap-2">
                <input
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  placeholder="32-character Client ID"
                  className="flex-1 bg-gray-800 px-3 py-2 rounded text-white outline-none focus:ring-1 focus:ring-green-500"
                />
                <button
                  type="submit"
                  disabled={!/^[a-f0-9]{32}$/i.test(clientId.trim())}
                  className="bg-green-500 px-4 rounded text-white hover:bg-green-600 disabled:opacity-40 cursor-pointer"
                >
                  Connect
                </button>
              </form>
              <p className="text-xs text-gray-500">
                Your Client ID stays in your browser. Spotifiler has no server
                and never sees your data or tokens.
              </p>
            </div>

          <div className="w-full h-[1px] bg-gray-600"></div>

          <div className="flex flex-col items-center gap-3">
            <p className="text-sm text-gray-400">
              Only use this button if the admin of this site has given you
              access.
            </p>
            <button
              onClick={handleLoginClick}
              className="bg-green-500 py-3 px-6 rounded-lg text-white text-lg font-medium hover:bg-green-600 transition duration-300 flex justify-center items-center cursor-pointer"
            >
              Login with Spotify &nbsp; <FontAwesomeIcon icon={faSpotify} />
            </button>
          </div>

          {error && (
            <p className="text-red-400 text-sm">
              Login failed ({error}). If you haven't been given access, use
              your own Client ID above.
            </p>
          )}
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
