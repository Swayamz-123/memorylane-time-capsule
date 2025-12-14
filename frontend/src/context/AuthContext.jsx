import React, { createContext, useState, useContext, useEffect } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const API = api;

  // 🔑 Check session on app load
  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await API.post("/users/refresh-token");
        setUser(res.data.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (data) => {
    const res = await API.post("/users/login", data, {
      requiresAuth: false,
    });
    setUser(res.data.data.user);
  };

  const register = async (data) => {
    const res = await API.post("/users/register", data, {
      requiresAuth: false,
    });
    setUser(res.data.data.user);
  };

  const logout = async () => {
    await API.post("/users/logout");
    setUser(null);
  };

  if (loading) return <div>Loading application...</div>;

  return (
    <AuthContext.Provider value={{ user, login, register, logout, API }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
