import { FC, useEffect } from "react";
// state
import { observer } from "mobx-react-lite";
import { useCreateTxnStore, useUserStore } from "../../mobx/stores";
// components
import SelectRecipient from "./SelectRecipient";
import SelectSrc from "./SelectSrc";
import ReviewTxn from "./ReviewTxn/ConfirmSubmitButton";
// seed - @todo @delete
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
  /** @deprecated @todo @delete - used for seed */
  const addresses = useUserStore((s) => s.addresses);
  /** @deprecated @todo @delete - used for seed */
  const setEnabledAddrTokenStatus = useCreateTxnStore(
    (s) => s.setEnabledAddrTokenStatus
  );
  /** @deprecated @todo @delete - used for seed */
  const setEnabledAddrTokenSpendLimit = useCreateTxnStore(
    (s) => s.setEnabledAddrTokenSpendLimit
  );
  /** @deprecated @todo @delete - used for seed */
  const setSendAmt = useCreateTxnStore((s) => s.setSendAmt);
  /** @deprecated @todo @delete - used for seed */
  const setSendAddr = useCreateTxnStore((s) => s.setSendAddr);
  useEffect(() => {
    // seed create-txn:
    userAddrsToEnable.forEach(({ addr, blockchainId, tokenId, amt }) => {
      // set form 1 - dst
      setSendAmt("80000");
      setSendAddr("0xd0xk3nf8ww");
      // set form 2 - src
      const userAddr = addresses.get(`${blockchainId}-${addr}`)!;
      if (!userAddr) {
        console.log(`no value for lookupid: ${blockchainId}-${addr}`);
        console.log("\naddresses:");
        addresses.forEach((a, l) => console.log("  ", l, " - ", a));
        console.log();
      } else {
        const tokenToEnable = userAddr.tokens[tokenId]!;

        setEnabledAddrTokenStatus(tokenToEnable, true);
        setEnabledAddrTokenSpendLimit(tokenToEnable, `${amt}`);
      }
    });
  }, []);

  return createTxnViewMap[currentView];
};

export default observer(CreateTxn);
