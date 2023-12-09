import { FC, useEffect } from "react";
// state
import { observer } from "mobx-react-lite";
import { useCreateTxnStore, useUserStore } from "../../mobx/stores";
// components
import SelectRecipient from "./SelectRecipient";
import SelectSrc from "./SelectSrc";
import ReviewTxn from "./ReviewTxn";
import { userAddrsToEnable } from "../../mobx/data/seed/enabledAddrs";

// This is becoming a bit convoluted. However, I don't want to use a big routing library just yet.
export const createTxnViewType = [
  "selectRecipient",
  "selectSrc",
  "reviewTxn",
] as const;
export type CreateTxnViewType = (typeof createTxnViewType)[number];
const createTxnViewMap: { [key in CreateTxnViewType]: JSX.Element } = {
  // one prop for each step in the flow
  // each element in this object should be wrapped with <BodyLayout></BodyLayout>
  selectRecipient: <SelectRecipient />,
  selectSrc: <SelectSrc />,
  reviewTxn: <ReviewTxn />,
};

/** ### View controller for CreateTxn
 *
 * CreateTxn view renders within the `Base` view.
 *
 * @todo hideable overview that persists throughout all Create-Txn views
 * @todo Move state provider to this scope (remove from global scope)
 */
const CreateTxn: FC = () => {
  const currentView = useCreateTxnStore((s) => s.currentView);
  /** @deprecated @delete */
  const addresses = useUserStore((s) => s.addresses);
  /** @deprecated @delete */
  const setEnabledAddrTokenStatus = useCreateTxnStore(
    (s) => s.setEnabledAddrTokenStatus
  );
  /** @deprecated @delete */
  const setEnabledAddrTokenSpendLimit = useCreateTxnStore(
    (s) => s.setEnabledAddrTokenSpendLimit
  );
  /** @deprecated @delete */
  const setSendAmt = useCreateTxnStore((s) => s.setSendAmt);
  const setSendAddr = useCreateTxnStore((s) => s.setSendAddr);

  // @todo @delete
  useEffect(() => {
    userAddrsToEnable.forEach(({ addr, tokenId, amt }) => {
      // set form 1 - dst
      setSendAmt("80000");
      setSendAddr("0xd0xk3nf8ww");
      // set form 2 - src
      const userAddr = addresses.get(addr)!;
      const tokenToEnable = userAddr.tokens[tokenId]!;
      setEnabledAddrTokenStatus(tokenToEnable, true);
      setEnabledAddrTokenSpendLimit(tokenToEnable, `${amt}`);
      console.log("added:", tokenToEnable.lookupId, amt);
    });
  }, []);

  return createTxnViewMap[currentView];
};

export default observer(CreateTxn);
