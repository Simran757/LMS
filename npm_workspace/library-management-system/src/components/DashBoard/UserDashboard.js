import React, { useState, useEffect } from "react";
import { getBooks } from "../../services/bookService";
import  api  from "../../services/api";

function UserDashboard() {
    const [books, setBooks] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await getBooks();
            setBooks(response.data);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    const handleBuyBook = async (bookId) => {
        const userId = localStorage.getItem("userId"); // Retrieve the user ID from localStorage
        if (!userId) {
            setMessage("User is not logged in.");
            return;
        }

        try {
            const response = await api.post(`/user/${userId}/buy-book/${bookId}`);
            setMessage(response.data); 
        } catch (error) {
            setMessage("Failed to buy the book. Please try again.");
            console.error("Error buying book:", error);
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center">Novel Nook Welcomes you!</h1>
            {message && <div className="alert alert-info">{message}</div>}
            <div className="row">
                {books.length === 0 ? (
                    <p>No books available at the moment.</p>
                ) : (
                    books.map((book) => (
                        <div className="col-md-4 mb-4" key={book.id}>
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">{book.title}</h5>
                                    <p className="card-text">{book.description}</p>
                                    <p className="card-text">
                                        <strong>Price:</strong> Rs.{book.price.toFixed(2)}
                                    </p>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleBuyBook(book.id)}
                                    >
                                        Buy Book
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default UserDashboard;
