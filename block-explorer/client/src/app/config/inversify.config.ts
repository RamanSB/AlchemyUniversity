import "reflect-metadata";
import { Container } from "inversify";
import TYPES from "./inversify_types";
import { EthersProvider, IEthersProvider } from "../injectables/ethersProvider";
import {
  EtherscanClient,
  IEtherscanClient,
} from "../injectables/etherscanClient";

const container = new Container({ autoBindInjectable: true });

container
  .bind<IEthersProvider>(TYPES.EthersProvider)
  .to(EthersProvider)
  .inSingletonScope();

container
  .bind<IEtherscanClient>(TYPES.EtherscanClient)
  .to(EtherscanClient)
  .inSingletonScope();

export { container as DIContainer };
