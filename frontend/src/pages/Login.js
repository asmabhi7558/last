import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setToken }) {
  const navigate = useNavigate();
  const API = "https://panel-y8tg.onrender.com";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      navigate("/order");
    } else {
      alert(data.message || "Login failed");
    }
  };

  return (
<div style={{
  minHeight: "100vh",
  width: "100%",
  background: "#140a3c",
  margin: 0,
  padding: 0
}}>
      {/* NAVBAR */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px 40px"
      }}>
        <h2>🔥 Cheapest SMM Panels</h2>

        <div style={{ display: "flex", gap: 20 }}>
          <span>Sign in</span>
          <span>Services</span>
          <span>API</span>
          <span onClick={() => navigate("/signup")} style={{ cursor: "pointer" }}>
            Sign up
          </span>
        </div>
      </div>

      {/* HERO TEXT */}
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <h1>The Cheapest & Best SMM Panel For RESELLERS 🚀</h1>

        <ul style={{ marginTop: 10 }}>
          <li>Main Supplier of SMM Services</li>
          <li>WhatsApp Support ⚡</li>
          <li>Best price/quality</li>
          <li>Best panel support</li>
        </ul>
      </div>

      {/* LOGIN CARD */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        marginTop: 40
      }}>
        <div style={{
          background: "white",
          color: "black",
          padding: 25,
          borderRadius: 12,
          width: 420
        }}>

          <form onSubmit={handleLogin}>

            <div style={{ marginBottom: 10 }}>
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: 10 }}>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div style={{ textAlign: "right", marginBottom: 10 }}>
              <small>Forgot password?</small>
            </div>

            <button style={btnStyle}>Sign in</button>

            <p style={{ textAlign: "center", marginTop: 15 }}>
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                style={{ color: "#007bff", cursor: "pointer" }}
              >
                Sign up
              </span>
            </p>

          </form>
        </div>
      </div>

      {/* FOOTER TEXT */}
      <div style={{ textAlign: "center", marginTop: 60 }}>
        <h2>Best Indian SMM Followers Panel</h2>
        <p style={{ maxWidth: 600, margin: "auto" }}>
          SMM (Social Media Marketing) helps boost your online presence across
          Instagram, Facebook, Twitter, YouTube at the cheapest prices.
        </p>
      </div>

    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: 10,
  borderRadius: 8,
  border: "1px solid #ccc",
  marginTop: 5
};

const btnStyle = {
  width: "100%",
  padding: 12,
  background: "#2f4b6e",
  color: "white",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
  fontWeight: "bold"
};

export default Login;