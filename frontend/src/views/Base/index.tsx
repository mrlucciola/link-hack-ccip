import { FC } from "react";
// components
import RootLayout from "../../layouts/RootLayout";
import Body from "./Body";
import BottomNav from "./BottomNav";
import TopNav from "./TopNav";

/** Layout component for `Base` root-view */
const Base: FC = () => (
  <RootLayout>
    <TopNav />
    <Body />
    <BottomNav />
  </RootLayout>
);

export default Base;
