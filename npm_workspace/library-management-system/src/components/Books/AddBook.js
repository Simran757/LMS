import React, { useState } from "react";
import { addBook } from "../../services/bookService";

function AddBook() {
    const [book, setBook] = useState({ title: "", description: "", price: "" });
    const [error, setError] = useState(null);
    const writerId = 1;
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook({ ...book, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addBook(writerId,book); // Call API with session
            alert("Book added successfully!");
            setBook({ title: "", description: "", price: "" });
        } catch (error) {
            console.error("Error adding book:", error);
            setError("Failed to add the book. Please try again.");
        }
    };

    return (
        <div>
            <h2>Add Book</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={book.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={book.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Price</label>
                    <input
                        type="number"
                        name="price"
                        value={book.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Add Book</button>
            </form>
        </div>
    );
}

export default AddBook;
