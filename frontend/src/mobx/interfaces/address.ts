import { mktValueFmt } from "../../utils/fmt";
import {
  BlockchainId,
  BlockchainInfo,
  getBlockchainInfo,
} from "../data/supportedBlockchains";
import { TokenId, lookupTokenLabel, lookupTokenMktValue } from "../data/tokens";

export class Address {
  constructor(
    public value: string,
    public blockchainId: BlockchainId,
    public label: string,
    public tokens: AddrToken[]
  ) {}

  get blockchainInfo(): BlockchainInfo {
    return getBlockchainInfo(this.blockchainId);
  }
  // @todo add totalMktValue to state
  get totalMktValue(): number {
    let sum = 0;
    this.tokens.forEach((t) => {
      sum += t.mktValue;
    });

    return sum;
  }
  get totalMktValueFmt(): string {
    return mktValueFmt(this.totalMktValue);
  }
  get lookupId(): string {
    return `${this.blockchainId}-${this.value}`;
  }
}
export const newAddress = (
  addr: Pick<Address, "value" | "blockchainId" | "label"> &
    Partial<Pick<Address, "tokens">>
): Address => {
  const tokens = addr.tokens || [];

  return new Address(addr.value, addr.blockchainId, addr.label, tokens);
};

export class AddrToken {
  constructor(
    public id: TokenId,
    public blockchainId: BlockchainId,
    public amount: number,
    public addrId: string
  ) {}
  get lookupId(): string {
    return `${this.id}-${this.blockchainId}-${this.addrId}`;
  }
  get label(): string {
    return lookupTokenLabel(this.id);
  }
  get mktValue(): number {
    return lookupTokenMktValue(this.id) * this.amount;
  }
  get mktValueFmt(): string {
    return mktValueFmt(this.mktValue);
  }
}
export const newAddrToken = (
  token: Pick<AddrToken, "id" | "blockchainId" | "amount">,
  addrId: string
) => new AddrToken(token.id, token.blockchainId, token.amount, addrId);
