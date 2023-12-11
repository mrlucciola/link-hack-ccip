import { HDNodeWallet, Wallet } from "ethers";

export type WalletLookupId = string;

// WalletLookupId
/** Child of a `root` wallet
 * Extends ethers.HDNodeWallet */
export class UserWallet extends HDNodeWallet {
  alias: string = "";
  lookupId = "";
  derivedKeyIdxs: number[] = [];
}

/** Return is used to use the UserWallet interface */
export const newUserRootWallet = (
  newWallet: HDNodeWallet | UserWallet,
  alias: string = "",
  derivedKeyIdxs: number[] = []
): UserWallet => {
  (newWallet as UserWallet).alias = alias;
  (newWallet as UserWallet).lookupId = newWallet.address;
  (newWallet as UserWallet).derivedKeyIdxs = derivedKeyIdxs;

  return newWallet as UserWallet;
};

/** ### Create a new wallet from a random seed */
export const newUserWallet = (alias?: string): UserWallet => {
  const initWallet = Wallet.createRandom();
  const newWallet = newUserRootWallet(initWallet, alias);

  return newWallet;
};

export const newWalletFromMnemonic = (
  mnemonic: string,
  alias?: string
): UserWallet => {
  const initWallet = Wallet.fromPhrase(mnemonic);
  const newWallet = newUserRootWallet(initWallet, alias);

  return newWallet;
};

export class RootWallet {}
