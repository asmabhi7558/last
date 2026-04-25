import { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("https://last-zbl8.onrender.com/my-orders", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log("ORDERS DATA:", data); // 👈 DEBUG
        setOrders(data || []);
      })
      .catch(err => {
        console.error("FETCH ERROR:", err);
      });
  }, []);

return (
  <div style={{ maxWidth: 1000, margin: "40px auto", color: "white" }}>
    <h2 style={{ marginBottom: 20 }}>📦 Orders Page</h2>

    {/* HEADER */}
    <div style={tableHeader}>
      <p>ID</p>
      <p>Service</p>
      <p>Time</p>
      <p>Qty</p>
      <p>Price</p>
      <p>Status</p>
    </div>

    {/* ROWS */}
    {orders.map((order, i) => (
      <div key={order.id} style={tableRow}>
        <p>{order.id}</p>
        <p>{order.service}</p>
        <p>{order.created_at ? new Date(order.created_at).toLocaleString() : "N/A"}</p>
        <p>{order.quantity || "-"}</p>
        <p>₹{order.price || "-"}</p>
        <p style={getStatusStyle(order.status || "Pending")}>
          {order.status || "Pending"}
        </p>
      </div>
    ))}
  </div>
);
}const tableHeader = {
  display: "grid",
  gridTemplateColumns: "1fr 2fr 2fr 1fr 1fr 1fr",
  padding: 12,
  background: "rgba(0,0,0,0.6)",
  borderRadius: 10,
  fontWeight: "bold"
};

const tableRow = {
  display: "grid",
  gridTemplateColumns: "1fr 2fr 2fr 1fr 1fr 1fr",
  padding: 12,
  marginTop: 10,
  background: "rgba(255,255,255,0.08)",
  borderRadius: 10
};

const getStatusStyle = (status) => {
  switch (status) {
    case "Completed":
      return { color: "#00ffcc" };
    case "Pending":
      return { color: "#ffaa00" };
    case "Cancelled":
      return { color: "red" };
    default:
      return {};
  }
};

export default Orders;