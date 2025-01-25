import React, { useState } from "react";
import { registerUser } from "../../services/authService";
import { registerWriter } from "../../services/authService";

function Register() {
    const [user, setUser] = useState({ username: "", password: "", email: "", role: "" });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (user.role === "USER") {
                response = await registerUser(user);
            } else if (user.role === "WRITER") {
                response = await registerWriter(user);
            } else {
                throw new Error("Invalid role selected.");
            }
            setMessage(response.data); 
        } catch (err) {
            setMessage("Failed to register. Please try again.");
            console.error(err);
        }
    };

    return (
        <div className="container">
            <h2>Register</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        value={user.username}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Role</label>
                    <select
                        name="role"
                        value={user.role}
                        onChange={handleChange}
                        className="form-control"
                        required
                    >
                        <option value="">Select a role</option>
                        <option value="USER">User</option>
                        <option value="WRITER">Writer</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">
                    Register
                </button>
            </form>
        </div>
    );
}

export default Register;
