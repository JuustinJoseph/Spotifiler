// Spotify Authorization Code + PKCE flow, run entirely in the browser.
// No client secret needed, so users can supply their own Client ID.

const SCOPES =
  "user-read-private user-read-email user-follow-read playlist-read-private playlist-read-collaborative user-top-read user-read-recently-played";

export const DEFAULT_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID || "";

export const getRedirectUri = () => `${window.location.origin}/callback`;

export const getClientId = () =>
  localStorage.getItem("client_id") || DEFAULT_CLIENT_ID;

const randomString = (length) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(values, (v) => chars[v % chars.length]).join("");
};

const sha256Base64Url = async (input) => {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(input)
  );
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

export const startLogin = async (clientId) => {
  if (!clientId) throw new Error("Missing Spotify Client ID");
  const verifier = randomString(64);
  const state = randomString(16);
  sessionStorage.setItem("pkce_verifier", verifier);
  sessionStorage.setItem("pkce_state", state);
  sessionStorage.setItem("pkce_client_id", clientId);

  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    scope: SCOPES,
    redirect_uri: getRedirectUri(),
    state,
    code_challenge_method: "S256",
    code_challenge: await sha256Base64Url(verifier),
  });
  window.location.href = `https://accounts.spotify.com/authorize?${params}`;
};

const tokenRequest = async (body) => {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(body),
  });
  if (!res.ok) throw new Error(`Token request failed: ${res.status}`);
  return res.json();
};

export const saveTokens = ({ access_token, refresh_token, expires_in }) => {
  localStorage.setItem("access_token", access_token);
  if (refresh_token) localStorage.setItem("refresh_token", refresh_token);
  localStorage.setItem(
    "expires_at",
    String(Date.now() + expires_in * 1000)
  );
};

export const clearTokens = () => {
  ["access_token", "refresh_token", "expires_at", "expires_in"].forEach((k) =>
    localStorage.removeItem(k)
  );
};

// Guard against React StrictMode running the exchange twice (codes are single-use).
let exchangePromise = null;

export const handleCallback = () => {
  if (exchangePromise) return exchangePromise;
  exchangePromise = (async () => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const error = params.get("error");
    const state = params.get("state");
    const verifier = sessionStorage.getItem("pkce_verifier");
    const clientId = sessionStorage.getItem("pkce_client_id");

    if (error) throw new Error(error);
    if (!code || state !== sessionStorage.getItem("pkce_state") || !verifier)
      throw new Error("state_mismatch");

    const tokens = await tokenRequest({
      grant_type: "authorization_code",
      code,
      redirect_uri: getRedirectUri(),
      client_id: clientId,
      code_verifier: verifier,
    });

    // Remember which Client ID these tokens belong to (needed for refresh).
    localStorage.setItem("client_id", clientId);
    ["pkce_verifier", "pkce_state", "pkce_client_id"].forEach((k) =>
      sessionStorage.removeItem(k)
    );
    saveTokens(tokens);
    return tokens.access_token;
  })();
  return exchangePromise;
};

export const refreshAccessToken = async () => {
  const refresh_token = localStorage.getItem("refresh_token");
  if (!refresh_token) throw new Error("No refresh token");
  const tokens = await tokenRequest({
    grant_type: "refresh_token",
    refresh_token,
    client_id: getClientId(),
  });
  saveTokens(tokens);
  return tokens.access_token;
};
