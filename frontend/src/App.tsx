import { FC } from "react";
// components
import Base from "./views/Base";

// @todo this is a placeholder - move to state
type IView = "onboarding" | "base";
let initCurrentView: IView = "base";

const App: FC = () => {
  // @todo change name schema from `userinitiation`/`init`/etc. to `onboarding`
  // @todo replace with state
  const currentView = initCurrentView;

  switch (currentView) {
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
