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
 *       - balance detail (usd)
 *       - token-types in addr
 *       - enable/disable
 *       - spend limit
 *    - Search account name or key
 *    - Sort addr by name
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
