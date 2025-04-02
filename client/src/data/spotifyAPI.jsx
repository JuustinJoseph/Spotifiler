import axios from "axios";

export const fetchUserProfile = async (accessToken) => {
  try {
    const response = await axios.get("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};

export const fetchFollowingArtists = async (accessToken) => {
  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/following?type=artist",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return response.data.artists.total;
  } catch (error) {
    console.error("Error fetching following artists:", error);
    return null;
  }
};

export const fetchPlaylists = async (accessToken) => {
  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/playlists",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching playlists:", error);
    return null;
  }
};

export const fetchTopArtistsShortTerm = async (accessToken) => {
  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=50",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return response.data.items;
  } catch (error) {
    console.error("Error fetching top artists (short term):", error);
    return null;
  }
};

export const fetchTopArtistsMediumTerm = async (accessToken) => {
  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=50",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return response.data.items;
  } catch (error) {
    console.error("Error fetching top artists (medium term):", error);
    return null;
  }
};

export const fetchTopArtistsLongTerm = async (accessToken) => {
  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return response.data.items;
  } catch (error) {
    console.error("Error fetching top artists (long term):", error);
    return null;
  }
};

export const fetchTopTracksShortTerm = async (accessToken) => {
  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=50",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return response.data.items;
  } catch (error) {
    console.error("Error fetching top tracks (short term):", error);
    return null;
  }
};

export const fetchTopTracksLongTerm = async (accessToken) => {
  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return response.data.items;
  } catch (error) {
    console.error("Error fetching top tracks (long term):", error);
    return null;
  }
};

export const fetchTopTracksMediumTerm = async (accessToken) => {
  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=50",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return response.data.items;
  } catch (error) {
    console.error("Error fetching top tracks (medium term):", error);
    return null;
  }
};

export const fetchRecentlyPlayedTracks = async (accessToken) => {
  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/player/recently-played",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return response.data.items;
  } catch (error) {
    console.error("Error fetching recent tracks:", error);
    return null;
  }
};

export const fetchUserPlaylists = async (accessToken) => {
  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/playlists?limit=20&offset=0",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return response.data.items;
  } catch (error) {
    console.error("Error fetching user playlists:", error);
    return null;
  }
};
