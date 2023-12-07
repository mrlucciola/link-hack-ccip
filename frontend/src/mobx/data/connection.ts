import { Contract } from "ethers";
import { TestnetId } from "./supportedBlockchains";
import { newProvider, newSenderContractInstance } from "../../utils/connection";
import { JsonRpcProvider } from "ethers";

const providers: { [key in TestnetId]: JsonRpcProvider } = {
  ethSepolia: newProvider("https://sepolia.infura.io/v3/", {
    chainId: 11155111,
  }),
  avaxFuji: newProvider("", {
    chainId: 43113,
  }),
  maticMumbai: newProvider("", {
    chainId: 80001,
  }),
  opGoerli: newProvider("", {
    chainId: 420,
  }),
};

export const connectionInfo: {
  [key in TestnetId]: { provider: JsonRpcProvider; contract: Contract };
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
