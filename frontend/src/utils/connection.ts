import {
  Contract,
  HDNodeWallet,
  JsonRpcProvider,
  JsonRpcApiProviderOptions,
  Wallet,
} from "ethers";
import { TestnetId } from "../mobx/data/supportedBlockchains";
import { senderCcipAbi, senderCcipAddress } from "../mobx/data/contract";
import { connectionInfo } from "../mobx/data/connection";
import { AbstractProvider } from "ethers";

/** ### Create a wallet with provider using a mnemonic/phrase
 * @todo improve validation
 * @todo use Mnemonic type
 * @todo support multiple standards
 */
export const initWalletFromMnemonic = (
  /** Full mnemoinc, 12 words separated by spaces */
  mnemonicStr: string,
  blockchainId: TestnetId
): HDNodeWallet => {
  // Validation
  // @note this is placeholder validation
  const mnemonicWordCt = mnemonicStr.split(" ").length;
  if (mnemonicWordCt !== 12) {
    throw new Error(
      `Must use 12-word mnemonic/phrase. Input = ${mnemonicWordCt} words:\n${mnemonicStr}`
    );
  }

  // Create wallet instance
  const provider = connectionInfo[blockchainId].provider;
  const wallet = Wallet.fromPhrase(mnemonicStr, provider);

  return wallet;
};

export const newSenderContractInstance = (
  blockchainId: TestnetId, // @todo add address after deploying to testnet
  provider: AbstractProvider
): Contract => {
  const newContract = new Contract(
    senderCcipAddress[blockchainId],
    senderCcipAbi,
    { provider }
  );

  return newContract;
};

const protocol = "https://";

/** ### Create a connection to a RPC provider
 * For ethers NOT web3.
 */
export const newProvider = (
  rpcUrl: string,
  networkConfig?: {
    name?: string;
    chainId?: number;
    ensAddress?: string;
    ensNetwork?: number;
  },
  options?: JsonRpcApiProviderOptions
): AbstractProvider => {
  // Validate inputs
  if (!rpcUrl.includes(protocol)) {
    throw new Error("Must use https");
  }

  // @todo see if we need to use browserprovider - https://stackoverflow.com/a/67836760 and https://stackoverflow.com/a/72988845
  // return new ethers.BrowserProvider(window.ethereum);
  const provider = new JsonRpcProvider(rpcUrl, networkConfig, options);
  // provider.getSigner()
  return provider;
};
