import { HDNodeWallet } from "ethers";
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
  constructor(
    /** Public address, in string form */
    public value: string,
    /** State lookup ID for blockchain */
    public blockchainId: TestnetId
  ) {}
}

// @todo add wallet to lookup id: `${string]-${TestnetId}-${string}`
export type AddressLookupId = `${TestnetId}-${string}`;

export abstract class BaseUserAddress<
  T extends BaseAddrToken = BaseAddrToken
> extends BaseAddress {
  constructor(
    /** Public address, in string form */
    value: string,
    /** State lookup ID for blockchain */
    blockchainId: TestnetId,
    /** The signer instance for this address.
     * Holds a private key, derived from its root wallet. */
    public wallet: HDNodeWallet,
    public tokens: IAddrTokens<T>
  ) {
    super(value, blockchainId);
  }

  get lookupId(): AddressLookupId {
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
    wallet: HDNodeWallet,
    tokens: IAddrTokens<AddrToken>,
    public label: string
  ) {
    super(value, blockchainId, wallet, tokens);
  }
}
export const newAddress = (
  value: string,
  blockchainId: TestnetId,
  wallet: HDNodeWallet,
  label: string = "",
  tokens: IAddrTokens<AddrToken> = {} as IAddrTokens<AddrToken>
): UserAddress => {
  return new UserAddress(value, blockchainId, wallet, tokens, label);
};
