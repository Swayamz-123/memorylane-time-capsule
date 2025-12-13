import api from "./axios";

export const register = (data) => api.post("/users/register", data);
export const login = (data) => api.post("/users/login", data);
export const logout = () => api.post("/users/logout");
export const getMe = () => api.get("/users/current-user");
export const refreshAccessToken=()=> api.post("/users/refresh-token")
