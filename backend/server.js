require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json());

const supabase = require("./supabaseClient");

// 🔐 AUTH MIDDLEWARE
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log("AUTH HEADER:", authHeader); // 👈 DEBUG

  if (!authHeader) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    const token = authHeader.split(" ")[1];

    console.log("TOKEN RECEIVED:", token); // 👈 DEBUG

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("DECODED USER:", decoded); // 👈 DEBUG

    req.user = decoded;

    next();
  } catch (err) {
    console.log("JWT ERROR:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
};

// HOME
app.get("/", (req, res) => res.send("Backend working"));

// TEST
app.get("/test", async (req, res) => {
  const { data, error } = await supabase.from("users").select("*");
  if (error) return res.json(error);
  res.json(data);
});

// SIGNUP
app.post("/signup", async (req, res) => {
  const email = req.body.email.trim().toLowerCase();
  const password = req.body.password;

  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from("users")
    .insert([{ email, password: hashedPassword, balance: 0 }]);

  if (error) return res.status(500).json(error);

  res.json({ message: "User created", data });
});

// LOGIN
app.post("/login", async (req, res) => {
  const email = req.body.email.trim().toLowerCase();
  const password = req.body.password;

  const { data: users } = await supabase
    .from("users")
    .select("*")
    .eq("email", email);

  if (!users || users.length === 0) {
    return res.status(400).json({ message: "User not found" });
  }

  const user = users[0];

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid password" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ message: "Login successful", token });
});

// GET USER
app.get("/me", authenticate, async (req, res) => {
  const userId = req.user.id;

  const { data, error } = await supabase
    .from("users")
    .select("id, email, balance")
    .eq("id", userId)
    .single();

  if (error) return res.status(500).json(error);

  res.json(data);
});

// ADD BALANCE
app.post("/add-balance", authenticate, async (req, res) => {
  const { amount } = req.body;
  const userId = req.user.id;

  const { data: userData } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  const newBalance = (Number(userData.balance) || 0) + Number(amount);

  await supabase
    .from("users")
    .update({ balance: newBalance })
    .eq("id", userId);

  res.json({ message: "Balance added", balance: newBalance });
});

// CREATE ORDER
app.post("/order", authenticate, async (req, res) => {
  const { service, link, quantity } = req.body;
  const userId = req.user.id;

  const pricePerUnit = 0.01;
  const totalCost = Number(quantity) * pricePerUnit;

  const { data: userData } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  const balance = Number(userData.balance) || 0;

  if (balance < totalCost) {
    return res.status(400).json({ message: "Insufficient balance" });
  }

  const newBalance = balance - totalCost;

  await supabase
    .from("users")
    .update({ balance: newBalance })
    .eq("id", userId);

  const { data } = await supabase
    .from("orders")
    .insert([
      {
        user_id: userId,
        service,
        link,
        quantity,
        status: "pending"
      }
    ])
    .select();

  res.json({
    message: "Order created",
    remaining_balance: newBalance,
    data
  });
});

// GET ORDERS
app.get("/my-orders", authenticate, async (req, res) => {
  const userId = req.user.id;

  const { data } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", userId)
    .order("id", { ascending: false });

  res.json(data);
});
app.get("/services", async (req, res) => {
    const { data, error } = await supabase.from("services").select("*");
  
    if (error) return res.status(500).json(error);
  
    res.json(data);
  });
// START
app.listen(5000, () => console.log("Server running on port 5000"));