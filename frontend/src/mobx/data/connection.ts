import { AbstractProvider, Contract, JsonRpcProvider } from "ethers";
import { TestnetId } from "./supportedBlockchains";
import { newProvider, newSenderContractInstance } from "../../utils/connection";

const providers: { [key in TestnetId]: AbstractProvider } = {
  ethSepolia: newProvider("https://rpc.bordel.wtf/sepolia"),
  maticMumbai: newProvider("https://rpc-mumbai.maticvigil.com"),
  avaxFuji: newProvider("https://api.avax-test.network/ext/bc/C/rpc"),
  opGoerli: newProvider("https://endpoints.omniatech.io/v1/op/goerli/public"),
};

export const connectionInfo: {
  [key in TestnetId]: { provider: AbstractProvider; contract: Contract };
} = {
  ethSepolia: {
    provider: providers["ethSepolia"],
    contract: newSenderContractInstance("ethSepolia", providers["ethSepolia"]),
  },
  avaxFuji: {
    provider: providers["avaxFuji"],
    contract: newSenderContractInstance("avaxFuji", providers["avaxFuji"]),
  },
  maticMumbai: {
    provider: providers["maticMumbai"],
    contract: newSenderContractInstance(
      "maticMumbai",
      providers["maticMumbai"]
    ),
  },
  opGoerli: {
    provider: providers["opGoerli"],
    contract: newSenderContractInstance("opGoerli", providers["opGoerli"]),
  },
};
