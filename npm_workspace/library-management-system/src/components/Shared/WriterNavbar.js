import React from "react";
import { Link, useNavigate } from "react-router-dom";

function WriterNavbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear(); // Clear all localStorage
        navigate("/"); // Redirect to home page
        window.location.reload();
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    Novel Nook - Writer
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/edit-books">
                                Edit Books
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/writer-dashboard">
                              DashBoard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-link nav-link" onClick={handleLogout}>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default WriterNavbar;
