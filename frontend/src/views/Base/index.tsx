import { FC } from "react";
// state
import { observer } from "mobx-react-lite";
import { useBaseStore } from "../../mobx/stores";
// style
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
// components
import RootLayout from "../../layouts/RootLayout";
import TopNav from "./TopNav";
import Body from "./Body";
import BottomNav from "./BottomNav";

const BackButton: FC = observer(() => {
  const navBack = useBaseStore((s) => s.navBack);

  return navBack ? (
    <IconButton sx={{ borderRadius: 1 }} onClick={navBack.navTo}>
      <ArrowBackIosIcon />
    </IconButton>
  ) : (
    <></>
  );
});

const Base: FC = () => {
  /** If not "", render back button which navigate to specified view */

  return (
    <RootLayout>
      <TopNav>{<BackButton />}</TopNav>
      <Body />
      <BottomNav />
    </RootLayout>
  );
};

export default Base;
