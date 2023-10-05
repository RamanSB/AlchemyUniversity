import "reflect-metadata";
import { Container } from "inversify";
import TYPES from "./inversify_types";
import { EthersProvider, IEthersProvider } from "../injectables/ethersProvider";

const container = new Container({ autoBindInjectable: true });

container
  .bind<IEthersProvider>(TYPES.EthersProvider)
  .to(EthersProvider)
  .inSingletonScope();

export { container as DIContainer };
