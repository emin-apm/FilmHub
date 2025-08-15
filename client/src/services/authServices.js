import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_BACKEND_URL,
  withCredentials: true,
});

const endpoints = {
  login: "/user/login",
  register: "/user/register",
  google: "/user/googleSign",
  logout: "/user/logout",
};

function handleError(error) {
  if (error.response) {
    throw new Error(error.response.data.message || "Server error");
  } else if (error.request) {
    throw new Error("No response from server");
  } else {
    throw new Error(error.message);
  }
}

// Generic request wrapper
async function request(method, url, data) {
  try {
    const res = await api[method](url, data);
    return res.data;
  } catch (err) {
    handleError(err);
  }
}

// Auth service methods
export function login(email, password) {
  return request("post", endpoints.login, { email, password });
}

export function register(email, password) {
  return request("post", endpoints.register, { email, password });
}

export function googleSign({ access_token }) {
  return request("post", endpoints.google, { access_token });
}

export function logout() {
  return request("post", endpoints.logout);
}
