import React, { useState, useEffect } from "react";
import { getBooks } from "../../services/bookService";

function BookList() {
    const [books, setBooks] = useState([]);

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

    return (
        <div>
            <h1>Available Books</h1>
            <ul>
                {books.map((book) => (
                    <li key={book.id}>
                        {book.title} - {book.description} - Rs.{book.price}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BookList;
