import { fmtMktValue } from "../../utils/fmt";
import { TestnetId } from "../data/supportedBlockchains";
import {
  TokenData,
  TokenId,
  getTokenInfo,
  lookupTokenMktValue,
} from "../data/tokens";
import { AddressLookupId } from "./address";

export type TokenLookupId = `${string}-${AddressLookupId}`;
// @todo fix - this is ad-hoc
export abstract class BaseAddrToken {
  abstract mktValue: number;

  constructor(
    public id: TokenId,
    public blockchainId: TestnetId,
    public addrId: string
  ) {}

  /** Key/Lookup value for the map in state */
  get lookupId(): TokenLookupId {
    return `${this.id}-${this.addrLookupId}`;
  }
  get addrLookupId(): AddressLookupId {
    return `${this.blockchainId}-${this.addrId}`;
  }
  get label(): string {
    return this.tokenInfo.label;
  }
  get mktValueFmt(): string {
    return fmtMktValue(this.mktValue);
  }
  get tokenInfo(): TokenData {
    return getTokenInfo(this.id);
  }
}

/** ## Token owned by an address.
 * User-owned token.
 * @todo maybe rename to UserAddrToken
 */
export class AddrToken extends BaseAddrToken {
  constructor(
    id: TokenId,
    blockchainId: TestnetId,
    addrId: string,
    public amount: number
  ) {
    super(id, blockchainId, addrId);
  }

  get mktValue(): number {
    return lookupTokenMktValue(this.id) * this.amount;
  }
}
export const newAddrToken = (
  id: TokenId,
  blockchainId: TestnetId,
  addrId: string,
  amount: number
) => new AddrToken(id, blockchainId, addrId, amount);
