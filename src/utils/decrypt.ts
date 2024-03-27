const forge = require("node-forge");
const jwt = require("jsonwebtoken");

const SERVER_API_SECRET_KEY = process.env.SERVER_API_SECRET_KEY || "";

export function decryptDataForge(encryptedData: string): string {
  try {
    const privateKey = forge.pki.privateKeyFromPem(SERVER_API_SECRET_KEY);
    const decryptedPasswordBytes = privateKey.decrypt(
      forge.util.decode64(encryptedData)
    );
    const decryptedPassword = decryptedPasswordBytes.toString();
    return decryptedPassword;
  } catch (error) {
    console.error("Error decrypting data:", error);
    return ""; // Return an empty string or handle the error as per your application's requirement
  }
}
const JWT_API_KEY = process.env.JWT_API_KEY || "";

export function createTokenJWT(user: {
  name: string;
  mail: string;
  role: string;
}): string {
  const token = jwt.sign(user, JWT_API_KEY, { expiresIn: "1h" });
  return token;
}

export async function getInfoTokenJWT(token: string): Promise<string> {
  return await jwt.verify(token, JWT_API_KEY);
}

export async function checkTokenJWT(token: string): Promise<string> {
  return await jwt.verify(token, JWT_API_KEY);
}
