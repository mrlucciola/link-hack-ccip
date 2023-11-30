import { FC } from "react";
// state
import { observer } from "mobx-react-lite";
import { useOnboardingStore } from "../../mobx/stores";
// components
import SetupWalletsView from "./SetupWalletsView";

const Onboarding: FC = () => {
  const currentView = useOnboardingStore((s) => s.currentView);

  switch (currentView) {
    case "walletSetup":
      return <SetupWalletsView />;
    case "splash":
      return <div>splash</div>;
    case "welcome":
      return <div>welcome</div>;
    case "complete":
      return <div>complete</div>;

    default:
      return <div>default</div>;
  }
};

export default observer(Onboarding);
