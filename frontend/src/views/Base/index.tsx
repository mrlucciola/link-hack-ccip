import { FC } from "react";
// state
import { observer } from "mobx-react-lite";
import { useBaseStore } from "../../mobx/stores";
// style
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import InfoIcon from "@mui/icons-material/Info";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SettingsIcon from "@mui/icons-material/Settings";
// components
import RootLayout from "../../layouts/RootLayout";
import TopNav from "./TopNav";
import Body from "./Body";
import BottomNav from "./BottomNav";

const NavBackButton: FC = observer(() => {
  const navBack = useBaseStore((s) => s.navBack);

  return navBack ? (
    <IconButton sx={{ borderRadius: 1 }} onClick={navBack.navTo}>
      <ArrowBackIosIcon />
    </IconButton>
  ) : (
    <></>
  );
});
const NavTitle: FC = observer(() => {
  const navTitle = useBaseStore((s) => s.navTitle);

  return (
    <Typography variant="body1" fontWeight={800}>
      {navTitle}
    </Typography>
  );
});
/** Adding a triple-dot/cogwheel button and associated logic */
const NavUtil: FC = observer(() => {
  const navUtil = useBaseStore((s) => s.navUtil);

  // build elem logic
  let icon: JSX.Element;
  switch (navUtil.id) {
    case "info":
      icon = <InfoIcon />;
      break;
    case "options":
      icon = <MoreVertIcon />;
      break;
    case "settings":
      icon = <SettingsIcon />;
      break;

    default:
      icon = <InfoIcon sx={{ fill: "transparent" }} />;
      break;
  }

  return (
    <IconButton
      sx={{ borderRadius: 1 }}
      disabled={!navUtil.id}
      onClick={navUtil.action}
    >
      {icon}
    </IconButton>
  );
});

const Base: FC = () => {
  /** If not "", render back button which navigate to specified view */

  return (
    <RootLayout>
      <TopNav
        justifyContent="space-between"
        alignItems="center"
        sx={{ background: "green" }}
      >
        <NavBackButton />
        <NavTitle />
        <NavUtil />
      </TopNav>
      <Body />
      <BottomNav />
    </RootLayout>
  );
};

export default Base;
