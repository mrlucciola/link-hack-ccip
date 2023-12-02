import { FC } from "react";
// components
import BodyLayout from "../../../layouts/BodyLayout";
import SrcAcctList from "./SrcAcctList";

/** ### Display: Select Sources
 *
 * - List of accounts that can be checked with spend limits
 *    * AccountItem:
 *       - acct value
 *       - acct name
 *       - balance (usd)
 *       - balance detail (usd)
 *       - token-types in acct
 *       - enable/disable
 *       - spend limit
 *    - Search account name or key
 *    - Sort acct by name
 *    - @todo (separate ticket) filter
 *    - @todo (separate ticket) group by: key, blockchain, labels
 *    - @todo (separate ticket) advanced sort - last used, blockchain
 *    - @todo (separate ticket) Toggle all accounts under key
 * - Display showing amount enabled (@todo move to overview)
 * - @todo hideable overview that persists throughout all Create-Txn views
 */
const SelectSrc: FC = () => {
  return (
    <BodyLayout justifyContent="space-between" overflow="scroll">
      <SrcAcctList />
    </BodyLayout>
  );
};

export default SelectSrc;
