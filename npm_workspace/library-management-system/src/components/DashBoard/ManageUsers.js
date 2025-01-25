import React, { useState, useEffect } from "react";
import { getUsers, deleteUser  } from "../../services/adminService";

function ManageUsers() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null); 

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await getUsers();
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
            setError("Failed to fetch users. Please try again later."); // Set error message
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await deleteUser (id);
                alert("User  deleted successfully!");
                fetchUsers(); // Refresh the user list
            } catch (error) {
                console.error("Error deleting user:", error);
                setError("Failed to delete user. Please try again."); // Set error message
            }
        }
    };

    return (
        <div className="container mt-4">
            <h2>Manage Users</h2>
            {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
            {users.length === 0 ? (
                <p>No users found.</p>
            ) : (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(user.id)}
                                        aria-label={`Delete user ${user.username}`} // Accessibility improvement
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ManageUsers;