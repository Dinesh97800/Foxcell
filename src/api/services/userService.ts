// services/userService.ts

import api from "../apiClient";

// Fetch all users
export const getUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

// Create a new user
export const createUser = async (userData: any) => {
  const response = await api.post("/users", userData);
  return response.data;
};


export const login = async (email: string, password: string) => {
  const response = await api.post('/login', { email, password });
  return response.data; // user info
};

export const logout = async () => {
  await api.post('/logout'); // backend should clear cookie
};