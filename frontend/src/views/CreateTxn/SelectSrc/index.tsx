import { FC, useEffect } from "react";
// state
import { observer } from "mobx-react-lite";
import { useBaseStore, useCreateTxnStore } from "../../../mobx/stores";
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
 *       - balance detail (usd)
 *       - token-types in addr
 *       - enable/disable
 *       - spend limit
 *       - @todo wallet
 *       - @todo key
 *    - @todo (separate ticket) Search address name or key
 *    - @todo (separate ticket) filter
 *    - @todo (separate ticket) group by: key, blockchain, labels
 *    - @todo (separate ticket) advanced sort - label, last used, blockchain, addr value, wallet value
 *    - @todo (separate ticket) Toggle all addressss within key
 * - (temporary) Display showing amount enabled
 *    - @todo move to overview
 * - @todo hideable overview that persists throughout all Create-Txn views
 */
const SelectSrc: FC = () => {
  const setCurrentView = useCreateTxnStore((s) => s.setCurrentView);
  const setNavBack = useBaseStore((s) => s.setNavBack);

  useEffect(() => {
    setNavBack({
      baseView: "createTxn",
      subView: "selectRecipient",
      navTo: () => setCurrentView("selectRecipient"),
    });
    
  }, []);

  return (
    <BodyLayout justifyContent="space-between" flex={1}>
      <SrcAddrList />
      <ConfirmSrcButton />
    </BodyLayout>
  );
};

export default observer(SelectSrc);
