"use client";
import React, { Fragment, useContext } from "react";
import pageStyles from "../../styles/Transaction.module.css";
import { Button, Card, Col, Divider, Row, Typography } from "antd";
import Icon from "@ant-design/icons/lib/components/Icon";
import {
  LeftSquareFilled,
  QuestionCircleFilled,
  RightSquareFilled,
} from "@ant-design/icons";
import { GlobalContext, IGlobalState } from "@/app/contexts/GlobalContext";
import { TransactionResponse } from "ethers";
import { TransactionReceipt } from "ethers";

const { Paragraph, Text, Title, Link } = Typography;

export default function Transaction({ params }: { params: { hash: string } }) {
  console.log(`Transaction: ${params.hash}`);
  const { searchResults } = useContext(GlobalContext);
  console.log(`Search Results: ${JSON.stringify(searchResults)}`);
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
            }}
          ></LeftSquareFilled>
          <RightSquareFilled
            style={{
              transform: "scale(1.5)",
              color: "#e9ecef",
              backgroundColor: "black",
              border: "none",
            }}
          ></RightSquareFilled>
        </div>
        <Divider type="horizontal" style={{ marginTop: "4px" }} />
        <div>
          <Card></Card>
        </div>
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
            <Divider type="horizontal" />
          </Card>
        </div>
      </div>
    </div>
  );
}

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
  }: {
    response: TransactionResponse | null;
    receipt: TransactionReceipt | null;
  } = contextValue.searchResults;

  let metadataMap: Map<string, string> = new Map(
    metadataKeys.map((key) => [key, ""])
  );

  console.log(searchResults);
  console.log(typeof searchResults);

  metadataMap.set(metadataKeys[0], response?.hash.toString() as string);
  metadataMap.set(metadataKeys[1], receipt?.status?.toString() as string);
  metadataMap.set(metadataKeys[2], response?.blockNumber?.toString() as string);
  metadataMap.set(metadataKeys[3], "");

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
