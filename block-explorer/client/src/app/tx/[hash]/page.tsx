"use client";
import { GlobalContext, IGlobalState } from "@/app/contexts/GlobalContext";
import {
  LeftSquareFilled,
  MinusOutlined,
  PlusOutlined,
  QuestionCircleFilled,
  RightSquareFilled,
} from "@ant-design/icons";
import { Button, Card, Col, Collapse, Divider, Row, Typography } from "antd";
import CollapsePanel from "antd/es/collapse/CollapsePanel";
import { Block, TransactionReceipt, TransactionResponse } from "ethers";
import React, {
  Fragment,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import pageStyles from "../../styles/Transaction.module.css";
import { AdditionalDataContainer } from "@/app/components/AdditionalDataContainer";

const { Paragraph, Text, Title, Link } = Typography;

export default function Transaction({ params }: { params: { hash: string } }) {
  console.log(`Transaction: ${params.hash}`);
  const { searchResults, setPage } = useContext(GlobalContext);
  console.log(`Search Results: ${JSON.stringify(searchResults)}`);
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setPage("transactions");
    }
    return () => {
      isMounted = false;
    };
  }, [setPage]);

  return (
    <div style={{ color: "#FBFCFD" }}>
      <div
        style={{
          marginInline: "10%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexFlow: "row nowrap",
            alignItems: "center",
            padding: "16px 0px 16px 0",
          }}
        >
          <Text style={{ fontSize: "1.1em", fontWeight: "600" }}>
            Transaction Details
          </Text>
          <LeftSquareFilled
            color={"black"}
            style={{
              transform: "scale(1.5)",
              color: "#e9ecef",
              backgroundColor: "black",
              marginInline: "12px",
              cursor: "pointer",
            }}
          ></LeftSquareFilled>
          <RightSquareFilled
            style={{
              transform: "scale(1.5)",
              color: "#e9ecef",
              backgroundColor: "black",
              border: "none",
              cursor: "pointer",
            }}
          ></RightSquareFilled>
        </div>
        <Divider type="horizontal" style={{ marginTop: "4px" }} />

        <div className={pageStyles.buttonContainer}>
          <Button>Overview</Button>
          <Button>State</Button>
          <Button>Comments</Button>
        </div>
        <div>
          <Card
            className={pageStyles.transactionDataContainer}
            bodyStyle={{ padding: "6px 24px 12px 24px" }}
          >
            <TransactionMetadata />
            <Divider
              type="horizontal"
              style={{ margin: "4px auto 4px auto" }}
            />
            {/* <TransactionAction/> */}
            <Divider
              type="horizontal"
              style={{ margin: "4px auto 4px auto" }}
            />
            <TransactionParticipants />
            <Divider
              type="horizontal"
              style={{ margin: "4px auto 4px auto" }}
            />
            <TransactionPrices />
          </Card>
          <Card
            className={pageStyles.moreDetailsContainer}
            bodyStyle={{ padding: "8px" }}
          >
            <AdditionalDataContainer>
              <AdditionalPriceAndGasDetail />
              <Divider type="horizontal" style={{ margin: "4px 0 4px 0" }} />
            </AdditionalDataContainer>
          </Card>
        </div>
      </div>
    </div>
  );
}

const AdditionalPriceAndGasDetail: React.FC = () => {
  const contextValue: IGlobalState = useContext<IGlobalState>(GlobalContext);
  const {
    response,
    receipt,
    block,
  }: {
    response: TransactionResponse | null;
    receipt: TransactionReceipt | null;
    block: Block | null;
  } = contextValue.searchResults;

  // The <>FeePerGas is in wei.
  const { baseFeePerGas } = block as Block;
  const { maxFeePerGas, maxPriorityFeePerGas } =
    response as TransactionResponse;
  const gasLimit: number = Number(response?.gasLimit as bigint);
  const gasUsed: number = Number(receipt?.gasUsed as bigint);
  const gasLimitAndUsageByTxn =
    gasLimit +
    " | " +
    gasUsed +
    `  (${(100 * (gasUsed / gasLimit)).toPrecision(4)}%)`;
  // Number in JS / TS is of max 64 bits (1 bit for sign, 11 bits for exponents, 52 bits for fraction).
  // Largest value is 2 ^ 63 - 1 for type Number.BigInt supports much larger numbers.
  const gasFeeData: string = `Base: ${
    Number(baseFeePerGas) * 1e-9
  } Gwei | Max: ${Number(maxFeePerGas) * 1e-9} Gwei | Max Priority: ${
    Number(maxPriorityFeePerGas) * 1e-9
  } Gwei`;
  const dataMap: Map<string, string> = new Map<string, string>([
    ["Ether Price", ""],
    ["Gas Limit & Usage by Txn", gasLimitAndUsageByTxn],
    ["Gas Fees", gasFeeData],
  ]);

  return [...dataMap.entries()].map(
    ([key, value]: [key: string, value: string]) => {
      return (
        <Fragment key={key}>
          <Row align={"middle"}>
            <Col span={6}>
              <TransactionTableKey keyName={key} />
            </Col>
            <Col span={2}></Col>
            <Col span={10}>{value}</Col>
          </Row>
        </Fragment>
      );
    }
  );
};

const TransactionPrices: React.FC<{}> = () => {
  const contextValue: IGlobalState = useContext<IGlobalState>(GlobalContext);
  const { response, receipt } = contextValue.searchResults;
  const txnValue: number = Number.parseInt(response?.value) * 1e-18; // value from response is in wei, must be displayed as ETH. 1e-18 x
  const gasPrice: number = Number.parseInt(response?.gasPrice) * 1e-9; // gas price is also in wei, typically shown as gwei and then ETH in parenthesis
  const txnFee: number =
    Number.parseInt(receipt?.gasUsed) *
    Number.parseInt(receipt?.gasPrice) *
    1e-18;
  const metadataMap: Map<string, string> = new Map([
    ["Value", `${txnValue} ETH`],
    ["Transaction Fee", `${txnFee} ETH`], // Sourced from receipt, has the gasUsed & the gasPrice
    ["Gas Price", `${gasPrice} Gwei (${gasPrice * 1e-9} ETH)`], // TODO: Format this ETH value.
  ]);

  return [...metadataMap.entries()].map(
    ([key, value]: [key: string, value: string]) => {
      return (
        <Fragment key={key}>
          <Row align="middle">
            <Col span={6}>
              <TransactionTableKey keyName={key} />
            </Col>
            <Col span={2}></Col>
            <Col span={8}>{value}</Col>
          </Row>
        </Fragment>
      );
    }
  );
};

/**
 *
 * @returns React.FC component rendering From and To fields of a transaction.
 */
const TransactionParticipants = () => {
  const contextValue: IGlobalState = useContext<IGlobalState>(GlobalContext);
  const { response } = contextValue.searchResults;
  const metadataMap: Map<string, string> = new Map([
    ["From", response?.from],
    ["To", response?.to],
  ]);

  return [...metadataMap.entries()].map(
    ([key, value]: [key: string, value: string]) => {
      return (
        <Fragment key={key}>
          <Row align="middle">
            <Col span={6}>
              <TransactionTableKey keyName={key} />
            </Col>
            <Col span={2}></Col>
            <Col span={8}>{value}</Col>
          </Row>
        </Fragment>
      );
    }
  );
};

/**
 * TransactionMetadata will display the:
 *  - TransactionHash (txnHash)
 *  - Status (status)
 *  - Block (blockNumber)
 *  - Timestamp (timestamp [utc])
 */
const TransactionMetadata = () => {
  const metadataKeys: string[] = [
    "Transaction Hash",
    "Status",
    "Block",
    "Timestamp",
  ];

  const contextValue = useContext<IGlobalState>(GlobalContext);
  const searchResults = contextValue.searchResults;
  const {
    response,
    receipt,
    block,
  }: {
    response: TransactionResponse | null;
    receipt: TransactionReceipt | null;
    block: Block | null;
  } = contextValue.searchResults;

  let metadataMap: Map<string, string> = new Map(
    metadataKeys.map((key) => [key, ""])
  );

  console.log(searchResults);
  console.log(typeof searchResults);

  metadataMap.set(metadataKeys[0], response?.hash.toString() as string);
  metadataMap.set(metadataKeys[1], receipt?.status?.toString() as string);
  metadataMap.set(metadataKeys[2], response?.blockNumber?.toString() as string);
  metadataMap.set(metadataKeys[3], block?.timestamp.toString() as string);

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
    <div className={pageStyles.tableKeyContainer}>
      <QuestionCircleFilled></QuestionCircleFilled>
      <Paragraph>{keyName}:</Paragraph>
    </div>
  );
};
