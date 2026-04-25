import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "../supabase";
import Swal from "sweetalert2";

function Order({ getUser }) {
  const [services, setServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [link, setLink] = useState("");
  const [quantity, setQuantity] = useState("");
  const [user, setUser] = useState(null);
  const [orders] = useState([]);

  // 🔹 Fetch services
  useEffect(() => {
    const getServices = async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*");

      if (error) {
        console.error(error);
      } else {
        console.log("SERVICES:", data);
        setServices(data || []);
      }
    };

    getServices();
  }, []);

  // 🔹 Fetch user + orders
useEffect(() => {
  const token = localStorage.getItem("token");

  console.log("TOKEN:", token); // 👈 debug

  if (!token) {
    console.log("No token found");
    return;
  }
fetch("https://panel-y8tg.onrender.com/me", {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
    
  }
})
    .then(res => res.json())
    .then(data => {
      console.log("USER DATA:", data);

      // works for both backend formats
      setUser(data.user || data);
    })
    .catch(err => console.error(err));
}, []);

  // 🔹 Create Order
  const createOrder = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      Swal.fire("Error", "Please login again", "error");
      return;
    }

    if (!selectedService || !link || !quantity) {
      Swal.fire("Error", "Fill all fields", "error");
      return;
    }

    try {
      const res = await fetch("https://panel-y8tg.onrender.com/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          service: selectedService.name,
          link,
          quantity: Number(quantity)
        })
      });

      const data = await res.json();

      if (!res.ok) {
        Swal.fire("Error", data.message || "Failed", "error");
        return;
      }

      Swal.fire("Success", "Order placed!", "success");

      if (getUser) getUser();

      setLink("");
      setQuantity("");
      setSelectedService(null);

    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Server error", "error");
    }
  };

  // 🔹 Total calculation
  const total =
    selectedService && quantity
      ? ((quantity / 1000) * selectedService.price).toFixed(2)
      : 0;

  return (
<motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  style={container}
>
      <h2 style={{ color: "red" }}>
        ✨ <b>We believe in quality over quantity</b>
      </h2>

      {/* DASHBOARD */}
<div style={dashboard}>
  {[ 
    { title: user?.email || "Loading...", sub: "Welcome" },
    { title: `₹${user?.balance ?? 0}`, sub: "Balance" },
    { title: 151375 + (orders?.length || 0), sub: "Total Orders" }
  ].map((item, i) => (
    <motion.div
      key={i}
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.2 }}
      style={card}
    >
      <h3>{item.title}</h3>
      <p>{item.sub}</p>
    </motion.div>
  ))}
</div>

      {/* CATEGORY */}
<label style={label}>Category</label>
<select
  onChange={(e) => setSelectedCategory(e.target.value)}
  style={input}
>
        <option value="">Select Category</option>
        {[...new Set(services.map(s => s.category))].map((cat, i) => (
          <option key={i} value={cat}>{cat}</option>
        ))}
      </select>

      {/* SERVICE */}
      <label style={label}>Service</label>
      <select
onChange={(e) => {
  const value = e.target.value;

  const s = services.find(
    item => item.id.toString() === value
  );

  console.log("SELECTED SERVICE FULL:", s); // 👈 IMPORTANT

  setSelectedService(s);
}}
        style={input}
      >
        <option value="">Select Service</option>

        {services
          .filter(s => s.category === selectedCategory)
          .map(s => (
            <option key={s.id} value={s.id}>
              {s.name} (₹{s.price})
            </option>
          ))}
      </select>

      {/* DESCRIPTION */}
      {selectedService && (
        <>
        <label style={label}>Description</label>
          <div style={descBox}>
            {selectedService.description ?? "No description available"}
          </div>
        </>
      )}

      {/* LINK */}
      <label style={label}>Link</label>
      <input
        value={link}
        onChange={(e) => setLink(e.target.value)}
        style={input}
        placeholder="Enter link"
      />

      {/* QUANTITY */}>
      <label style={label}>Quantity</label>
      <input
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        style={input}
        placeholder="Enter quantity"
      />

      {/* TOTAL */}
<motion.div
  key={total}
  initial={{ scale: 0.9 }}
  animate={{ scale: 1 }}
  style={totalBox}
>
  Total Price: ₹{total}
</motion.div>

      {/* BUTTON */}
 <motion.button
  onClick={createOrder}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  style={button}
>
  Submit Order
</motion.button>
    </motion.div>
  );
}
const container = {
  maxWidth: 650,
  margin: "40px auto",
  padding: 30,
  borderRadius: 20,
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(20px)",
  boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
  color: "white",
  border: "1px solid rgba(255,255,255,0.1)"
};

const dashboard = {
  display: "flex",
  gap: 15,
  marginBottom: 20
};

const card = {
  flex: 1,
  background: "linear-gradient(135deg, #667eea, #764ba2)",
  padding: 18,
  borderRadius: 14,
  textAlign: "center",
  boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
  cursor: "pointer",
  transition: "0.3s"
};

const input = {
  width: "100%",
  padding: 12,
  marginBottom: 15,
  borderRadius: 12,
  background: "#1e1e2f",
  color: "#fff",
  border: "1px solid #3a3a5a",
  outline: "none",
  transition: "0.3s",
};
const descBox = {

  background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
  color: "#ffffff",
  padding: 14,
  borderRadius: 12,
  marginBottom: 12,
  boxShadow: "0 10px 30px rgba(0,0,0,0.4)"
  
};
const totalBox = {
  padding: 12,
  borderRadius: 10,
  background: "linear-gradient(135deg, #26a09a, #7f57a7)",
  textAlign: "center",
  fontWeight: "bold"
};
const label = {
  color: "#7c8cff",   // 🔥 subtle purple-blue
  fontSize: 13,
  fontWeight: "600",
  marginBottom: 6,
  display: "block"
};
const button = {
  width: "100%",
  padding: 14,
  marginTop: 15,
  background: "linear-gradient(135deg, #ff7e5f, #feb47b)",
  color: "white",
  border: "none",
  borderRadius: 12,
  cursor: "pointer",
  boxShadow: "0 10px 30px rgba(255,126,95,0.4)"
};

export default Order;