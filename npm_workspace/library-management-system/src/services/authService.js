import api from "./api";

// Register a new user
export const registerUser = (userData) => api.post("/auth/register/user", userData);

// Login a user
export const loginUser = (credentials) => api.post("/auth/login", credentials);

// Register a new writer
export const registerWriter = (writerData) => api.post("/auth/register/writer", writerData);

export const updateUser = (userId) => api.put(`/user/${userId}/update-profile`)