import React, { useState, useEffect } from "react";
import { getBooks } from "../services/bookService";
function HomePage() {
    const [books, setBooks] = useState([]);

    // Fetch books when the component loads
    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await getBooks();
            setBooks(response.data); // Set the fetched books into state
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    return (
        
        <div className="container mt-4">
            <h1 className="text-center mb-4">Welcome to Novel Nook</h1>
            <div className="row">
                {books.length === 0 ? (
                    <p className="text-center">No books available at the moment.</p>
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
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default HomePage;
