import { FC } from "react";
// state
import { observer } from "mobx-react-lite";
import { OnboardingStoreProvider, useOnboardingState } from "./store";
// components
import RootLayout from "../../layouts/RootLayout";

const OnboardingView: FC = observer(() => {
  const currentView = useOnboardingState((s) => s.currentView);
  console.log("currentView", currentView);

  switch (currentView) {
    case "keySetup":
      // return <SetupKeysView />;
      break;
    case "splash":
      break;
    case "welcome":
      break;
    case "complete":
      break;

    default:
      break;
  }

  return <RootLayout>asdf</RootLayout>;
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
