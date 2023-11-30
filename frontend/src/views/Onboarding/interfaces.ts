import { HDNodeWallet, Wallet } from "ethers";

export type OnboardingViewType =
  | "walletSetup"
  | "splash"
  | "welcome"
  | "complete";

export class UserWallet extends HDNodeWallet {
  alias: string = "";
}
export const newUserWallet = () => {
  const newWallet = Wallet.createRandom() as UserWallet;
  newWallet.alias = "";

  return newWallet;
};
export const newWalletFromMnemonic = (
  mnemonic: string,
  origAlias: string = ""
) => {
  const newWallet = Wallet.fromPhrase(mnemonic) as UserWallet;
  newWallet.alias = origAlias;

  return newWallet;
};
