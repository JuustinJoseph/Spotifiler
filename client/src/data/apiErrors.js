// Central error handling for Spotify API calls.
import axios from "axios";
import { useSyncExternalStore } from "react";

let currentError = null;
const listeners = new Set();

export const setApiError = (error) => {
  currentError = error;
  listeners.forEach((l) => l());
};

export const useApiError = () =>
  useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => currentError
  );

const spotifyMessage = (data) => {
  if (!data) return null;
  if (typeof data === "string") return data.trim() || null;
  if (typeof data.error === "string")
    return data.error_description || data.error;
  return data.error?.message || null;
};

export const describeError = (err) => {
  const status = err?.response?.status ?? null;
  const detail = spotifyMessage(err?.response?.data);

  if (!err?.response) {
    return {
      status: null,
      title: "Network error",
      message:
        "Couldn't reach Spotify. Check your internet connection and try again.",
      detail: err?.message,
    };
  }

  const known = {
    400: ["Bad request", "Spotify rejected the request."],
    401: [
      "Session expired",
      "Your Spotify session is no longer valid. Please log in again.",
    ],
    403: [
      "Access denied",
      "Spotify refused access for this account. Spotify only lets approved users use an app in development mode. Make sure your Spotify email is added under User Management in the app's Developer Dashboard, or log in with your own Client ID.",
    ],
    404: ["Not found", "Spotify couldn't find what was requested."],
    429: [
      "Too many requests",
      "Spotify is rate limiting requests. Wait a moment and try again.",
    ],
  };

  const [title, message] = known[status] ||
    (status >= 500
      ? ["Spotify is having trouble", "Spotify's servers returned an error. Try again in a bit."]
      : ["Something went wrong", "An unexpected error occurred."]);

  return { status, title, message, detail };
};

// Report every failed Spotify API response; the first error wins until cleared.
axios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.config?.url?.startsWith("https://api.spotify.com") && !currentError) {
      setApiError(describeError(err));
    }
    return Promise.reject(err);
  }
);
