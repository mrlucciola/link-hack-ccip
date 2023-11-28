import { FC } from "react";
// components
import TopNav from "./TopNav";
import Body from "./Body";
import BottomNav from "./BottomNav";
import RootLayout from "../../layouts/RootLayout";

const Base: FC = () => {
  return (
    <RootLayout>
      <TopNav />
      <Body />
      <BottomNav />
    </RootLayout>
  );
};

export default Base;
