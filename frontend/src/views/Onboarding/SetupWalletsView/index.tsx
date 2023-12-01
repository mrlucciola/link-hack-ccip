import { FC } from "react";
// components
import RootLayout from "../../../layouts/RootLayout";
import GenerateWalletUtil from "./GenerateWalletUtil";
import StagedWalletsForm from "./StagedWalletsForm";
import CompleteOnboardingButton from "./CompleteOnboardingButton";

const SetupWalletsView: FC = () => {
  return (
    <RootLayout justifyContent="space-between">
      <GenerateWalletUtil />
      <StagedWalletsForm />
      <CompleteOnboardingButton />
    </RootLayout>
  );
};

export default SetupWalletsView;
