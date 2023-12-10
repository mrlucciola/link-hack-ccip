import { HDNodeWallet, Wallet } from "ethers";
import { v4 as uuidv4 } from "uuid";

// import { UserWallet, newUserWallet } from "../../../mobx/interfaces/wallet";

export type WalletLookupId =
  `${string}-${string}-${string}-${string}-${string}`;

// WalletLookupId
/** Child of a `root` wallet
 * Extends ethers.HDNodeWallet */
export class UserWallet extends HDNodeWallet {
  alias: string = "";
  lookupId: WalletLookupId = uuidv4() as WalletLookupId;
  derivedKeyIdxs: number[] = [];
}
export const newUserWallet = () => {
  const newWallet = Wallet.createRandom() as UserWallet;
  newWallet.alias = "";

  return newWallet;
};
export const newWalletFromMnemonic = (mnemonic: string, alias: string = "") => {
  const newWallet = Wallet.fromPhrase(mnemonic) as UserWallet;
  newWallet.alias = alias;

  return newWallet;
};

export class RootWallet {}
export const newRootWallet = () => {};
