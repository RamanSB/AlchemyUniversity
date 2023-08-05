## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

### Video instructions

For an overview of this project as well as getting started instructions, check out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4

### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder
2. Run `npm install` to install all the depedencies
3. Run `node index` to start the server

The application should connect to the default server port (3042) automatically!

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.

### Plan To Solve Task

1. Generate n private keys on the server (retreive the public key & the addresses from the private key also).
2. In the wallet section create a field for private key.
3. Modify the frontend such that addresses can be pasted in and not public keys (closer resembelance to real Ethereum blockchain network.)
4. In the Txn Pane show a signature only when the wallet address and receipient are present.
5. On the server side try to retreive the public key from the signature.

### Notes

1. User should never send their private key to the server

## How to Run

<code>
Input:
ramandeepbedi@Ramandeeps-MacBook-Pro-3 server % node scripts/generate.js 3

Output:
Executing Script: /generate.js
Generating 3 wallets...
</code>

Generating Wallet #1
PrivateKey: 2af0a081bd2fc6474c74a29e3ac99f976114334a107b547615b0086435158c3f
PublicKey: 03d3db9096e16ca9f2d8e6306e3294b015bf761b4ac2d66a5c812f41f22782e6b6
Address: 3294b015bf761b4ac2d66a5c812f41f22782e6b6

---

Generating Wallet #2
PrivateKey: 5298eb73e2dd6def4f18720aec6b83cc3ab6de5d34262848a96d71a1f928d29b
PublicKey: 024e4350ceb58b0983a0b445afa02e429cec7e3772ad1ebb40d40de3f8ea316ea6
Address: a02e429cec7e3772ad1ebb40d40de3f8ea316ea6

---

Generating Wallet #3
PrivateKey: 46eba40a831f7b31e1b678abfea9ff10249519707baddf24616ecf866fcb9835
PublicKey: 03b47e161316bf2879800573c325ad505c8fa3167ea5f2b8c0adbafe9ac1421f97
Address: 25ad505c8fa3167ea5f2b8c0adbafe9ac1421f97

---

Paste the addresses in to the UI for "Wallet Address" & "Sender" and paste in the correct private key (the txn goes through), paste the incorrect private key the transaction does not go through and client receives a message regarding invalid private key.
