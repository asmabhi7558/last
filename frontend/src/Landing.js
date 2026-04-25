import { motion } from "framer-motion";

function Landing({ onLoginClick }) {
  return (
    <div style={{
      height: "100vh",
      background: "linear-gradient(135deg, #6a11cb, #2575fc)",
      color: "white",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center"
    }}>

      {/* TITLE */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{ fontSize: 40 }}
      >
        🚀 Best SMM Panel
      </motion.h1>

      {/* SUBTITLE */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{ marginTop: 10 }}
      >
        Fast • Cheap • Reliable Social Media Services
      </motion.p>

      {/* BUTTON */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onLoginClick}
        style={{
          marginTop: 30,
          padding: "12px 25px",
          border: "none",
          borderRadius: 8,
          background: "#ff4757",
          color: "white",
          fontSize: 16,
          cursor: "pointer"
        }}
      >
        Get Started
      </motion.button>

      {/* FEATURES */}
      <div style={{
        display: "flex",
        gap: 20,
        marginTop: 50
      }}>

        {["⚡ Fast Delivery", "💰 Cheapest Prices", "🔒 Secure"].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.3 }}
            style={{
              background: "rgba(255,255,255,0.1)",
              padding: 20,
              borderRadius: 10
            }}
          >
            {item}
          </motion.div>
        ))}

      </div>
    </div>
  );
}

export default Landing;