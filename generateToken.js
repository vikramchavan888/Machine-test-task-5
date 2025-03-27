const { generateToken } = require("./utils/jwtUtils");

const token = generateToken({ user: "test" });
console.log("Generated Token:", token);
