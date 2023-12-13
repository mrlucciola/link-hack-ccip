import routerAbi from "../abi/Router.json";
import erc20Abi from "../abi/IERC20Metadata.json";

import { ethers } from "ethers";
import { getProviderRpcUrl } from "./config/env";
import { getRouterConfig } from "./config/router";

import { SupportedNetwork } from "./types/index";

interface Token {
  tokenName: string;
  tokenSymbol: string;
  tokenAddress: string;
  tokenDecimal: number;
}

const getSupportedTokens = async (
  chain: SupportedNetwork,
  targetChain: SupportedNetwork
): Promise<Token[]> => {
  // Get the RPC URL for the chain from the config
  const rpcUrl = getProviderRpcUrl(chain);
  // Initialize a provider using the obtained RPC URL
  const provider = new ethers.JsonRpcProvider(rpcUrl);

  // Get the router's address for the specified chain
  const routerAddress = getRouterConfig(chain).address;
  // Get the chain selector for the target chain
  const targetChainSelector = getRouterConfig(targetChain).chainSelector;

  // Create a contract instance for the router using its ABI and address
  const router = new ethers.Contract(routerAddress, routerAbi, provider);

  // Fetch the list of supported tokens
  const supportedTokens = await router.getSupportedTokens(targetChainSelector);

  let tokens: Token[] = [];

  // For each supported token, print its name, symbol, and decimal precision
  for (const supportedToken of supportedTokens) {
    // Create a contract instance for the token using its ABI and address
    const erc20 = new ethers.Contract(supportedToken, erc20Abi, provider);

    // Fetch the token's name, symbol, and decimal precision
    const name = await erc20.name();
    const symbol = await erc20.symbol();
    const decimals = await erc20.decimals();

    // Print the token's details
    console.log(
      `ERC20 token with address ${supportedToken} is ${name} of symbol ${symbol} and decimals ${decimals}`
    );
    tokens.push({
      tokenName: name,
      tokenSymbol: symbol,
      tokenAddress: supportedToken,
      tokenDecimal: decimals,
    });
  }
  return tokens;
};

export default getSupportedTokens;
