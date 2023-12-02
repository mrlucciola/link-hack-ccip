import { FC } from "react";
// state
import { observer } from "mobx-react-lite";
import { useCreateTxnStore } from "../../mobx/stores";
// components
import SelectRecipient from "./SelectRecipient";
import SelectSrc from "./SelectSrc";

// This is becoming a bit convoluted. However, I don't want to use a big routing library just yet.
export const createTxnViewType = ["selectRecipient", "selectSrc"] as const;
export type CreateTxnViewType = (typeof createTxnViewType)[number];
const createTxnViewMap: { [key in CreateTxnViewType]: JSX.Element } = {
  selectRecipient: <SelectRecipient />,
  selectSrc: <SelectSrc />,
  // one prop for each step in the flow
  // each element in this object should be wrapped with <BodyLayout></BodyLayout>
};

/** ### View controller for CreateTxn
 *
 * @todo hideable overview that persists throughout all Create-Txn views
 * @todo Move state provider to this scope (remove from global scope)
 */
const CreateTxn: FC = () => {
  const currentView = useCreateTxnStore((s) => s.currentView);

  return createTxnViewMap[currentView];
};

export default observer(CreateTxn);
