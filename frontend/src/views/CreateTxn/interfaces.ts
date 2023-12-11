import { HDNodeWallet } from "ethers";
import { TestnetId } from "../../mobx/data/supportedBlockchains";
import { TokenId, lookupTokenMktValue } from "../../mobx/data/tokens";
import { Contact } from "../../mobx/interfaces";
import {
  UserAddress,
  BaseUserAddress,
  IAddrTokens,
} from "../../mobx/interfaces/address";
import { BaseAddrToken } from "../../mobx/interfaces/token";
import { WalletLookupId } from "../../mobx/interfaces/wallet";

export class Recipient {
  constructor(public contact: Contact, public address: UserAddress) {}
}
export const newRecipient = (contact: Contact, address: UserAddress) =>
  new Recipient(contact, address);

export class EnabledAddr extends BaseUserAddress<EnabledAddrToken> {
  constructor(
    value: string,
    blockchainId: TestnetId,
    wallet: HDNodeWallet,
    rootWalletLookupId: WalletLookupId,
    tokens: IAddrTokens<EnabledAddrToken>
  ) {
    super(value, blockchainId, wallet, rootWalletLookupId, tokens);
  }

  /** Enabled amount, not holdings */
  get totalMktValue(): number {
    let sum = 0;

    Object.values(this.tokens).forEach((t) => {
      sum += t.mktValue;
    });

    return sum;
  }
  get isEnabled(): boolean {
    return this.totalMktValue > 0;
  }
}
export const newEnabledAddr = (
  value: string,
  blockchainId: TestnetId,
  wallet: HDNodeWallet,
  rootWalletLookupId: WalletLookupId,
  tokens?: IAddrTokens<EnabledAddrToken>
): EnabledAddr => {
  return new EnabledAddr(
    value,
    blockchainId,
    wallet,
    rootWalletLookupId,
    tokens || ({} as IAddrTokens<EnabledAddrToken>)
  );
};

export class EnabledAddrToken extends BaseAddrToken {
  constructor(
    id: TokenId,
    blockchainid: TestnetId,
    addrId: string,
    public spendLimit: number,
    public isEnabled: boolean
  ) {
    super(id, blockchainid, addrId);
  }

  get mktValue(): number {
    return this.isEnabled ? lookupTokenMktValue(this.id) * this.spendLimit : 0;
  }
}
export const newEnabledAddrToken = (
  id: TokenId,
  blockchainId: TestnetId,
  addrId: string,
  spendLimit: number,
  isEnabled: boolean = false
): EnabledAddrToken => {
  return new EnabledAddrToken(id, blockchainId, addrId, spendLimit, isEnabled);
};

export interface StagedAddrToken extends Omit<EnabledAddrToken, "isEnabled"> {
  fee: number;
  sendAmt: number;
}
