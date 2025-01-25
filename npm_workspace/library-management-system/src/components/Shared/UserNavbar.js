import React from "react";
import { Link, useNavigate } from "react-router-dom";

function UserNavbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear(); // Clear all localStorage
        navigate("/"); // Redirect to home page
        window.location.reload();
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    Novel Nook - User
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
                            <Link className="nav-link" to="/user-dashboard">
                               DashBoard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/update-profile">
                                Update Profile
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/my-orders">
                                My Orders
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

export default UserNavbar;
