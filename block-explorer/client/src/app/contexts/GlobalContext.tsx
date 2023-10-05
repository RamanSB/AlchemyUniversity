"use client";
import { TransactionResponse } from "ethers";
import {
  Context,
  PropsWithChildren,
  ReactNode,
  createContext,
  useState,
} from "react";

export interface IGlobalState {
  page?: any;
  setPage?: any;
  searchValue?: string | TransactionResponse;
  setSearchValue?: any;
  searchResults?: any;
  setSearchResults?: any;
}

// Creating a Context object which can be used as a shared container of data. Initially empty.
export const GlobalContext: Context<IGlobalState> = createContext({});

// This
export const GlobalContextProvider = ({
  children,
}: {
  children: PropsWithChildren<ReactNode>;
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const [page, setPage] = useState("home");

  const contextValue = {
    page,
    setPage,
    searchValue,
    setSearchValue,
    searchResults,
    setSearchResults,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};
