import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [senderAddress, setSenderAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [txnHistory, setTxnHistory] = useState(new Set());

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        senderAddress={senderAddress}
        setSenderAddress={setSenderAddress}
        privateKey={privateKey}
        setPrivateKey={setPrivateKey}
      />
      <Transfer
        setBalance={setBalance}
        senderAddress={senderAddress}
        privateKey={privateKey}
        setTxnHistory={setTxnHistory}
      />
      <div>
        Transaction History
        <ul style={{ listStyleType: "numbered" }}>
          {txnHistory.length !== 0 &&
            [...txnHistory].map((txn, idx) => <li key={idx}>{txn}</li>)}
        </ul>
      </div>
    </div>
  );
}

export default App;
