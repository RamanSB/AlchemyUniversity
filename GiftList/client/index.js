const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";

async function main() {
  // TODO: how do we prove to the server we're on the nice list?
  const merkleTree = new MerkleTree(niceList);
  const merkleTreeRootHash = merkleTree.getRoot();
  console.log(`Merkle Tree Root Hash: ${merkleTreeRootHash}`);
  const name = process.argv[2];
  console.log(`Verifying if ${name} is on the nice-list...`);
  // Generating proof
  const proof = merkleTree.getProof(niceList.indexOf(name));

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    proof: proof,
    name: name,
  });

  console.log({ gift });
}

main();
