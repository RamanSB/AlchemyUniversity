"use client";
import { Divider, Typography, Card } from "antd";
import pageStyles from "../styles/Transactions.module.css";

const { Paragraph, Text, Title, Link } = Typography;

const PAGE_TITLE: string = "Transactions";

const Transactions = () => {
  return (
    <div className={pageStyles.container}>
      <Title level={4}>{PAGE_TITLE}</Title>
      <Divider type="horizontal" style={{ margin: "4px 0 0 0" }} />
      <div
        style={{
          marginTop: "16px",
          flexFlow: "row nowrap",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <TxnCard title={"Transactions (24H)"} value="1,241,422" />
        <TxnCard
          title={"Pending Transactions (Last 1H)"}
          value="155,344 (Average)"
        />
        <TxnCard title={"Network Transactions Fee (24H)"} value="418.02 ETH" />
        <TxnCard title={"Avg. Transaction Fee (24H)"} value="2.71 USD" />
      </div>
    </div>
  );
};

const TxnCard = ({ title, value }: { title: string; value: string }) => {
  return (
    <Card style={{ width: "320px", height: "80px", padding: 0 }}>
      <Text type="secondary">{title.toUpperCase()}</Text>
      <br />
      <Text style={{ fontSize: "1.25em" }}>{value}</Text>
    </Card>
  );
};

export default Transactions;
