import api from "./api";


// Fetch all users
export const getUsers = () => api.get("/admin/allUsers");
export const getWriters = () => api.get("/admin/allWriter");

export const getBooks = () => api.get("/admin/books");
// Delete a user
export const deleteUser = (id) => api.delete(`/admin/users/${id}`);
export const deleteWriter = (id) => api.delete(`/admin/writers/${id}`);

