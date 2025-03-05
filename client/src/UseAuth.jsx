import { React, useState, useEffect } from "react";
import axios from "axios";

const UseAuth = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [expiresIn, setExpiresIn] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const access_token_from_url = queryParams.get("access_token");
    const refresh_token_from_url = queryParams.get("refresh_token");
    const expiresIn_from_url = parseInt(queryParams.get("expires_in"));

    if (access_token_from_url && refresh_token_from_url && expiresIn_from_url) {
      setAccessToken(access_token_from_url);
      setRefreshToken(refresh_token_from_url);
      setExpiresIn(expiresIn_from_url);

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
        })
        .catch((err) => {
          console.error("Failed to refresh token:", err);
        });
    }, (expiresIn - 60) * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [refreshToken, expiresIn]);

  return accessToken;
};

export default UseAuth;
