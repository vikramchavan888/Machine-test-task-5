const express = require("express");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const axios = require("axios");

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Configuration: secret key and target API endpoint
const JWT_SECRET = "your_jwt_secret";
const TARGET_API_URL = "https://target-api.example.com/endpoint";

// Authentication middleware using JWT
function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
}

// Request validation middleware using express-validator
const validatePayload = [
  body("data")
    .exists()
    .withMessage("data is required")
    .isObject()
    .withMessage("data must be an object"),
  // Add more validation rules as needed...
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// API forwarding middleware
async function forwardRequest(req, res) {
  try {
    // Forwarding the validated request payload to another API
    const response = await axios.post(TARGET_API_URL, req.body, {
      headers: { "Content-Type": "application/json" },
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error forwarding the request:", error);
    res.status(500).json({ error: "Failed to forward the request" });
  }
}

// Combine middleware in a single route
app.post(
  "/api/middleware-endpoint",
  authenticateJWT,
  validatePayload,
  forwardRequest
);

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` service is running on port ${PORT}`);
});
