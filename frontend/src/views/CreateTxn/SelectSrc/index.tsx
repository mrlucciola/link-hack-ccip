import { FC } from "react";
// components
import BodyLayout from "../../../layouts/BodyLayout";
import SrcAddrList from "./SrcAddrList";

/** ### Display: Select Sources
 *
 * - List of accounts that can be checked with spend limits
 *    * AccountItem:
 *       - addr value
 *       - addr name
 *       - balance (usd)
 *       - @todo balance detail (usd)
 *       - @todo token-types in addr
 *       - enable/disable
 *       - @todo spend limit
 *       - @todo wallet
 *       - @todo key
 *    - Search account name or key
 *    - @todo Sort addr by name
 *    - @todo (separate ticket) filter
 *    - @todo (separate ticket) group by: key, blockchain, labels
 *    - @todo (separate ticket) advanced sort - last used, blockchain, addr value, wallet value
 *    - @todo (separate ticket) Toggle all accounts under key
 * - Display showing amount enabled (@todo move to overview)
 * - @todo hideable overview that persists throughout all Create-Txn views
 */
const SelectSrc: FC = () => {
  return (
    <BodyLayout justifyContent="space-between" overflow="scroll">
      <SrcAddrList />
    </BodyLayout>
  );
};

export default SelectSrc;
