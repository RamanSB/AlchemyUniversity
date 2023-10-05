"use client";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
import styles from "./SearchBar.module.css";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { GlobalContext, IGlobalState } from "../contexts/GlobalContext";
import { useContext } from "react";
import { DIContainer } from "../config/inversify.config";
import TYPES from "../config/inversify_types";
import { IEthersProvider } from "../injectables/ethersProvider";
import Link from "next/link";
import { TransactionResponse } from "ethers";

const { Search } = Input;

const SEARCH_PLACEHOLDER =
  "Search by Address / Txn Hash / Block / Token / Domain Name";

const SearchBar = () => {
  const router: AppRouterInstance = useRouter();
  const contextValue: IGlobalState = useContext<IGlobalState>(GlobalContext);
  console.log(`Context Value: ${JSON.stringify(contextValue)}`);
  const { searchResults, setSearchResults } = contextValue;

  const onSearchHandler = async (value: string) => {
    let cleanValue = value.trim();
    // value must be either: a transaction hash, block number or public address.
    // addresses are 160 bits or 40 characters in ethereum (omitting the 0x)
    console.log(`onSearchHandler(${value})`);
    if (cleanValue.length === 64) {
      console.log(`Searching Txn Hash: ${value}`);
      cleanValue = "0x" + cleanValue;
    }

    if (cleanValue.length == 66) {
      if (value.substring(0, 2) == "0x") {
        console.log(`Searching Txn Hash: ${value}`);
        const txnResponse: TransactionResponse | null =
          await DIContainer.get<IEthersProvider>(
            TYPES.EthersProvider
          ).fetchTransaction(value);

        const txnReceipt = await DIContainer.get<IEthersProvider>(
          TYPES.EthersProvider
        ).fetchTransactionReceipt(value);

        console.log(`[SearchBar] - txnReciept: ${txnReceipt}`);

        if (txnResponse && txnReceipt) {
          const finalTxnResults = Object.assign({
            receipt: txnReceipt,
            response: txnResponse,
          });

          setSearchResults(finalTxnResults);
          router.push(`/tx/${value}`);
        } else {
          setSearchResults({
            error: `Transaction Hash (${value}) cannot be found.`,
          });
          router.push(`/tx/${value}`);
        }
      }
    }
  };

  return (
    <Search
      placeholder={SEARCH_PLACEHOLDER}
      enterButton={<SearchOutlined />}
      className={styles.searchBar}
      onSearch={onSearchHandler}
      allowClear
      style={{ minWidth: "540px" }}
    />
  );
};

export default SearchBar;
