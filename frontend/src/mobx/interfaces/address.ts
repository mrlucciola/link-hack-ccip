import {
  BlockchainInfo,
  TestnetId,
  getBlockchainInfo,
} from "../data/supportedBlockchains";
import { TokenId } from "../data/tokens";
import { AddrToken, BaseAddrToken } from "./token";
import { fmtMktValue } from "../../utils/fmt";

export type IAddrTokens<T extends BaseAddrToken = BaseAddrToken> = {
  [key in TokenId]?: T;
};

export abstract class BaseAddress {
  constructor(public value: string, public blockchainId: TestnetId) {}
}

export abstract class BaseUserAddress<T extends BaseAddrToken> {
  constructor(
    /** Public address, in string form */
    public value: string,
    /** State lookup ID for blockchain */
    public blockchainId: TestnetId,
    public tokens: IAddrTokens<T>
  ) {}

  get lookupId(): string {
    return `${this.blockchainId}-${this.value}`;
  }
  get blockchainInfo(): BlockchainInfo<TestnetId> {
    return getBlockchainInfo(this.blockchainId);
  }
  get totalMktValue(): number {
    let sum = 0;

    Object.values(this.tokens).forEach((t) => {
      sum += t.mktValue;
    });

    return sum;
  }
  get totalMktValueFmt(): string {
    return fmtMktValue(this.totalMktValue);
  }
}

export class UserAddress extends BaseUserAddress<AddrToken> {
  constructor(
    value: string,
    blockchainId: TestnetId,
    tokens: IAddrTokens<AddrToken>,
    public label: string
  ) {
    super(value, blockchainId, tokens);
  }
}
export const newAddress = (
  value: string,
  blockchainId: TestnetId,
  label: string = "",
  tokens: IAddrTokens<AddrToken> = {} as IAddrTokens<AddrToken>
): UserAddress => {
  return new UserAddress(value, blockchainId, tokens, label);
};
