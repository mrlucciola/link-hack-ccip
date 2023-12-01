import { FC } from "react";
// state
import { observer } from "mobx-react-lite";
import { useCreateTxnStore } from "../../mobx/stores";

// This is becoming a bit convoluted. However, I don't want to use a big routing library just yet.
export const createTxnViewType = ["start"] as const;
export type CreateTxnViewType = (typeof createTxnViewType)[number];
const createTxnViewMap: { [key in CreateTxnViewType]: JSX.Element } = {
  start: <div>createtxn start</div>, // <CreateTxnStartView />
  // one prop for each step in the flow
  // each element in this object should be wrapped with <BodyLayout></BodyLayout>
};

/** ### View controller for CreateTxn
 */
const CreateTxn: FC = () => {
  const currentView = useCreateTxnStore((s) => s.currentView);

  return createTxnViewMap[currentView];
};

export default observer(CreateTxn);
