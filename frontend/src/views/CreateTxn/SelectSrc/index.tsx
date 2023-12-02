import { FC } from "react";
// components
import BodyLayout from "../../../layouts/BodyLayout";
import SrcAddrList from "./SrcAddrList";
import ConfirmSrcButton from "./ConfirmSrcButton";

/** ### Display: Select Sources
 *
 * - List of addresss that can be checked with spend limits
 *    * AddressItem:
 *       - addr value
 *       - addr name
 *       - balance (usd)
 *       - @todo balance detail (usd)
 *       - @todo token-types in addr
 *       - enable/disable
 *       - @todo spend limit
 *       - @todo wallet
 *       - @todo key
 *    - @todo Search address name or key
 *    - @todo (separate ticket) filter
 *    - @todo (separate ticket) group by: key, blockchain, labels
 *    - @todo (separate ticket) advanced sort - label, last used, blockchain, addr value, wallet value
 *    - @todo (separate ticket) Toggle all addresss under key
 * - Display showing amount enabled (@todo move to overview)
 * - @todo hideable overview that persists throughout all Create-Txn views
 */
const SelectSrc: FC = () => {
  return (
    <BodyLayout justifyContent="space-between" overflow="scroll">
      <SrcAddrList />
      <ConfirmSrcButton />
    </BodyLayout>
  );
};

export default SelectSrc;
