import { FC } from "react";
// state
import { observer } from "mobx-react-lite";
import { useCreateTxnStore } from "../../mobx/stores";
// components
import RootLayout from "../../layouts/RootLayout";
import TopNav from "../Base/TopNav";

/** Navbar for
 * @todo move to
 */
const CreateTxnNav: FC = observer(() => {
  // current-view label
  // const currentViewLabel = useCreateTxnStore((s) => s.currentViewLabel);

  return (
    <TopNav>
      {/* Back button
    - onClick: if not empty txn, prompt user w/ modal "save as draft?" save/discard
    */}
      {/* currentViewLabel */}
      {/* viewDrafts */}
    </TopNav>
  );
});

// This is becoming a bit convoluted. However, I don't want to use a big routing library just yet.
const createTxnViewMap = {
  start: <div>createtxn start</div>, // <CreateTxnStartView />
  // one prop for each step in the flow
  // each element in this object should be wrapped with <CreateTxnViewLayout></CreateTxnViewLayout>
};
export type CreateTxnViewType = keyof typeof createTxnViewMap;

const CreateTxnViewController: FC = observer(() => {
  const currentView = useCreateTxnStore((s) => s.currentView);

  // return createTxnViewMap[currentView]

  // delete this (use the above commented-out line):
  return (
    <div>
      <div>CreateTxn View Controller</div>
      <div>view: {currentView}</div>
      {createTxnViewMap[currentView]}
    </div>
  );
});

/** ### Display component for CreateTxn View
 */
const CreateTxn: FC = () => {
  return (
    <RootLayout>
      <CreateTxnNav />
      <CreateTxnViewController />
    </RootLayout>
  );
};

export default CreateTxn;
