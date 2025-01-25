import React from "react";
import { Link } from "react-router-dom";

function AdminDashBoard() {
    return (
        <div className="container mt-4">
            <h1 className="text-center">Admin Dashboard</h1>
            <div className="row mt-4">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body text-center">
                            <h5 className="card-title">Manage Users</h5>
                            <p className="card-text">View and manage all registered users.</p>
                            <Link to="/admin/users" className="btn btn-primary">
                                Manage Users
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body text-center">
                            <h5 className="card-title">Manage Books</h5>
                            <p className="card-text">View and manage all books in the system.</p>
                            <Link to="/admin/books" className="btn btn-primary">
                                Manage Books
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashBoard;
