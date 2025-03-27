const jwt = require("jsonwebtoken");
const fs = require("fs");
require("dotenv").config(); 


const JWT_SECRET = "your_jwt_secret";

// Check if JWT_SECRET is provided
if (!JWT_SECRET) {
  console.error("Error: JWT_SECRET is not set in the environment variables.");
  process.exit(1); // Exit the script if the secret is missing
}

// Generate a token with a sample payload
const payload = { user: "test" }; // Example payload
const options = { expiresIn: "1h" }; // Token expiration time

try {
  const token = jwt.sign(payload, JWT_SECRET, options);
  console.log("Generated JWT Token:", token);
  console.log("Token saved to generated_token.txt");
} catch (err) {
  console.error("Error generating token:", err.message);
}
