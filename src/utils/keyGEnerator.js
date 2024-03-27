const forge = require("node-forge");

// Function to generate public and private key pair
function generateKeyPair() {
  // Generate an RSA key pair with a key size of 2048 bits
  const keyPair = forge.pki.rsa.generateKeyPair({ bits: 2048 });

  // Convert keys to PEM format
  const privateKeyPem = forge.pki.privateKeyToPem(keyPair.privateKey);
  const publicKeyPem = forge.pki.publicKeyToPem(keyPair.publicKey);

  return { privateKeyPem, publicKeyPem };
}

// Generate key pair
const { privateKeyPem, publicKeyPem } = generateKeyPair();

// Print the generated keys
console.log("Private Key:\n", privateKeyPem);
console.log("Public Key:\n", publicKeyPem);
