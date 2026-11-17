const express = require("express");
const cors = require("cors");

const app = express();

// Enable CORS
app.use(cors());

// Root route (optional)
app.get("/", (req, res) => {
  res.send("TechMagpies server is running 🚀");
});

// Start server
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});