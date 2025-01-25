import api from "./api";

// Fetch all books
export const getBooks = () => api.get("/writer/books");

// Fetch a single book by ID
export const getBookById = (id) => api.get(`/writer/books/${id}`);

// Fetch books by a specific writer (redundant with getBooks)
export const getBooksByWriter = () => api.get("/writer/books"); // Consider removing if identical to getBooks

// Add a new book (requires writerId)
export const addBook = (writerId, book) => api.post(`/writer/add-book/${writerId}`, book);

// Update a book
export const updateBook = (id, book) => api.put(`/writer/update-book/${id}`, book);

// Delete a book
export const deleteBook = (id) => api.delete(`/writer/books/${id}`);

// Fetch sold books for a writer
export const getSoldBooks = (writerId) => api.get(`/writer/sold-books/${writerId}`);
export const buyBooks = (userId, bookId) => api.post(`/user/${userId}/buy-book/${bookId}`);
