import { secp256k1 as secp } from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";

function generateCryptoraphicKeys() {
  const privateKey = secp.utils.randomPrivateKey(); // Uint8Array
  console.log(`PrivateKey: ${toHex(privateKey)}`);

  const publicKey = secp.getPublicKey(privateKey); //Uint8Array
  console.log(`PublicKey: ${toHex(publicKey)}`);

  // The address is the last 20 bytes of the public key
  const address = publicKey.slice(publicKey.length - 20, publicKey.length);
  console.log(`Address: ${toHex(address)}`);
}

const args = process.argv;
const scriptFilename = args[1];
const noOfKeys = args[2] || 3;

console.log(
  `Executing Script: ${scriptFilename.substring(
    scriptFilename.lastIndexOf("/")
  )}`
);

if (!args[2]) {
  console.log(
    `No number of wallets detected: defaulting to creating 3 wallets`
  );
} else {
  console.log(`Generating ${args[2]} wallets...\n`);
}

for (let i = 0; i < noOfKeys; i++) {
  console.log(`Generating Wallet #${i + 1}`);
  generateCryptoraphicKeys();
  console.log(`====================================`);
}
