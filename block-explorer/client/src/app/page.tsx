"use client";
import { Alchemy, Network } from "alchemy-sdk";
import Title from "antd/es/typography/Title";
import SearchBar from "./components/SearchBar";
import { Badge, Col, Row, Statistic } from "antd";
import dotenv from "dotenv";
import { GlobalContextProvider } from "./contexts/GlobalContext";
import { useEffect, useState } from "react";

dotenv.config();

const config = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

console.log(`Config: ${JSON.stringify(config)}`);

const alchemy = new Alchemy(config);

// const ethersProvider = alchemy.config.getProvider();

export default function Home() {
  useEffect(() => {}, []);

  return <></>;
}
