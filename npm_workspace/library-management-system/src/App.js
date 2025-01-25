// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Shared/Navbar";
// import Footer from "./components/Shared/Footer"; 
// import HomePage from "./pages/HomePage";
// import Login from "./components/Auth/Login";
// import Register from "./components/Auth/Register";
// import BookList from "./components/Books/BookList";
// import AddBook from "./components/Books/AddBook";
// import EditBook from "./components/Books/EditBook";
// import NotFound from "./pages/NotFound";
// import AdminDashboard from "./components/DashBoard/AdminDashBoard";
// import ManageUsers from "./components/DashBoard/ManageUsers";
// import ManageBooks from "./components/DashBoard/ManageBooks";
// import UserDashboard from "./components/DashBoard/UserDashboard";
// import WriterDashboard from "./components/DashBoard/WriterDashboard";

// function App() {
//     return (
//         <Router>
//             <Navbar />
//             <div className="container mt-4">
//                 <Routes>
//                     <Route path="/" element={<HomePage />} />
//                     <Route path="/login" element={<Login />} />
//                     <Route path="/register" element={<Register />} />
//                     <Route path="/books" element={<BookList />} />
//                     <Route path="/books/add" element={<AddBook />} />
//                     <Route path="/edit-book/:id" element={<EditBook />} />
//                     <Route path="*" element={<NotFound />} />
//                     <Route path="/admin-dashboard" element={<AdminDashboard />} />
//                     <Route path="/admin/users" element={<ManageUsers />} />
//                     <Route path="/admin/books" element={<ManageBooks />} />
//                     <Route path="/user-dashboard" element={<UserDashboard />} />
//                     <Route path="/writer-dashboard" element={<WriterDashboard />} />
//                 </Routes>
//             </div>
//             <Footer />
//         </Router>
//     );
// }

// export default App;
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Shared/Navbar";
import UserNavbar from "./components/Shared/UserNavbar";
import WriterNavbar from "./components/Shared/WriterNavbar";
import Footer from "./components/Shared/Footer";
import HomePage from "./pages/HomePage";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import BookList from "./components/Books/BookList";
import AddBook from "./components/Books/AddBook";
import EditBook from "./components/Books/EditBook";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./components/DashBoard/AdminDashBoard";
import ManageUsers from "./components/DashBoard/ManageUsers";
import ManageBooks from "./components/DashBoard/ManageBooks";
import UserDashboard from "./components/DashBoard/UserDashboard";
import WriterDashboard from "./components/DashBoard/WriterDashboard";
import UpdateProfile from "./pages/UpdateProfile";

function App() {
    const [role, setRole] = useState(null);

    useEffect(() => {
        // Fetch the role from localStorage
        const userRole = localStorage.getItem("role");
        setRole(userRole); // Update the role state
    }, []);

    // Protect routes based on roles
    const ProtectedRoute = ({ children, allowedRoles }) => {
        const role = localStorage.getItem("role");
        if (!role) {
            localStorage.clear();
            return <Navigate to="/login" replace />;
        }

        if (!allowedRoles.includes(role)) {
            return <Navigate to="/" replace />;
        }

        return children;
    };

    // Dynamically render the navbar based on the role
    const renderNavbar = () => {
        
        if (role === "USER") return <UserNavbar />;
        if (role === "WRITER") return <WriterNavbar />;
        return <Navbar />;
    };

    return (
        <Router>
            {renderNavbar()}
            <div className="container mt-4">
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/books" element={<BookList />} />

                    {/* User-Specific Routes */}
                    <Route path="/admin-dashboard" element={
                        <ProtectedRoute allowedRoles={["ADMIN"]}>
                            <AdminDashboard />
                        </ProtectedRoute>
                    } />
                    <Route
                        path="/user-dashboard"
                        element={
                            <ProtectedRoute allowedRoles={["USER"]}>
                                <UserDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/update-profile"
                        element={
                            <ProtectedRoute allowedRoles={["USER"]}>
                                <UpdateProfile />
                            </ProtectedRoute>
                        }
                    />

                    {/* Writer-Specific Routes */}
                    <Route
                        path="/writer-dashboard"
                        element={
                            <ProtectedRoute allowedRoles={["WRITER"]}>
                                <WriterDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/edit-books"
                        element={
                            <ProtectedRoute allowedRoles={["WRITER"]}>
                                <EditBook />
                            </ProtectedRoute>
                        }
                    />

                    {/* Admin-Specific Routes */}
                    <Route
                        path="/admin-dashboard"
                        element={
                            <ProtectedRoute allowedRoles={["ADMIN"]}>
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/users"
                        element={
                            <ProtectedRoute allowedRoles={["ADMIN"]}>
                                <ManageUsers />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/books"
                        element={
                            <ProtectedRoute allowedRoles={["ADMIN"]}>
                                <ManageBooks />
                            </ProtectedRoute>
                        }
                    />

                    {/* Book Management */}
                    <Route
                        path="/books/add"
                        element={
                            <ProtectedRoute allowedRoles={["ADMIN", "WRITER"]}>
                                <AddBook />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/edit-book/:id"
                        element={
                            <ProtectedRoute allowedRoles={["ADMIN", "WRITER"]}>
                                <EditBook />
                            </ProtectedRoute>
                        }
                    />

                    {/* Fallback Route */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
            <Footer />
        </Router>
    );
}

export default App;
