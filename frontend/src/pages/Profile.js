import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile({ logout, user })  {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [newEmail, setNewEmail] = useState("");
    
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

  const changeEmail = () => {
    if (!newEmail) return alert("Enter new email");
    setEmail(newEmail);
    setNewEmail("");
    alert("Email updated");
  };

  const changePassword = () => {
    if (newPassword !== confirmPassword) {
      return alert("Passwords do not match");
    }
    alert("Password changed");
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      padding: 30
    }}>
      <div style={{
        background: "white",
        padding: 30,
        borderRadius: 12,
        width: 400,
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
      }}>

        <h2 style={{ marginBottom: 20 }}>👤 Profile</h2>

        {/* EMAIL */}
        <label>Email</label>
        <input
        value={user?.email || ""}
        readOnly
          style={{
            width: "100%",
            padding: 10,
            marginTop: 5,
            marginBottom: 15,
            borderRadius: 6,
            border: "1px solid #ccc"
          }}
        />

        <input
          placeholder="Enter new email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 10,
            borderRadius: 6,
            border: "1px solid #ccc"
          }}
        />

        <button
          onClick={changeEmail}
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 25,
            background: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer"
          }}
        >
          Change Email
        </button>
        <button
  onClick={() => {
    logout();           // remove token
    navigate("/");      // go to login
  }}
  style={{
    marginTop: 20,
    width: "100%",
    padding: 12,
    border: "none",
    borderRadius: 8,
    background: "#ff4757",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  }}
>
  Logout
</button>
        {/* PASSWORD */}
        <h3 style={{ marginBottom: 10 }}>🔒 Change Password</h3>

        <input
          type="password"
          placeholder="Current password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="New password"
          onChange={(e) => setNewPassword(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Confirm new password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={inputStyle}
        />

        <button
          onClick={changePassword}
          style={{
            width: "100%",
            padding: 10,
            background: "#111827",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer"
          }}
        >
          Change Password
        </button>

      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: 10,
  marginBottom: 10,
  borderRadius: 6,
  border: "1px solid #ccc"
};


export default Profile;