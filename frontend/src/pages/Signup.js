import { useState } from "react";

function Signup() {
  const API = "https://panel-y8tg.onrender.com";

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [terms, setTerms] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      return alert("Passwords do not match");
    }

    if (!terms) {
      return alert("Please accept Terms");
    }

    const res = await fetch(`${API}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const data = await res.json();

    if (res.ok) {
      alert("Account created! Now login");
      window.location.href = "/";
    } else {
      alert(data.message || "Signup failed");
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
          <a href="/" style={{ color: "#38bdf8" }}>Login</a>
          <span>Services</span>
          <span>API</span>
          <span style={{ color: "#38bdf8" }}>Sign up</span>
        </div>
      </div>

      {/* MAIN */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 40
      }}>

        <div style={{
          background: "#1e293b",
          padding: 30,
          borderRadius: 10,
          maxWidth: 500,
          width: "100%"
        }}>

          <h2 style={{ textAlign: "center", marginBottom: 20 }}>
            Create Account
          </h2>

          <form onSubmit={handleSignup}>

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={inputStyle}
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              required
            />

            <input
              type="text"
              placeholder="WhatsApp Number"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              style={inputStyle}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              required
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              style={inputStyle}
              required
            />

            <div style={{ marginBottom: 10 }}>
              <input
                type="checkbox"
                checked={terms}
                onChange={() => setTerms(!terms)}
              />{" "}
              I agree to Terms
            </div>

            <button style={btnStyle}>Sign Up</button>

            <div style={{ textAlign: "center", marginTop: 15 }}>
              Already have an account?{" "}
              <span style={{ color: "#38bdf8", cursor: "pointer" }}>
                Login
              </span>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: 10,
  marginBottom: 10,
  borderRadius: 6,
  border: "none"
};

const btnStyle = {
  width: "100%",
  padding: 12,
  background: "#22c55e",
  border: "none",
  borderRadius: 6,
  color: "white",
  fontWeight: "bold",
  cursor: "pointer"
};

export default Signup;