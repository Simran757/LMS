import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService"; 

function Login() {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleLogin = async () => {
        try {
           
            const response = await loginUser(credentials);  // Pass credentials to the loginUser function
            const writerId = response.data.writerId;
            localStorage.setItem("writerId", writerId); 
            localStorage.setItem("role", response.data.role);
            console.log(writerId);
            const role = response.data.role;
            console.log(role);

            if (role === 'ADMIN') {
                console.log("nevigting to admin dashboard")
                navigate("/admin-dashboard");
            } else if (role === 'WRITER') {
                navigate("/writer-dashboard");
            } else if (role === 'USER') {
                navigate("/user-dashboard");
            } else {
               
                navigate("/login");
                setError("Invalid role. Please contact support.");
            }
        } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);
            setError("Invalid username or password.");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin();
    };

    return (
        <div className="col-md-6 offset-md-3">
            <h2>Login</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                        type="text"
                        name="username"
                        className="form-control"
                        value={credentials.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;
