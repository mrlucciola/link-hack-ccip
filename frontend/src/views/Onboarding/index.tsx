import { FC } from "react";
// state
import { OnboardingStoreProvider, useOnboardingState } from "./store";
import { observer } from "mobx-react-lite";
// components
import RootLayout from "../../layouts/RootLayout";

const OnboardingView: FC = observer(() => {
  const currentView = useOnboardingState((s) => s.currentView);

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
  return (
    <OnboardingStoreProvider>
      <OnboardingView />
    </OnboardingStoreProvider>
  );
};

export default Onboarding;
