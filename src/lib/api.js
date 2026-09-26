import axios from "axios";

// const API_BASE_URL = "https://borderbound-backend.onrender.com/api"
const API_BASE_URL = "http://localhost:5000/api"
 

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("bb_auth_token");

      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== "undefined") {
      const status = error.response?.status;

      if (status === 401) {
        localStorage.removeItem("bb_auth_token");
        localStorage.removeItem("bb_user");

        // window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;