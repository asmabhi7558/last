import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Routes, Route } from "react-router-dom";
import { useCallback } from "react";
import Profile from "./pages/Profile";
import Order from "./pages/Order";
import Services from "./pages/Services";
import Orders from "./pages/Orders";
import AddFunds from "./pages/AddFunds";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const API = "https://panel-y8tg.onrender.com"; // ✅ ADD THIS

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: ""
  });

  const navigate = useNavigate();

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 3000);
  };

  // SIGNUP

  // USER
const getUser = useCallback(async () => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const res = await fetch(`${API}/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // ✅ check before parsing JSON
    if (!res.ok) {
      console.log("API error:", res.status);
      return;
    }

    const data = await res.json();

    console.log("USER DATA:", data);

    setUser(data.user || data);

  } catch (err) {
    console.error("Fetch error:", err);
  }
}, []);
useEffect(() => {
  if (token) getUser();
}, [token, getUser]);

useEffect(() => {
  const savedToken = localStorage.getItem("token");
  if (savedToken) setToken(savedToken);
}, []);
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    showToast("Logged out", "success");
  };

  // LOGIN


  // DASHBOARD
  return (
    <>

{/* ☰  BUTTON */}
<div
  onClick={() => setShowSidebar(false)}
  style={{
    fontSize: 10,
    cursor: "pointer",
    marginBottom: 120
  }}
>
</div>
{/* ☰ BUTTON */}
<div
    onClick={() => setShowSidebar(true)}
    style={{
      position: "fixed",
      top: 12,
      left: 12,
      fontSize: 16,          // 👈 smaller icon
      cursor: "pointer",
      zIndex: 1000,
      background: "#fff",
      padding: "4px 8px",    // 👈 smaller box
      borderRadius: 5,
      boxShadow: "0 1px 4px rgba(0,0,0,0.2)"
    }}
  >
    ☰
  </div>
  
      <div style={{ display: "flex" }}>

        {/* SIDEBAR */}
        {showSidebar && (
  <div style={{
    position: "fixed",
    top: 0,
    left: 0,
    width: 220,
    height: "100vh",
    background: "#2c2c54",
    color: "white",
    padding: 20,
    zIndex: 999
  }}>
    {/* YOUR SIDEBAR CONTENT HERE */}
    <h2 style={{ marginBottom: 20 }}>🔥 SMM Panel</h2>

    <p onClick={() => { navigate("/"); setShowSidebar(false); }}>🏠 Home</p>
<p onClick={() => { navigate("/profile"); setShowSidebar(false); }}>👤 Profile</p>
<p onClick={() => { navigate("/addfunds"); setShowSidebar(false); }}>
  💰 Add Funds
</p>
<p onClick={() => { navigate("/services"); setShowSidebar(false); }}>⚙️ Services</p>
<p onClick={() => { navigate("/orders"); setShowSidebar(false); }}>📦 Orders</p>
  </div>
)}

        {/* MAIN */}
        <div style={{ flex: 1, padding: 20 }}>
<Routes>
  {!token ? (
    <>
      <Route path="/" element={<Login setToken={setToken} />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Login setToken={setToken} />} />
    </>
  ) : (
    <>
      <Route path="/" element={<Order getUser={getUser} />} />
      <Route path="/order" element={<Order getUser={getUser} />} />
      <Route path="/profile" element={<Profile logout={logout} user={user} />} />
      <Route path="/services" element={<Services />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/addfunds" element={<AddFunds />} />
      <Route path="*" element={<Order getUser={getUser} />} />
    </>
  )}
</Routes>
        </div>

      </div>

      <Toast toast={toast} />
    </>
  );
}

// TOAST
function Toast({ toast }) {
  return (
    <AnimatePresence>
      {toast.show && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
  style={{
  position: "fixed",
  top: 20,
  right: 20,
  background: toast.type === "error" ? "#ff4757" : "#2ed573",
  color: "white",
  padding: 15,
  borderRadius: 8
}}
        >
          {toast.message}
        </motion.div>
      )}
      </AnimatePresence>
  );
}

export default App;