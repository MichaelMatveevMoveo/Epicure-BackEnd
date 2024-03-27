const crypto = require("crypto");

// Generate a secure random buffer
const generateSecureKey = () => {
  return crypto.randomBytes(32).toString("hex"); // 32 bytes = 256 bits
};

// Generate the secret key
const secretKey = generateSecureKey();

console.log("Generated secret key:", secretKey);
