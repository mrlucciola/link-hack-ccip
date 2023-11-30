import { FC } from "react";
// state
import { observer } from "mobx-react-lite";
import { useViewStore } from "./mobx/stores";
// components
import Base from "./views/Base";
import Onboarding from "./views/Onboarding";

const App: FC = () => {
  const currentRootView = useViewStore((s) => s.currentRootView);
  console.log("currentrootview", currentRootView);

  switch (currentRootView) {
    case "base":
      return <Base />;
    case "onboarding":
      return <Onboarding />;

    default:
      // @todo add `CrashView` component
      // return <CrashView />
      return <div>App crashed</div>;
  }
};

export default observer(App);
