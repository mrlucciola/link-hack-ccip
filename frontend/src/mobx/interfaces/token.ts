import { mktValueFmt } from "../../utils/fmt";
import { BlockchainId, TestnetId } from "../data/supportedBlockchains";
import { TokenId, lookupTokenLabel, lookupTokenMktValue } from "../data/tokens";

// @todo fix - this is ad-hoc
export abstract class BaseAddrToken {
  abstract mktValue: number;

  constructor(
    public id: TokenId,
    public blockchainId: BlockchainId | TestnetId,
    public addrId: string
  ) {}

  get lookupId(): string {
    return `${this.id}-${this.blockchainId}-${this.addrId}`;
  }
  get label(): string {
    return lookupTokenLabel(this.id);
  }
  get mktValueFmt(): string {
    return mktValueFmt(this.mktValue);
  }
}

/** ## Token contained within an address.
 * User-owned token.
 */
export class AddrToken extends BaseAddrToken {
  constructor(
    id: TokenId,
    blockchainId: BlockchainId | TestnetId,
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
  blockchainId: BlockchainId | TestnetId,
  addrId: string,
  amount: number
) => new AddrToken(id, blockchainId, addrId, amount);
