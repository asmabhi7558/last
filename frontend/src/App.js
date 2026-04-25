import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Landing from "./Landing";
import { useNavigate, Routes, Route } from "react-router-dom";
import { useCallback } from "react";
import Profile from "./pages/Profile";
import Order from "./pages/Order";
import Services from "./pages/Services";
import Orders from "./pages/Orders";
import AddFunds from "./pages/AddFunds";

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
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

  // LOGIN
  const handleLogin = async () => {
    try {
      const res = await fetch("https://panel-y8tg.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        showToast("Login successful", "success");
        navigate("/order");
      } else {
        showToast(data.message || "Login failed", "error");
      }
    } catch {
      showToast("Server not reachable", "error");
    }
  };

  // SIGNUP
  const handleSignup = async () => {
    try {
      const res = await fetch("https://panel-y8tg.onrender.com/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (data.code === "23505") {
        showToast("Account already exists", "error");
        setIsSignup(false);
        return;
      }

     await handleLogin();
    } catch {
      showToast("Signup error", "error");
    }
  };

  // USER
const getUser = useCallback(async () => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const res = await fetch("https://your-backend.onrender.com/me", {
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

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    showToast("Logged out", "success");
  };

  // LANDING
  if (showLanding) {
    return (
      <>
        <Landing onLoginClick={() => setShowLanding(false)} />
        <Toast toast={toast} />
      </>
    );
  }

  // LOGIN
  if (!token) {
    return (
      <>
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  style={{
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #5f2c82, #49a09d)"
  }}
>
  <div style={{
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(15px)",
    padding: 40,
    borderRadius: 16,
    width: 320,
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    color: "white"
  }}>

    <h2 style={{ textAlign: "center", marginBottom: 20 }}>
      {isSignup ? "Create Account" : "Welcome Back"}
    </h2>

    <input
      placeholder="Email"
      onChange={(e) => setEmail(e.target.value)}
      style={{
        width: "100%",
        padding: 12,
        marginBottom: 12,
        borderRadius: 8,
        border: "none",
        outline: "none"
      }}
    />

    <input
      type="password"
      placeholder="Password"
      onChange={(e) => setPassword(e.target.value)}
      style={{
        width: "100%",
        padding: 12,
        marginBottom: 20,
        borderRadius: 8,
        border: "none",
        outline: "none"
      }}
    />

    <button
      onClick={isSignup ? handleSignup : handleLogin}
      style={{
        width: "100%",
        padding: 12,
        borderRadius: 8,
        border: "none",
        background: "linear-gradient(135deg, #ff7e5f, #feb47b)",
        color: "white",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "0.3s"
      }}
      onMouseOver={(e) => e.target.style.opacity = 0.9}
      onMouseOut={(e) => e.target.style.opacity = 1}
    >
      {isSignup ? "Sign Up" : "Login"}
    </button>

    <p style={{ marginTop: 15, textAlign: "center" }}>
      {isSignup ? "Already have an account?" : "Don't have an account?"}
      <br />
      <span
        onClick={() => setIsSignup(!isSignup)}
        style={{
          cursor: "pointer",
          color: "#ffd369",
          fontWeight: "bold"
        }}
      >
        {isSignup ? "Login" : "Sign Up"}
      </span>
    </p>

  </div>
</motion.div>
        <Toast toast={toast} />
      </>
    );
  }

  // DASHBOARD
  return (
    <>

{/* ☰ BUTTON */}
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
          <Route path="/" element={<Order getUser={getUser} />} />
            <Route path="/profile" element={<Profile logout={logout} user={user} />} />
            <Route path="/order" element={<Order getUser={getUser} />} />
            <Route path="/services" element={<Services />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/addfunds" element={<AddFunds />} />
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