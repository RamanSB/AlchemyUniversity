import { useState, useEffect } from "react";
import server from "./server";
import { secp256k1 as secp } from "ethereum-cryptography/secp256k1";
import { utf8ToBytes, toHex } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";

function Transfer({ senderAddress, setBalance, privateKey, setTxnHistory }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [signature, setSignature] = useState("");
  const [disableTransfer, setDisableTransfer] = useState(false);

  useEffect(() => {
    console.log(`PrivateKey: ${privateKey}`);
    console.log(`SendAmount: ${sendAmount}`);
    console.log(`Sender Address: ${senderAddress}`);
    console.log(`Recipient Address: ${recipient}`);
    if (privateKey && sendAmount && recipient && senderAddress) {
      if (recipient === senderAddress) {
        setDisableTransfer(true);
      } else {
        setDisableTransfer(false);
      }
      const transaction = `${senderAddress} sends ${sendAmount}ETH to ${recipient}`; // String
      console.log(`Transaction: ${transaction}`);
      const txnBytes = utf8ToBytes(transaction); // Encode string as utf8 and transform to bytes
      console.log(`Transaction Bytes: ${txnBytes}`);
      const hashTxn = keccak256(txnBytes); // Requires to sign Uint8array & returns Uint8Array must convert to Hex
      console.log(`Txn Hash: ${hashTxn}`);
      const hashTxnHexString = toHex(hashTxn);
      console.log(`TxnHashHexString: ${hashTxnHexString}`);
      const signedTxn = secp.sign(hashTxnHexString, privateKey, {});
      console.log("Signature:", signedTxn.toCompactHex());
      setSignature(signedTxn.toCompactHex());
    }
  }, [senderAddress, recipient, sendAmount, privateKey]);

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    try {
      const transaction = `${senderAddress} sends ${sendAmount}ETH to ${recipient}`; // String
      const txnBytes = utf8ToBytes(transaction); // Encode string as utf8 and transform to bytes
      const hashTxn = keccak256(txnBytes); // Requires to sign Uint8array & returns Uint8Array must convert to Hex
      const hashTxnHexString = toHex(hashTxn);

      const data = await server.post(`send`, {
        sender: senderAddress,
        amount: parseInt(sendAmount),
        recipient,
        signature,
        hashTxnHexString,
      });

      if (data.status !== 400) {
        setBalance(data.balance);
        setTxnHistory((txnHistory) => {
          txnHistory.add(
            `${transaction} | ${hashTxnHexString.slice(
              0,
              20
            )}...${hashTxnHexString.slice(hashTxnHexString.length - 20)}`
          );
          return txnHistory;
        });
      } else {
        console.log(data.message);
      }
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <div className="txnSignature">
        Txn Signature: {signature.slice(0, 20)}...
        {signature.slice(signature.length - 20)}
      </div>

      <input
        type="submit"
        className="button"
        value="Transfer"
        disabled={disableTransfer}
      />
      {disableTransfer && (
        <p style={{ color: "red" }}>
          Sender address must differ from receipient address
        </p>
      )}
    </form>
  );
}

export default Transfer;
