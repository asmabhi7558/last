import { useState } from "react";
import { motion } from "framer-motion";

function AddFunds() {
  const [method, setMethod] = useState("upi");

  const handlePayment = () => {
    window.open("https://rzp.io/rzp/cAxwt7IH");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      style={container}
    >
      {/* ICON */}
      <div style={{ fontSize: 30, marginBottom: 15 }}>💳</div>

      {/* TITLE */}
      <h2 style={{ marginBottom: 20 }}>Add Funds</h2>

      {/* PAYMENT OPTION */}
<div
  onClick={() => setMethod("upi")}
  style={{
    ...paymentOption,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 18px",
    border:
      method === "upi"
        ? "2px solid #ff7e5f"
        : "2px solid rgba(0,0,0,0.1)",
    background: "#fff", // ✅ FIX visibility
    color: "#333"       // ✅ FIX text color
  }}
>
  {/* LEFT SIDE */}
<div style={{ display: "flex", alignItems: "center", gap: 10 }}>
<img
  src="/upi.png"
  alt="UPI"
  style={{
    width: 24,
    height: 24,
    objectFit: "contain"
  }}
/>
  <span style={{ fontWeight: 500 }}>UPI Payment</span>
</div>

  {/* RIGHT SIDE CHECK */}
  {method === "upi" && (
    <span style={{ color: "#ff7e5f", fontWeight: "bold" }}>✔</span>
  )}
</div>
      {/* BUTTON */}
      <motion.button
        onClick={handlePayment}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={button}
      >
        Add Funds
      </motion.button>
    </motion.div>
  );
}
const container = {
  maxWidth: 420,
  margin: "80px auto",
  padding: 25,
  borderRadius: 16,
  background: "rgba(255,255,255,0.1)",
  backdropFilter: "blur(15px)",
  color: "white",
  textAlign: "center",
  boxShadow: "0 10px 40px rgba(0,0,0,0.2)"
};

const paymentOption = {
  borderRadius: 10,
  background: "rgba(255,255,255,0.08)",
  cursor: "pointer",
  marginBottom: 20,
  transition: "0.3s"
};

const button = {
  width: "100%",
  padding: 14,
  background: "linear-gradient(135deg, #ff7e5f, #feb47b)",
  border: "none",
  borderRadius: 10,
  color: "white",
  fontWeight: "bold",
  fontSize: 16,
  cursor: "pointer"
};

export default AddFunds;