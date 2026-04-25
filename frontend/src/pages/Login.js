import { useState } from "react";

function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const API = "https://last-zbl8.onrender.com";

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
    } else {
      alert(data.message);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", color: "white" }}>
      
      {/* NAVBAR */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 30px",
        borderBottom: "1px solid #1e293b"
      }}>
        <h2>SMM PANEL</h2>
        <div style={{ display: "flex", gap: 20 }}>
          <span>Sign in</span>
          <span>Services</span>
          <span>API</span>
          <a href="/signup" style={{ color: "#38bdf8" }}>Sign up</a>
        </div>
      </div>

      {/* MAIN */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 40
      }}>

        <div style={{ maxWidth: 900, width: "100%" }}>

          {/* TITLE */}
          <h1 style={{ textAlign: "center", marginBottom: 20 }}>
            Cheapest & Best SMM Panel 🚀
          </h1>

          {/* FEATURES */}
          <ul style={{ textAlign: "center", marginBottom: 30 }}>
            <li>Main Supplier of SMM Services</li>
            <li>WhatsApp Support ⚡</li>
            <li>Best Price Guarantee</li>
            <li>Top Panel Support</li>
          </ul>

          {/* LOGIN CARD */}
          <div style={{
            background: "#1e293b",
            padding: 30,
            borderRadius: 10,
            maxWidth: 500,
            margin: "auto"
          }}>

            <form onSubmit={handleLogin}>
              
              <div style={{ marginBottom: 15 }}>
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={inputStyle}
                  required
                />
              </div>

              <div style={{ marginBottom: 15 }}>
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={inputStyle}
                  required
                />
              </div>

              <div style={{ textAlign: "right", marginBottom: 10 }}>
                <small style={{ cursor: "pointer" }}>
                  Forgot password?
                </small>
              </div>

              <button style={btnStyle}>Sign In</button>

              <div style={{ marginTop: 15, textAlign: "center" }}>
                <p>Don't have an account?</p>
    <a href="/signup" style={{ color: "#38bdf8" }}>Sign up</a>
        </div>
                </span>
              </div>

            </form>

          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: 10,
  borderRadius: 6,
  border: "none",
  marginTop: 5
};

const btnStyle = {
  width: "100%",
  padding: 12,
  background: "#3b82f6",
  border: "none",
  borderRadius: 6,
  color: "white",
  fontWeight: "bold",
  cursor: "pointer"
};

export default Login;