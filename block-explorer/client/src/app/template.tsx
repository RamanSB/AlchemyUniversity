"use client";
import { SearchOutlined } from "@ant-design/icons";
import { Divider, Menu, MenuProps, Typography } from "antd";
import { Input } from "antd/es";
import Image from "next/image";
import SearchBar from "./components/SearchBar";
import templateStyles from "./styles/RootTemplate.module.css";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { GlobalContext } from "./contexts/GlobalContext";

const { Paragraph, Link, Text, Title } = Typography;
const { Search } = Input;

export default function Template({ children }: { children: React.ReactNode }) {
  const { page, setPage } = useContext(GlobalContext);
  console.log(`Page: ${page} | setPage: ${setPage}`);
  const ETH_PRICE = "$1,653.43";
  const GAS_PRICE = "8 Gwei";

  const router: AppRouterInstance = useRouter();

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e.key);

    setPage(e.key);
    switch (e.key) {
      case "home":
        router.push("/");
        break;
      case "transactions":
        router.push("/txs");
        break;
      case "view_blocks":
        break;
      case "top_tokens":
        break;
    }
  };

  return (
    <div className={templateStyles.container}>
      <nav>
        <div
          style={{
            padding: "8px 8px 0 8px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexFlow: "row nowrap",
              justifyContent: "space-between",
              alignItems: "center",
              marginInline: "10%",
            }}
          >
            <div style={{ flex: 1 }}>
              <Text style={{ marginRight: "16px" }}>
                ETH Price: {ETH_PRICE}
              </Text>
              <Text>Gas: {GAS_PRICE}</Text>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <SearchBar />
            </div>
          </div>
          <Divider style={{ margin: "8px 0 0 0" }} />
          <div>
            <div
              style={{
                display: "flex",
                flexFlow: "row nowrap",
                marginInline: "10%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Image
                style={{ cursor: "pointer" }}
                onClick={() => router.push("/")}
                width="160"
                height="54"
                src={"/logo-etherscan.svg"}
                alt={""}
              />
              <Menu
                style={{
                  minWidth: "666px",
                  borderBottom: "none",
                  justifyContent: "right",
                  display: "flex",
                }}
                onClick={onClick}
                selectedKeys={[page]}
                mode="horizontal"
                items={menuItems}
              />
            </div>
          </div>
          <Divider style={{ margin: "4px 0px 0px 0px" }} />
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}

const menuItems: MenuProps["items"] = [
  {
    label: "Home",
    key: "home",
  },
  {
    label: "Blockchain \u2193",
    key: "blockchain",
    children: [
      {
        label: "Transactions",
        key: "transactions",
      },
      {
        label: "Pending Transactions",
        key: "pending_transactions",
      },
      {
        label: "Contract Internal Transactions",
        key: "contract_internal_transactions",
      },
      {
        label: "Beacon Deposits",
        key: "beacon_deposits",
      },
      {
        label: "Beacon Withdrawals",
        key: "beacon_withdrawls",
      },
      {
        label: "View Blocks",
        key: "view_blocks",
      },
      {
        label: "Forked Blocks (Reorgs)",
        key: "forked_blocks_reorgs",
      },
      {
        label: "Uncles",
        key: "uncles",
      },
      {
        label: "Top Accounts",
        key: "top_accounts",
      },
      {
        label: "Verified Contracts",
        key: "verified_contracts",
      },
    ],
  },
  {
    label: "Tokens \u2193",
    key: "tokens",
    children: [
      {
        label: "Top Tokens (ERC-20)",
        key: "top_tokens",
      },
      {
        label: "Token Transfers (ERC-20)",
        key: "top_transfers",
      },
    ],
  },
  {
    label: "NFTs",
    key: "nfts",
    children: [
      {
        label: "Top NFTs",
        key: "top_nfts",
      },
      {
        label: "Top Mints",
        key: "top_mints",
      },

      {
        label: "Latest Trades",
        key: "latest_trades",
      },

      {
        label: "Latest Transfers",
        key: "latest_transfers",
      },

      {
        label: "Latest Mints",
        key: "latest_mints",
      },
    ],
  },
  {
    label: "Resources \u2193",
    key: "resources",
    children: [
      {
        label: "Charts And Stats",
        key: "charts_and_stats",
      },

      {
        label: "Top Statistics",
        key: "top_statistics",
      },

      {
        label: "Directory",
        key: "directory",
      },

      {
        label: "Newsletter",
        key: "newsletter",
      },

      {
        label: "Knowledge Base",
        key: "knowledge_base",
      },
    ],
  },
  {
    label: "Developers \u2193",
    key: "developers",
    children: [
      {
        label: "API Plans",
        key: "api_plans",
      },
      {
        label: "API Documentation",
        key: "api_documentation",
      },
      {
        label: "Code Reader Beta",
        key: "code_reader_beta",
      },
      {
        label: "Verify Contract",
        key: "verify_contract",
      },
      {
        label: "Similar Contract Search",
        key: "similar_contract_search",
      },
      {
        label: "Smart Contract Search",
        key: "smart_contract_search",
      },
      {
        label: "Contract Diff Checker",
        key: "contract_diff_checker",
      },
      {
        label: "Vyper Online Compiler",
        key: "vyper_online_compiler",
      },
      {
        label: "Bytecode to Opcode",
        key: "bytecode_to_opcode",
      },
      {
        label: "Broadcast Transaction",
        key: "broadcast_transaction",
      },
    ],
  },
  { label: "More \u2193", key: "more" },
];

// Blockchain, Tokens, NFTs, Resources, Developers, More
