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
      return <div>splash</div>;
    case "welcome":
      return <div>welcome</div>;
    case "complete":
      return <div>complete</div>;

    default:
      return <div>default</div>;
  }
});

const Onboarding: FC = () => {
  // add sub-view state to use with switch statement
  // add switch statement to control which sub-view is open
  return (
    <OnboardingStoreProvider>
      <OnboardingView />
    </OnboardingStoreProvider>
  );
};

export default Onboarding;
