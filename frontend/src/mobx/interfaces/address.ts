import { mktValueFmt } from "../../utils/fmt";
import {
  BlockchainId,
  BlockchainInfo,
  getBlockchainInfo,
} from "../data/supportedBlockchains";
import { TokenId } from "../data/tokens";
import { AddrToken, BaseAddrToken } from "./token";

export type IAddrTokens<T extends BaseAddrToken = BaseAddrToken> = {
  [key in TokenId]?: T;
};

export abstract class BaseAddress<T extends BaseAddrToken> {
  abstract totalMktValue: number;

  constructor(
    public value: string,
    public blockchainId: BlockchainId,
    public tokens: IAddrTokens<T>
  ) {}

  get lookupId(): string {
    return `${this.blockchainId}-${this.value}`;
  }
  get blockchainInfo(): BlockchainInfo {
    return getBlockchainInfo(this.blockchainId);
  }
  get totalMktValueFmt(): string {
    return mktValueFmt(this.totalMktValue);
  }
}

export class Address extends BaseAddress<AddrToken> {
  constructor(
    value: string,
    blockchainId: BlockchainId,
    tokens: IAddrTokens<AddrToken>,
    public label: string
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
}
export const newAddress = (
  value: string,
  blockchainId: BlockchainId,
  label: string = "",
  tokens: IAddrTokens<AddrToken> = {} as IAddrTokens<AddrToken>
): Address => {
  return new Address(value, blockchainId, tokens, label);
};
