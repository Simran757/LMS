import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBookById, updateBook } from "../../services/bookService";

function EditBook() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState({
        title: "",
        description: "",
        price: "",
    });

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await getBookById(id);
                setBook(response.data);
            } catch (error) {
                console.error("Error fetching book:", error);
            }
        };
        fetchBook(); // Call the fetchBook function
    }, [id]); // Include 'id' as a dependency

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook({ ...book, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateBook(id, book);
            alert("Book updated successfully!");
            navigate("/books");
        } catch (error) {
            console.error("Error updating book:", error);
            alert("Failed to update the book.");
        }
    };

    return (
        <div>
            <h2>Edit Book</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        className="form-control"
                        value={book.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Description</label>
                    <textarea
                        name="description"
                        className="form-control"
                        value={book.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Price</label>
                    <input
                        type="number"
                        name="price"
                        className="form-control"
                        value={book.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Save Changes
                </button>
            </form>
        </div>
    );
}

export default EditBook;
