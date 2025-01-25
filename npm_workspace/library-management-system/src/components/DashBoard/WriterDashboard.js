import React, { useState, useEffect } from "react";

import api from "../../services/api";

function WriterDashboard() {
    const [books, setBooks] = useState([]);
    const [soldBooks, setSoldBooks] = useState([]);
    const [newBook, setNewBook] = useState({ title: "", description: "", price: 0 });
    const [error, setError] = useState(null);
    // const [writerId, setWriterId] = useState(localStorage.getItem("writerId")); // Example writerId, this should come from the logged-in user
const writerId=1;
    useEffect(() => {
        // const writerId =localStorage.getItem("writerId");
        console.log(writerId);
        if(writerId){
            // setWriterId(writerId);
            fetchWriterBooks();
            fetchSoldBooks();
        }else{
            console.log("writer not logged in!")
        }
       
    }, []);

    const fetchWriterBooks = async () => {
        try {
            const response = await api.get(`/writer/books`, { withCredentials: true });
            setBooks(response.data);
        } catch (error) {
            console.error("Error fetching writer's books:", error);
            setError("Failed to fetch books. Please try again.");
        }
    };

    const fetchSoldBooks = async () => {
        try {
            console.log(writerId);
            const response = await api.get(`/writer/sold-books/${writerId}`);
            setSoldBooks(response.data);
        } catch (error) {
            console.error("Error fetching sold books:", error);
            setError("Failed to fetch sold books. Please try again.");
        }
    };

    const handleAddBook = async () => {
        if (!newBook.title || !newBook.description || newBook.price <= 0) {
            setError("Please fill in all fields with valid values.");
            return;
        }

        try {
       
            await api.post(`/writer/add-book/${writerId}`, newBook);
            fetchWriterBooks(); // Refresh the books list
            setNewBook({ title: "", description: "", price: 0 }); // Reset the form
            setError(null); // Clear error
        } catch (error) {
            console.error("Error adding book:", error);
            setError("Failed to add the book. Please try again.");
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center">Writer Dashboard</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            
            {/* Add New Book Section */}
            <div className="mb-4">
                <h2>Add a New Book</h2>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Title"
                        value={newBook.title}
                        onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                    />
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Description"
                        value={newBook.description}
                        onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
                    />
                    <input
                        type="number"
                        className="form-control mb-2"
                        placeholder="Price"
                        value={newBook.price}
                        onChange={(e) => setNewBook({ ...newBook, price: parseFloat(e.target.value) })}
                    />
                    <button className="btn btn-primary" onClick={handleAddBook}>
                        Add Book
                    </button>
                </div>
            </div>

            {/* Books Section */}
            <h2>Your Books</h2>
            <div className="row">
                {books.map((book) => (
                    <div className="col-md-4 mb-4" key={book.id}>
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">{book.title}</h5>
                                <p className="card-text">{book.description}</p>
                                <p className="card-text">
                                    <strong>Price:</strong> ${book.price.toFixed(2)}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Sold Books Section */}
            <h2>Sold Books</h2>
            <div className="row">
                {soldBooks.map((book) => (
                    <div className="col-md-4 mb-4" key={book.id}>
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">{book.title}</h5>
                                <p className="card-text">{book.description}</p>
                                <p className="card-text">
                                    <strong>Price:</strong> ${book.price.toFixed(2)}
                                </p>
                                <p className="card-text">
                                    <strong>Buyer:</strong> {book.buyerName}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WriterDashboard;
