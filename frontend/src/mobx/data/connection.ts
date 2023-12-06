import { HDNodeWallet } from "ethers";
import { Mnemonic } from "ethers";
import { Wallet } from "ethers";
import { JsonRpcApiProviderOptions, JsonRpcProvider } from "ethers";

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
): JsonRpcProvider => {
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

/** ### Create a wallet with provider using a mnemonic/phrase
 * @todo improve validation
 * @todo use Mnemonic type
 * @todo support multiple standards
 */
export const initWalletFromMnemonic = (
  /** Full mnemoinc, 12 words separated by spaces */
  mnemonicStr: string,
  rpcUrl: string,
  networkConfig?: {
    name?: string;
    chainId?: number;
    ensAddress?: string;
    ensNetwork?: number;
  },
  options?: JsonRpcApiProviderOptions
): HDNodeWallet => {
  // Validation
  const mnemonicWordCt = mnemonicStr.split(" ").length;
  // @note this is placeholder validation
  if (mnemonicWordCt !== 12) {
    throw new Error(
      `Must use 12-word mnemonic/phrase. Input = ${mnemonicWordCt} words:\n${mnemonicStr}`
    );
  }

  // Create new provider instance
  const provider = newProvider(rpcUrl, networkConfig, options);

  // Create wallet instance
  const wallet = Wallet.fromPhrase(mnemonicStr, provider);
  // wallet.prov

  return wallet;
};
// let provider = new HDWalletProvider({
//   mnemonic: { phrase: WEB3_MNEMONIC },
//   providerOrUrl: DEDICATED_WSS,
// });

const getContract = (web3Instance: any, abi: any, address: any) => {
  let msg;
  if (!web3Instance) msg = `Please use valid web3Instance: ${web3Instance}`;
  if (!abi) msg = `Please use valid abi: ${abi}`;
  if (!address) msg = `Please use valid address: ${address}`;
  if (msg) throw msg;

  const contract = new web3Instance.eth.Contract(abi, address);
  return contract;
};

const closeWeb3 = (web3Instance: any) => {
  console.log("Closing web3 connection");
  return web3Instance.currentProvider.disconnect();
};
