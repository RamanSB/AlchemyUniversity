"use client";
import { Alchemy, Network } from "alchemy-sdk";
import dotenv from "dotenv";
import { useContext, useEffect } from "react";
import { GlobalContext, IGlobalState } from "./contexts/GlobalContext";

dotenv.config();

const config = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

console.log(`Config: ${JSON.stringify(config)}`);

const alchemy = new Alchemy(config);

// const ethersProvider = alchemy.config.getProvider();

export default function Home() {
  const contextValue: IGlobalState = useContext<IGlobalState>(GlobalContext);
  const { setPage } = contextValue;
  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setPage("home");
    }

    return () => {
      isMounted = false;
    };
  }, [setPage]);

  return <></>;
}
