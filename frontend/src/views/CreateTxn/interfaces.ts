import { BlockchainId } from "../../mobx/data/supportedBlockchains";
import { TokenId, lookupTokenMktValue } from "../../mobx/data/tokens";
import { Contact } from "../../mobx/interfaces";
import {
  Address,
  BaseAddress,
  IAddrTokens,
} from "../../mobx/interfaces/address";
import { BaseAddrToken } from "../../mobx/interfaces/token";

export class Recipient {
  constructor(public contact: Contact, public address: Address) {}
}
export const newRecipient = (contact: Contact, address: Address) =>
  new Recipient(contact, address);

export class EnabledAddr extends BaseAddress<EnabledAddrToken> {
  constructor(
    value: string,
    blockchainId: BlockchainId,
    public tokens: IAddrTokens<EnabledAddrToken>
  ) {
    super(value, blockchainId, tokens);
  }

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
  blockchainId: BlockchainId,
  tokens?: IAddrTokens<EnabledAddrToken>
): EnabledAddr => {
  return new EnabledAddr(
    value,
    blockchainId,
    tokens || ({} as IAddrTokens<EnabledAddrToken>)
  );
};

export class EnabledAddrToken extends BaseAddrToken {
  constructor(
    id: TokenId,
    blockchainid: BlockchainId,
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
  blockchainId: BlockchainId,
  addrId: string,
  spendLimit: number,
  isEnabled: boolean = false
): EnabledAddrToken => {
  return new EnabledAddrToken(id, blockchainId, addrId, spendLimit, isEnabled);
};
