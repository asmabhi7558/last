import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const API = "https://panel-y8tg.onrender.com";

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [terms, setTerms] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirm) return alert("Passwords do not match");
    if (!terms) return alert("Accept terms");

    const res = await fetch(`${API}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      alert("Signup successful");
      navigate("/");
    } else {
      alert(data.message || "Signup failed");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#1a0f3c" }}>
      
      {/* NAVBAR */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px 40px",
        color: "white"
      }}>
        <h2>🔥 Cheapest SMM Panels</h2>

        <div style={{ display: "flex", gap: 20 }}>
          <span onClick={() => navigate("/")}>Sign in</span>
          <span>Services</span>
          <span>API</span>
          <span style={{ color: "#00d4ff" }}>Sign up</span>
        </div>
      </div>

      {/* CARD */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        marginTop: 40
      }}>
        <div style={{
          background: "white",
          padding: 30,
          borderRadius: 12,
          width: 400
        }}>

          <h3 style={{ textAlign: "center", marginBottom: 20 }}>
            Create Account
          </h3>

          <form onSubmit={handleSignup}>

            <input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={inputStyle}
            />

            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />

            <input
              placeholder="WhatsApp"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              style={inputStyle}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              style={inputStyle}
            />

            <div style={{ marginBottom: 10 }}>
              <input
                type="checkbox"
                checked={terms}
                onChange={() => setTerms(!terms)}
              />{" "}
              I agree to Terms of Service
            </div>

            <button style={btnStyle}>Sign up</button>

            <p style={{ textAlign: "center", marginTop: 10 }}>
              Already have an account?{" "}
              <span
                onClick={() => navigate("/")}
                style={{ color: "#007bff", cursor: "pointer" }}
              >
                Sign in
              </span>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: 12,
  marginBottom: 12,
  borderRadius: 8,
  border: "1px solid #ccc"
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

export default Signup;