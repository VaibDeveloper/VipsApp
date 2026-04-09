// src/api/api.js

import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * BASE_URL:
 * Use localhost for emulator.
 * Use your PC IP for physical mobile device.
 *
 * Example for phone:
 *  export const BASE_URL = "http://192.168.1.110:4000/api";
 */
export const BASE_URL = "http://127.0.0.1:4000/api"; // change when testing on real device

// Read token from storage
async function getToken() {
  try {
    return await AsyncStorage.getItem("token");
  } catch (e) {
    console.warn("Error reading token:", e);
    return null;
  }
}

// Main request wrapper
async function request(path, { method = "GET", body, headers = {}, auth = true } = {}) {
  const url = `${BASE_URL}${path}`;
  const finalHeaders = { "Content-Type": "application/json", ...headers };

  // Add Authorization header when auth = true
  if (auth !== false) {
    const token = await getToken();
    if (token) finalHeaders.Authorization = `Bearer ${token}`;
  }

  const options = {
    method,
    headers: finalHeaders,
    body: body ? JSON.stringify(body) : undefined,
  };

  let responseText;
  let parsed;

  try {
    const res = await fetch(url, options);
    responseText = await res.text();

    // Try parsing JSON if present
    if (responseText.length > 0) {
      try {
        parsed = JSON.parse(responseText);
      } catch (parseErr) {
        parsed = responseText; // fallback raw text
      }
    }

    if (!res.ok) {
      const message =
        (parsed && parsed.message) ||
        (typeof parsed === "string" ? parsed : `HTTP ${res.status}`);
      const err = new Error(message);
      err.status = res.status;
      err.response = parsed;
      throw err;
    }

    return parsed;
  } catch (e) {
    console.error("API Error:", e);
    throw e;
  }
}

// Export easy-use methods
export const api = {
  get: (path, opts = {}) => request(path, { ...opts, method: "GET" }),
  post: (path, body, opts = {}) => request(path, { ...opts, method: "POST", body }),
  put: (path, body, opts = {}) => request(path, { ...opts, method: "PUT", body }),
  del: (path, opts = {}) => request(path, { ...opts, method: "DELETE" }),
};
