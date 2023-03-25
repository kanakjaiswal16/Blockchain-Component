import React, { useState, useEffect } from "react";
import "./blockchain.css";
import { sha256 } from "js-sha256";

function generateHash(data) {
  const hash = sha256(data);
  return hash;
}

class Block {
  constructor(nonce, data, blockHash, previousHash) {
    this.nonce = nonce;
    this.data = data;
    this.blockHash = blockHash;
    this.previousHash = previousHash;
  }
}

class BlockChain {
  constructor() {
    const genesisPreviousHash = generateHash("0x000000");
    const genesisData = "Genesis Block";
    const genesisBlockHash = generateHash(genesisData);

    const genesisBlock = new Block(
      0,
      genesisData,
      genesisBlockHash,
      genesisPreviousHash
    );
    this.chain = [genesisBlock];
  }

  addBlock(data) {
    const previousHash = this.chain[this.chain.length - 1].blockHash;
    let nonce = 0;
    let blockHash = generateHash(
      data + this.chain[this.chain.length - 1].blockHash + nonce
    );
    while (!blockHash.startsWith("0000")) {
      nonce++;
      blockHash = generateHash(
        data + this.chain[this.chain.length - 1].blockHash + nonce
      );
    }

    const newBlock = new Block(nonce, data, blockHash, previousHash);
    this.chain.push(newBlock);
  }
}

function Blockchain() {
  const [chain, setChain] = useState([]);
  const [data, setData] = useState("");

  useEffect(() => {
    const blockchain = new BlockChain();

    setChain(blockchain.chain);
  }, []);

  const handleAddBlock = () => {
    const blockchain = new BlockChain();

    blockchain.chain = chain.slice();
    blockchain.addBlock(data);

    setChain(blockchain.chain);
    setData("");
  };

  return (
    <div className="chain">
      {chain.map((block, index) => (
        <div className="block" key={index}>
          <h3>Block {index + 1}</h3>
          <p className="nonce">Nonce: {block.nonce}</p>
          <p className="data">Data: {block.data}</p>
          <p className="blockHash">Block Hash: {block.blockHash}</p>
          <p className="previousHash">Previous Hash: {block.previousHash}</p>
        </div>
      ))}
      <div className="block">
        <input
          type="text"
          placeholder="Enter data to write in blockchain"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        <button onClick={handleAddBlock}>Mine Block</button>
      </div>
    </div>
  );
}

export default Blockchain;
