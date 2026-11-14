import { useState, useEffect } from "react";
import {
  handleCallback,
  refreshAccessToken,
  clearTokens,
} from "./auth/pkce";

const UseAuth = () => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token") || null
  );

  // Finish the PKCE login when Spotify redirects back to /callback.
  useEffect(() => {
    if (window.location.pathname !== "/callback") return;
    handleCallback()
      .then((token) => setAccessToken(token))
      .catch((err) => {
        console.error("Spotify login failed:", err);
        sessionStorage.setItem("login_error", err.message);
      })
      .finally(() => window.history.replaceState({}, null, "/"));
  }, []);

  // Refresh the token shortly before it expires.
  useEffect(() => {
    if (!accessToken) return;
    const expiresAt = parseInt(localStorage.getItem("expires_at") || "0");
    const delay = Math.max(expiresAt - Date.now() - 60_000, 0);

    const timeout = setTimeout(() => {
      refreshAccessToken()
        .then(setAccessToken)
        .catch((err) => {
          console.error("Failed to refresh token:", err);
          clearTokens();
          setAccessToken(null);
        });
    }, delay);

    return () => clearTimeout(timeout);
  }, [accessToken]);

  return accessToken;
};

export default UseAuth;
