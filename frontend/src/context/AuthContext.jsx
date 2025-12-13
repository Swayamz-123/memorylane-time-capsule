import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const API = api;

  useEffect(() => {
    const reqInterceptor = API.interceptors.request.use((config) => {
      const requiresAuth =
        config.requiresAuth !== undefined ? config.requiresAuth : true;

      if (requiresAuth && accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });

    const resInterceptor = API.interceptors.response.use(
      (res) => res,
      async (err) => {
        const originalRequest = err.config;

        if (err.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshUrl = `${API.defaults.baseURL.replace(/\/$/, "")}/users/refresh-token`;
            const res = await axios.post(refreshUrl, {}, { withCredentials: true });

            const newAccessToken = res.data.data.accessToken;
            setAccessToken(newAccessToken);

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return API(originalRequest);
          } catch {
            setAccessToken(null);
            setUser(null);
          }
        }

        return Promise.reject(err);
      }
    );

    return () => {
      API.interceptors.request.eject(reqInterceptor);
      API.interceptors.response.eject(resInterceptor);
    };
  }, [accessToken]);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const refreshUrl = `${API.defaults.baseURL.replace(/\/$/, "")}/users/refresh-token`;
        const response = await axios.post(refreshUrl, {}, { withCredentials: true });

        const newAccessToken = response.data.data.accessToken;
        setAccessToken(newAccessToken);

        const userResponse = await API.get("/users/current-user");
        
        setUser(userResponse.data.data);
      } catch {
        setAccessToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async ({ username, email, password }) => {
    const res = await API.post(
      "/users/login",
      { email, username, password },
      { requiresAuth: false }
    );

    setAccessToken(res.data.data.accessToken);
    setUser(res.data.data.user);
  };

  const register = async (formData) => {
    const res = await API.post("/users/register", formData, {
      requiresAuth: false,
      headers: { "Content-Type": "multipart/form-data" },
    });

    setAccessToken(res.data.data.accessToken);
    setUser(res.data.data.user);
  };

  const logout = async () => {
    await API.post("/users/logout", {});
    setAccessToken(null);
    setUser(null);
  };

  if (loading) {
    return <div>Loading application...</div>;
  }

  return (
    <AuthContext.Provider
      value={{ accessToken, user, login, register, logout, API }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
