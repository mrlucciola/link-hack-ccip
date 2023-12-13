import { ethers } from "ethers";
import { BigNumberish } from "ethers";

import onRampAbi from "../abi/OnRamp.json";
import routerAbi from "../abi/Router.json";

import erc20Abi from "../abi/IERC20Metadata.json";
import poolAbi from "../abi/TokenPool.json";

import { getProviderRpcUrl } from "./config/env";
import { getRouterConfig, supportedNetworks } from "./config/router";

import { SupportedNetwork } from "./types/index";

interface LaneTokenInfo {
  lane: string;
  tokenAddress: string;
  tokenName: string;
  tokenSymbol: string;
  tokenDecimals: number;
  poolAddress: string;
  poolState: {
    tokens: BigNumberish;
    lastUpdated: BigNumberish;
    isEnabled: boolean;
    capacity: BigNumberish;
    rate: BigNumberish;
  };
}

// Function to fetch and display supported tokens
const getLanesAndTokens = async (): Promise<LaneTokenInfo[]> => {
  const laneTokenInfos: LaneTokenInfo[] = [];

  for (const supportedNetwork of supportedNetworks) {
    // Get the RPC URL for the chain from the config
    const rpcUrl = getProviderRpcUrl(supportedNetwork as SupportedNetwork);
    // Initialize a provider using the obtained RPC URL
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    // Get the router's address for the specified chain
    const routerAddress = getRouterConfig(
      supportedNetwork as SupportedNetwork
    ).address;
    // Create a contract instance for the router using its ABI and address
    const router = new ethers.Contract(routerAddress, routerAbi, provider);

    for (const targetNetwork of supportedNetworks) {
      if (targetNetwork !== supportedNetwork) {
        // Get the chain selector for the target chain
        const targetChainSelector = getRouterConfig(
          targetNetwork as SupportedNetwork
        ).chainSelector;
        // Get OnRamp
        const onRamp = await router.getOnRamp(targetChainSelector);
        if (onRamp !== ethers.ZeroAddress) {
          console.log(
            `\n\n ${supportedNetwork}==>${targetNetwork}.onRamp address ${onRamp}`
          );
          const onRampContract = new ethers.Contract(
            onRamp,
            onRampAbi,
            provider
          );
          const { tokens, lastUpdated, isEnabled, capacity, rate } =
            await onRampContract.currentRateLimiterState();

          if (isEnabled) {
            // global rate limit enabled
            console.log(`   global rate limit  enabled`);
          } else {
            console.log(`   global rate limit not enabled`);
          }

          const decimals = BigInt(10) ** BigInt(18);

          console.log(
            `   Current USD available amount (Global): ${
              BigInt(tokens) / decimals
            } USD`
          );
          console.log(
            `   Timestamp in seconds last token refill (Global): ${lastUpdated}`
          );
          console.log(
            `   Maximum USD capacity amount (Global): ${
              BigInt(capacity) / decimals
            } USD`
          );
          console.log(
            `   Filling rate (Global): ${BigInt(rate) / decimals} USD/seconds`
          );
          const supportedTokens = await onRampContract.getSupportedTokens();
          // For each supported token, print its name, symbol, and decimal precision
          for (const supportedToken of supportedTokens) {
            // Create a contract instance for the token using its ABI and address
            const erc20 = new ethers.Contract(
              supportedToken,
              erc20Abi,
              provider
            );

            // Fetch the token's name, symbol, and decimal precision
            const name = await erc20.name();
            const symbol = await erc20.symbol();
            const decimals = await erc20.decimals();

            // Print the token's details
            console.log(
              `\n  Token ${supportedToken} - ${name} - symbol ${symbol} - decimals ${decimals}`
            );

            const pool = await onRampContract.getPoolBySourceToken(
              supportedToken
            );
            console.log(`   pool ${pool}`);

            const poolContract = new ethers.Contract(pool, poolAbi, provider);
            const { tokens, lastUpdated, isEnabled, capacity, rate } =
              await poolContract.currentOnRampRateLimiterState(onRamp);

            if (isEnabled) {
              // rate limit enabled
              console.log(`   pool rate limit  enabled`);
            } else {
              console.log(`   pool rate limit not enabled`);
            }
            console.log(`   Number of tokens in the bucket: ${tokens}`);
            console.log(
              `   Timestamp in seconds last token refill: ${lastUpdated}`
            );
            console.log(
              `   Maximum number of tokens that can be in the bucket: ${capacity}`
            );
            console.log(
              `   Number of tokens per second that the bucket is refilled: ${rate}`
            );
            laneTokenInfos.push({
              lane: `${supportedNetwork}=>${targetNetwork}`,
              tokenAddress: supportedToken,
              tokenName: name,
              tokenSymbol: symbol,
              tokenDecimals: decimals,
              poolAddress: pool,
              poolState: {
                tokens: tokens,
                lastUpdated: lastUpdated,
                isEnabled: isEnabled,
                capacity: capacity,
                rate: rate,
              },
            });
          }
        }
      }
    }
  }
  return laneTokenInfos;
};

export default getLanesAndTokens;
