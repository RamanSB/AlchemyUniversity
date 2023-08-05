import express from "express";
import { secp256k1 as secp } from "ethereum-cryptography/secp256k1";
import cors from "cors";

const app = express();
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "3294b015bf761b4ac2d66a5c812f41f22782e6b6": 100,
  a02e429cec7e3772ad1ebb40d40de3f8ea316ea6: 50,
  "25ad505c8fa3167ea5f2b8c0adbafe9ac1421f97": 75,
};

// Keeps track of the underlying public key for a given address.
// Will be useful for checking if the public key associated with a signature matches the sending address.
const publicKeyByAddress = new Map([
  [
    "3294b015bf761b4ac2d66a5c812f41f22782e6b6",
    "03d3db9096e16ca9f2d8e6306e3294b015bf761b4ac2d66a5c812f41f22782e6b6",
  ],
  [
    "a02e429cec7e3772ad1ebb40d40de3f8ea316ea6",
    "024e4350ceb58b0983a0b445afa02e429cec7e3772ad1ebb40d40de3f8ea316ea6",
  ],
  [
    "25ad505c8fa3167ea5f2b8c0adbafe9ac1421f97",
    "03b47e161316bf2879800573c325ad505c8fa3167ea5f2b8c0adbafe9ac1421f97",
  ],
]);

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  try {
    const { sender, recipient, amount, signature, hashTxnHexString } = req.body;
    console.log(`[Server: /send] Signature: ${signature}`);
    console.log(hashTxnHexString);
    const isVerified = secp.verify(
      signature,
      hashTxnHexString,
      publicKeyByAddress.get(sender)
    );
    console.log(`Txn Verified: ${isVerified}`);
    if (!isVerified) {
      res.status(400).send({ message: "Invalid private key" });
    }
    setInitialBalance(sender);
    setInitialBalance(recipient);

    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    }
  } catch (error) {
    console.log(`Error whilst sending funds: ${error}`);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
