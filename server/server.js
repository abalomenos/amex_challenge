const express = require("express");

const app = express();

// Simple Route
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

// Set port
const PORT = process.env.PORT || 3001;

// Listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
