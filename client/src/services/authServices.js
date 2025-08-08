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

function handleErrorr(error) {
  if (error.response) {
    throw new Error(error.response.data.message || "Server error");
  } else if (error.request) {
    throw new Error("No response from server");
  } else {
    throw new Error(error.message);
  }
}

export async function login(email, password) {
  try {
    const res = await api.post(endpoints.login, { email, password });
    return res.data;
  } catch (err) {
    handleErrorr(err);
  }
}

export async function rergister(email, password) {
  try {
    const res = await api.post(endpoints.register, { email, password });
    return res.data;
  } catch (err) {
    handleErrorr(err);
  }
}

export async function logout() {
  try {
    const res = await api.post(endpoints.logout);
    return res.data;
  } catch (error) {
    handleErrorr(err);
  }
}
