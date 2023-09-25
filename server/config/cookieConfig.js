const crypto = require("crypto");

// define the encryption algorithm, key, and IV
const algorithm = process.env.ENCRYPTION_ALGORITHM; // AES encryption with a 256-bit key in CBC mode
const key = process.env.ENCRYPTION_KEY; // a 256-bit (32-byte) key in hexadecimal format
const iv = process.env.IV; // a 128-bit (16-byte) IV in hexadecimal format

function encryptData(data) {
  const dataString = JSON.stringify(data);

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  return Buffer.from(
    cipher.update(dataString, "utf8", "hex") + cipher.final("hex")
  ).toString("base64"); // Encrypts data and converts to hex and base64
}

function decryptData(encryptedData) {
  const buff = Buffer.from(encryptedData, "base64");
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  return (
    decipher.update(buff.toString("utf8"), "hex", "utf8") +
    decipher.final("utf8")
  ); // Decrypts data and converts to utf8
}

module.exports = { encryptData, decryptData };
