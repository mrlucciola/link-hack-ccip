import { FC } from "react";
// state
import { observer } from "mobx-react-lite";
import { useBaseStore } from "../../mobx/stores";
import { BaseView } from "./store";
// components
import CreateTxn from "../CreateTxn";
import BodyLayout from "../../layouts/BodyLayout";

// This is becoming a bit convoluted. However, I don't want to use a big routing library just yet.
const bodyViewMap: { [key in BaseView]: JSX.Element } = {
  home: <BodyLayout>home</BodyLayout>, // <Home />,
  portfolio: <BodyLayout>portfolio</BodyLayout>,
  createTxn: <CreateTxn />,
  activity: <BodyLayout>activity</BodyLayout>,
  contacts: <BodyLayout>contacts</BodyLayout>,
  // one prop for each view that /base/body would render
  // each element in this object should be wrapped with <BodyViewLayout></BodyViewLayout>
};

/** ### View controller for /Base/Body */
const Body: FC = () => {
  const currentView = useBaseStore((s) => s.currentView);

  return bodyViewMap[currentView];
};

export default observer(Body);
