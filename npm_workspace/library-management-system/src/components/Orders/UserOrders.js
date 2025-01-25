import React, { useEffect, useState } from "react";
import axios from "axios";

function UserOrders() {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUserOrders();
    }, []);

    const fetchUserOrders = async () => {
        try {
            const response = await axios.get("/user/orders", { withCredentials: true });
            setOrders(response.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
            setError("Failed to fetch orders. Please try again.");
        }
    };

    return (
        <div className="container mt-4">
            <h2>Your Orders</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <ul className="list-group">
                    {orders.map((order) => (
                        <li key={order.id} className="list-group-item">
                            {order.book.title} - {order.book.description} (${order.book.price})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default UserOrders;
