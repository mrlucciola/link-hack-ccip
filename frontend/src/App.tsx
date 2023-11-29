import { FC } from "react";
// state
import { useViewStore } from "./mobx/stores";
// components
import Base from "./views/Base";

const App: FC = () => {
  const currentRootView = useViewStore((s) => s.currentRootView);

  switch (currentRootView) {
    case "base":
      return <Base />;
    case "onboarding":
      // @todo add <Onboarding /> - prev <Init... />
      break;

    default:
      // @todo add `CrashView` component
      // return <CrashView />
      return <div>App crashed</div>;
  }
};

export default App;
