import { FC } from "react";
// state
import { observer } from "mobx-react-lite";
import CreateTxn from "../CreateTxn";
import { useBaseStore } from "../../mobx/stores";
import { BaseViewType } from "./store";

// This is becoming a bit convoluted. However, I don't want to use a big routing library just yet.
const bodyViewMap: { [key in BaseViewType]: JSX.Element } = {
  home: <div>home</div>, // <Home />,
  createTxn: <CreateTxn />,
  // one prop for each view that /base/body would render
  // each element in this object should be wrapped with <BodyViewLayout></BodyViewLayout>
};

/** ### View controller for /Base/Body */
const Body: FC = () => {
  const currentView = useBaseStore((s) => s.currentView);

  return bodyViewMap[currentView];
};

export default observer(Body);
