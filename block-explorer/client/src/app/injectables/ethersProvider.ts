import { injectable } from "inversify";
import { ethers } from "ethers";
import { TransactionResponse } from "ethers";
import { TransactionReceipt } from "ethers";
import { Block } from "ethers";

export interface IEthersProvider {
  fetchBlockData(value: number): Promise<Block | null>;
  fetchTransaction(txnHash: string): Promise<TransactionResponse | null>;
  fetchTransactionReceipt(txnHash: string): Promise<TransactionReceipt | null>;
}

@injectable()
export class EthersProvider implements IEthersProvider {
  ethersProvider;

  constructor() {
    console.log(`Env Variables: ${JSON.stringify(process.env)}`);
    this.ethersProvider = new ethers.JsonRpcProvider(
      "" /*process.env.JSON_RPC_URL */
    );
  }

  async fetchBlockData(value: number): Promise<Block | null> {
    console.log(`[EthersProvider] - fetchBlockData(${value})`);
    console.log(`Env: ${JSON.stringify(process.env)}`);
    const blockResponse: Block | null = await this.ethersProvider.getBlock(
      value,
      true
    );
    console.log(`Block Response: ${JSON.stringify(blockResponse)}`);
    return blockResponse;
  }

  async fetchTransaction(txnHash: string): Promise<TransactionResponse | null> {
    console.log(`[EthersProvider] - fetchTransaction(${txnHash})`);
    const txnResponse: TransactionResponse | null =
      await this.ethersProvider.getTransaction(txnHash);
    console.log(txnResponse);
    return txnResponse;
  }

  async fetchTransactionReceipt(
    txnHash: string
  ): Promise<TransactionReceipt | null> {
    console.log(`[EthersProvider] - fetchTransactionReceipt(${txnHash})`);
    const txnReceipt: TransactionReceipt | null =
      await this.ethersProvider.getTransactionReceipt(txnHash);
    console.log(
      `TxnReceipt (${typeof txnReceipt}): ${JSON.stringify(txnReceipt)} `
    );
    return txnReceipt;
  }
}
