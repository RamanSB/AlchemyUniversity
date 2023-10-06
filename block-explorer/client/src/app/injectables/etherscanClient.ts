import { TransactionResponse } from "ethers";
import { injectable } from "inversify";
import { Axios } from "axios";

export interface IEtherscanClient {
  fetchAllTransactions(eoa: string): Promise<TransactionResponse[]>;
}

const API_KEY: string = "";

@injectable()
export class EtherscanClient implements IEtherscanClient {
  etherscanAxios;

  constructor() {
    this.etherscanAxios = new Axios({
      baseURL: "https://api.etherscan.io/api",
    });
  }

  /**
   * Implement pagination on retreiving all of these transactions...
   * @param eoa
   * @returns
   */
  async fetchAllTransactions(eoa: string): Promise<TransactionResponse[]> {
    try {
      const { data, status } = await this.etherscanAxios.get("", {
        params: {
          module: "account",
          action: "txlist",
          address: eoa,
          startblock: 0,
          endblock: 99999999,
          sort: "asc",
          apikey: API_KEY,
        },
      });
      if (status === 200) {
        return JSON.parse(data);
      }
      return [];
    } catch (error) {
      console.log(`Error fetching all transactions for EOA (${eoa}): ${error}`);
      return [];
    }
  }
}
