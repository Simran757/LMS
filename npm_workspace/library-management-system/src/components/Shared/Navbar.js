import React, { useEffect, useState } from "react";
import UserNavbar from "./UserNavbar";
import WriterNavbar from "./WriterNavbar";

function Navbar() {
    const [role, setRole] = useState(null);
    
    useEffect(() => {
        // Set up the role based on localStorage whenever the component mounts or updates
        const userRole = localStorage.getItem("role");
        setRole(userRole); // Set the role in state
    }, []); // This will only run on mount

    // Dynamically render the Navbar based on the role
    return (
        <>
            {role === "USER" && <UserNavbar />}
            {role === "WRITER" && <WriterNavbar />}
            {!role && (
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container">
                        <a className="navbar-brand" href="/">
                            Novel Nook
                        </a>
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
                                    <a className="nav-link" href="/login">
                                        Login
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/register">
                                        Register
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            )}
        </>
    );
}

export default Navbar;
