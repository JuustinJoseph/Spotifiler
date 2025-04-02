import { React, useState, useEffect } from "react";
import axios from "axios";

const UseAuth = () => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token") || null
  );
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refresh_token") || null
  );
  const [expiresIn, setExpiresIn] = useState(
    localStorage.getItem("expires_in")
      ? parseInt(localStorage.getItem("expires_in"))
      : null
  );

  useEffect(() => {
    if (accessToken) {
      axios
        .get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          console.log("Token is valid", response);
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            localStorage.removeItem("access_token");
            window.location.reload(); // Force reload
          }
        });
    }
  }, [accessToken]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const access_token_from_url = queryParams.get("access_token");
    const refresh_token_from_url = queryParams.get("refresh_token");
    const expiresIn_from_url = parseInt(queryParams.get("expires_in"));

    if (access_token_from_url && refresh_token_from_url && expiresIn_from_url) {
      setAccessToken(access_token_from_url);
      setRefreshToken(refresh_token_from_url);
      setExpiresIn(expiresIn_from_url);

      localStorage.setItem("access_token", access_token_from_url);
      localStorage.setItem("expires_in", expiresIn_from_url.toString());
      localStorage.setItem("refresh_token", refresh_token_from_url);

      window.history.pushState({}, null, "/");
    }
  }, []);

  useEffect(() => {
    if (!refreshToken || !expiresIn) {
      return;
    }
    const interval = setInterval(() => {
      axios
        .get("http://localhost:8080/refresh_token", {
          params: { refresh_token: refreshToken },
        })
        .then((res) => {
          setAccessToken(res.data.access_token);
          setExpiresIn(res.data.expires_in);
          localStorage.setItem("access_token", res.data.access_token);
          localStorage.setItem("expires_in", res.data.expires_in);
        })
        .catch((err) => {
          console.error("Failed to refresh token:", err);
          window.location.href = "/login";
        });
    }, (expiresIn - 60) * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [refreshToken, expiresIn]);

  return accessToken;
};

export default UseAuth;
