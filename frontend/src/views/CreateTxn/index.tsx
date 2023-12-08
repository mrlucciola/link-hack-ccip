import { FC } from "react";
// state
import { observer } from "mobx-react-lite";
import { useCreateTxnStore } from "../../mobx/stores";
// components
import SelectRecipient from "./SelectRecipient";
import SelectSrc from "./SelectSrc";
import ReviewTxn from "./ReviewTxn";

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

  return createTxnViewMap[currentView];
};

export default observer(CreateTxn);
