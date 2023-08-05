import server from "./server";

function Wallet({
  senderAddress,
  setSenderAddress,
  balance,
  setBalance,
  privateKey,
  setPrivateKey,
}) {
  async function onChange(evt) {
    const address = evt.target.value;
    setSenderAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input
          type="text"
          placeholder="Enter your private key"
          value={privateKey}
          onChange={(event) => {
            setPrivateKey(event.target.value);
          }}
        ></input>
      </label>

      <label>
        Wallet Address
        <input
          placeholder="Type an address, for example: 0x1"
          value={senderAddress}
          onChange={onChange}
        ></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
