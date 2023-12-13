import { ethers } from "ethers";

import { getProviderRpcUrl } from "./config/env";
import { getMessageState } from "./config/offramp";
import { getRouterConfig } from "./config/router";

import onRampAbi from "../abi/OnRamp.json";
import routerAbi from "../abi/Router.json";
import offRampAbi from "../abi/OffRamp.json";

import { SupportedNetwork } from "./types/index";

const getStatus = async (
  chain: SupportedNetwork,
  targetChain: SupportedNetwork,
  messageId: string
): Promise<string> => {
  const destinationRpcUrl = getProviderRpcUrl(targetChain);
  const sourceRpcUrl = getProviderRpcUrl(chain);

  const destinationProvider = new ethers.JsonRpcProvider(destinationRpcUrl);
  const sourceProvider = new ethers.JsonRpcProvider(sourceRpcUrl);

  const sourceRouterAddress = getRouterConfig(chain).address;
  const sourceChainSelector = getRouterConfig(chain).chainSelector;
  const destinationRouterAddress = getRouterConfig(targetChain).address;
  const destinationChainSelector = getRouterConfig(targetChain).chainSelector;

  const sourceRouterContract = new ethers.Contract(
    sourceRouterAddress,
    routerAbi,
    sourceProvider
  );
  const onRamp = await sourceRouterContract.getOnRamp(destinationChainSelector);
  const onRampContract = new ethers.Contract(onRamp, onRampAbi, sourceProvider);

  const events = await onRampContract.queryFilter("CCIPSendRequested");
  const anyEvents = events as any;
  let messageFound = false;
  for (const anyEvent of anyEvents) {
    if (
      anyEvent.args &&
      anyEvent.args.message &&
      anyEvent.args.message.messageId === messageId
    ) {
      messageFound = true;
      break;
    }
  }

  if (!messageFound) {
    console.error(`Message ${messageId} does not exist on this lane`);
  }

  const destinationRouterContract = new ethers.Contract(
    destinationRouterAddress,
    routerAbi,
    destinationProvider
  );
  const offRamps = await destinationRouterContract.getOffRamps();
  let status = "";
  for (const offRamp of offRamps) {
    if (offRamp.sourceChainSelector.toString() === sourceChainSelector) {
      const offRampContract = new ethers.Contract(
        offRamp.offRamp,
        offRampAbi,
        destinationProvider
      );
      const events = await offRampContract.queryFilter("ExecutionStateChanged");
      const anyEvents = events as any;

      for (let event of anyEvents) {
        if (event.args && event.args.messageId === messageId) {
          const state = event.args.state;
          status = getMessageState(state);
          console.log(`Status of message ${messageId} is ${status}`);
          return status;
        }
      }
    }
  }

  console.log(`Message ${messageId} is not processed yet on destination chain`);
  return status;
};

export default getStatus;
