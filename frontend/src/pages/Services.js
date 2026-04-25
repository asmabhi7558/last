import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../supabase";

function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*");

      if (error) {
        console.error("Error fetching services:", error);
      } else {
        setServices(data);
      }
    };

    fetchServices();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        maxWidth: 900,
        margin: "40px auto",
        padding: 20,
        color: "white"
      }}
    >
      <h2 style={{
        marginBottom: 20,
        fontWeight: "500",
        letterSpacing: 1
      }}>
        🚀 Available Services
      </h2>

      {/* CATEGORY GROUPING */}
      {[...new Set(services.map(s => s.category))].map((cat) => (
        <div key={cat} style={{ marginBottom: 30 }}>
          
          <h3 style={{
            marginBottom: 15,
            color: "#ff7e5f"
          }}>
            {cat}
          </h3>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 15
          }}>
            {services
              .filter(s => s.category === cat)
              .map(service => (
                <motion.div
                  key={service.id}
                  whileHover={{ y: -5, scale: 1.02 }}
                  style={card}
                >
                  <h4 style={{ marginBottom: 5 }}>
                    {service.name}
                  </h4>

                  <p style={{ fontSize: 14, opacity: 0.8 }}>
                    {service.description || "No description"}
                  </p>

                  <p style={{
                    marginTop: 10,
                    fontWeight: "bold",
                    color: "#00ffcc"
                  }}>
                    ₹{service.price}
                  </p>

                  {/* OPTIONAL BUTTON */}
                  <button
                    style={button}
                    onClick={() => alert(`Selected: ${service.name}`)}
                  >
                    Buy Now
                  </button>
                </motion.div>
              ))}
          </div>

        </div>
      ))}
    </motion.div>
  );
}

const card = {
  background: "linear-gradient(135deg, #5f2c82, #49a09d)",
  padding: 15,
  borderRadius: 12,
  boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
};

const button = {
  marginTop: 10,
  padding: "8px 12px",
  border: "none",
  borderRadius: 8,
  background: "#ff7e5f",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
  width: "100%"
};

export default Services;