import { FC } from "react";
// state
import { observer } from "mobx-react-lite";
import { OnboardingStoreProvider, useOnboardingState } from "./store";
// components
import SetupKeysView from "./SetupKeysView";

const OnboardingView: FC = observer(() => {
  const currentView = useOnboardingState((s) => s.currentView);

  switch (currentView) {
    case "keySetup":
      return <SetupKeysView />;
    case "splash":
      return <div />;
    case "welcome":
      return <div />;
    case "complete":
      return <div />;

    default:
      return <div />;
  }
});

const Onboarding: FC = () => {
  return (
    <OnboardingStoreProvider>
      <OnboardingView />
    </OnboardingStoreProvider>
  );
};

export default Onboarding;
