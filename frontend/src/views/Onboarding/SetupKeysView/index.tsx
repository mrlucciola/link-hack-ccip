import { FC } from "react";
// components
import RootLayout from "../../../layouts/RootLayout";
import GenerateKeyUtil from "./GenerateKeyUtil";
import StagedKeysForm from "./StagedKeysForm";
import CompleteOnboardingButton from "./CompleteOnboardingButton";

const SetupKeysView: FC = () => {
  return (
    <RootLayout justifyContent="space-between">
      <GenerateKeyUtil />
      <StagedKeysForm />
      <CompleteOnboardingButton />
    </RootLayout>
  );
};

export default SetupKeysView;
