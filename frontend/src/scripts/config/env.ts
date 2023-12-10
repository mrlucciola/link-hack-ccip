import { SupportedNetwork } from "../types";

const getProviderRpcUrl = (network: SupportedNetwork): string => {
  //config();
  let rpcUrl: string | undefined;

  switch (network) {
    case "ethereumMainnet":
      rpcUrl = import.meta.env.VITE_ETHEREUM_MAINNET_RPC_URL;
      break;
    case "ethereumSepolia":
      rpcUrl = import.meta.env.VITE_ETHEREUM_SEPOLIA_RPC_URL;
      break;
    case "optimismMainnet":
      rpcUrl = import.meta.env.VITE_OPTIMISM_MAINNET_RPC_URL;
      break;
    case "optimismGoerli":
      rpcUrl = import.meta.env.VITE_OPTIMISM_GOERLI_RPC_URL;
      break;
    case "arbitrumTestnet":
      rpcUrl = import.meta.env.VITE_ARBITRUM_TESTNET_RPC_URL;
      break;
    case "avalancheMainnet":
      rpcUrl = import.meta.env.VITE_AVALANCHE_MAINNET_RPC_URL;
      break;
    case "avalancheFuji":
      rpcUrl = import.meta.env.VITE_AVALANCHE_FUJI_RPC_URL;
      break;
    case "polygonMainnet":
      rpcUrl = import.meta.env.VITE_POLYGON_MAINNET_RPC_URL;
      break;
    case "polygonMumbai":
      rpcUrl = import.meta.env.VITE_POLYGON_MUMBAI_RPC_URL;
      break;
    default:
      throw new Error("Unknown network: " + network);
  }

  if (!rpcUrl)
    throw new Error(
      `rpcUrl empty for network ${network} - check your environment variables`
    );
  return rpcUrl;
};

const getPrivateKey = (): string => {
  //config();
  const privateKey = import.meta.env.VITE_PRIVATE_KEY;
  if (!privateKey)
    throw new Error(
      "private key not provided - check your environment variables"
    );
  return privateKey;
};

export { getPrivateKey, getProviderRpcUrl };
