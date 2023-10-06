"use client";
import { GlobalContext, IGlobalState } from "@/app/contexts/GlobalContext";
import { Fragment, useContext, useEffect } from "react";
import transactionPageStyles from "../../styles/Transaction.module.css";
import { Button, Card, Col, Divider, Row, Typography } from "antd";
import {
  LeftSquareFilled,
  QuestionCircleFilled,
  RightSquareFilled,
} from "@ant-design/icons";
import { Block } from "ethers";
import { AdditionalDataContainer } from "@/app/components/AdditionalDataContainer";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { DIContainer } from "@/app/config/inversify.config";
import {
  EthersProvider,
  IEthersProvider,
} from "@/app/injectables/ethersProvider";
import TYPES from "@/app/config/inversify_types";

const { Text, Link, Paragraph, Title } = Typography;

export default function BlockPage({
  params,
}: {
  params: { blockNumber: string };
}) {
  const contextValue: IGlobalState = useContext<IGlobalState>(GlobalContext);
  const { setPage, searchResults, setSearchResults } = contextValue;
  const router: AppRouterInstance = useRouter();
  useEffect(() => {
    let isMounted: boolean = true;
    if (isMounted) {
      setPage("blockchain");
      console.log(
        `[useEffect - blockNumber]: ${searchResults?.number} | ${params.blockNumber}`
      );
      if (
        !searchResults ||
        searchResults?.number !== Number(params.blockNumber)
      ) {
        console.log(
          `Block Numbers: SearchResult[${searchResults?.number}] | ${params.blockNumber}`
        );
        (async function () {
          const blockResponse: Block | null =
            await DIContainer.get<IEthersProvider>(
              TYPES.EthersProvider
            ).fetchBlockData(Number(params.blockNumber));
          setSearchResults(blockResponse);
        })();
      }
    }
    return () => {
      isMounted = false;
    };
  }, [setPage, setSearchResults, params.blockNumber, searchResults]);

  return (
    <div>
      <div style={{ marginInline: "10%" }}>
        <div
          style={{
            display: "flex",
            flexFlow: "row nowrap",
            alignItems: "center",
            padding: "16px 0px 16px 0",
          }}
        >
          <Text style={{ fontSize: "1.1em", fontWeight: "600" }}>
            Block <Text type="secondary">#{params.blockNumber}</Text>
          </Text>
          <LeftSquareFilled
            onClick={() =>
              router.push(`${Number.parseInt(params.blockNumber) - 1}`)
            }
            style={{
              transform: "scale(1.5)",
              color: "#e9ecef",
              backgroundColor: "white",
              marginInline: "12px",
              cursor: "pointer",
            }}
          />
          <RightSquareFilled
            onClick={() =>
              router.push(`${Number.parseInt(params.blockNumber) + 1}`)
            }
            style={{
              transform: "scale(1.5)",
              color: "#e9ecef",
              backgroundColor: "white",
              cursor: "pointer",
            }}
          />
        </div>
        <Divider type="horizontal" style={{ marginTop: "4px" }} />

        <div className={transactionPageStyles.buttonContainer}>
          <Button>Overview</Button>
          <Button>State</Button>
          <Button>Comments</Button>
        </div>
        <div>
          <Card
            className={transactionPageStyles.transactionDataContainer}
            bodyStyle={{ padding: "6px 24px 12px 24px" }}
          >
            <BlockMetadata />
            <Divider
              type="horizontal"
              style={{ margin: "4px auto 4px auto" }}
            />
            <BlockRewardAndDifficulty />
            <Divider
              type="horizontal"
              style={{ margin: "4px auto 4px auto" }}
            />
            <BlockGasAndData />
          </Card>
          <Card
            className={transactionPageStyles.moreDetailsContainer}
            bodyStyle={{ padding: "8px" }}
          >
            <AdditionalDataContainer></AdditionalDataContainer>
          </Card>
        </div>
      </div>
    </div>
  );
}

const BlockGasAndData = () => {
  const contextValue: IGlobalState = useContext<IGlobalState>(GlobalContext);
  const block: Block = contextValue.searchResults as Block;
  const metadataMap: Map<string, string> = new Map([
    ["Gas Used", `${block.gasUsed}`],
    ["Gas Limit", `${block.gasLimit}`],
    ["Extra Data", "-"],
    ["Ether Price", `-`],
  ]);

  return [...metadataMap.entries()].map(
    ([key, value]: [key: string, value: string]) => {
      return (
        <Fragment key={key}>
          <Row align={"middle"}>
            <Col span={6}>
              <TransactionTableKey keyName={key} />
            </Col>
            <Col span={2}></Col>
            <Col span={8}>{value}</Col>
            {/* 4 spaces of column span left */}
          </Row>
        </Fragment>
      );
    }
  );
};

const BlockRewardAndDifficulty = () => {
  const contextValue: IGlobalState = useContext<IGlobalState>(GlobalContext);
  const block: Block = contextValue.searchResults as Block;
  const metadataMap: Map<string, string> = new Map([
    ["Mined by", block.miner],
    ["Block Reward", "-"],
    ["Uncle Reward", "-"],
    ["Difficulty", `${block.difficulty.toLocaleString()}`],
    ["Total Difficulty", ""],
    ["Size", ""],
  ]);

  return [...metadataMap.entries()].map(
    ([key, value]: [key: string, value: string]) => {
      return (
        <Fragment key={key}>
          <Row align={"middle"}>
            <Col span={6}>
              <TransactionTableKey keyName={key} />
            </Col>
            <Col span={2}></Col>
            <Col span={8}>{value}</Col>
            {/* 4 spaces of column span left */}
          </Row>
        </Fragment>
      );
    }
  );
};

/**
 * TransactionMetadata will display the:
 *  - Block Height (number)
 *  - Status (status)
 *  - Timestamp (timestamp [utc])
 *  - Transactions (transactions)
 */
const BlockMetadata = () => {
  const contextValue: IGlobalState = useContext<IGlobalState>(GlobalContext);
  const block: Block = contextValue.searchResults as Block;

  if (!block) {
    console.log(`Block is not valid: ${block}`);
  }

  const metadataMap: Map<string, string> = new Map([
    ["Block Height", `${block?.number}`],
    ["Status", "-"],
    ["Timestamp", `${block?.timestamp}`],
    ["Transactions", `${block?.transactions.length} Transactions`],
  ]);

  return [...metadataMap.entries()].map(
    ([key, value]: [key: string, value: string]) => {
      return (
        <Fragment key={key}>
          <Row align={"middle"}>
            <Col span={6}>
              <TransactionTableKey keyName={key} />
            </Col>
            <Col span={2}></Col>
            <Col span={8}>{value}</Col>
            {/* 4 spaces of column span left */}
          </Row>
        </Fragment>
      );
    }
  );
};

const TransactionTableKey = ({ keyName }: { keyName: string }) => {
  return (
    <div className={transactionPageStyles.tableKeyContainer}>
      <QuestionCircleFilled></QuestionCircleFilled>
      <Paragraph>{keyName}:</Paragraph>
    </div>
  );
};
