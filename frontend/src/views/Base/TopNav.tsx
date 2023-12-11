import { FC } from "react";
// state
import { observer } from "mobx-react-lite";
import { useBaseStore } from "../../mobx/stores";
// components
import TopNavLayout from "../../layouts/TopNavLayout";
// style
import Typography from "@mui/material/Typography";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import GridPropsNamespace from "@mui/material/Unstable_Grid2/Grid2Props";
import { PaperProps } from "@mui/material/Paper";
import { SxProps } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
// components
import NavIconButton from "../../layouts/NavIconButton";

type GridProps = GridPropsNamespace.Grid2Props;

const NavBackButton: FC = observer(() => {
  const navBack = useBaseStore((s) => s.navBack);

  /** If not `{}/undefined`, render the back-button, which navigates to specified view via the `navTo` action */
  return navBack ? (
    <>
      <NavIconButton onClick={navBack.navTo}>
        <ArrowBackIosIcon
          sx={{ "& path": { transform: "translate(0.5rem, 0px)" } }}
        />
      </NavIconButton>
      <NavIconButton isEmpty />
    </>
  ) : (
    <>
      <NavIconButton isEmpty />
      <NavIconButton isEmpty />
    </>
  );
});

const NavTitle: FC = observer(() => {
  const navTitle = useBaseStore((s) => s.navTitle);

  return (
    <Typography
      variant="body1"
      fontWeight={800}
      noWrap
      flex={1}
      textAlign="center"
    >
      {navTitle}
    </Typography>
  );
});

/** ### Controller for rendering buttons on the right side of the nav bar */
const NavUtil: FC = observer(() => {
  const navUtils = useBaseStore((s) => s.navUtils);

  // build elem logic
  const utilIcons = navUtils.map((u, idx) => {
    switch (u.id) {
      case "info":
        return (
          <NavIconButton onClick={u.action} key={idx}>
            <InfoIcon />
          </NavIconButton>
        );

      case "options":
        return (
          <NavIconButton onClick={u.action} key={idx}>
            <MoreVertIcon />
          </NavIconButton>
        );

      case "settings":
        return (
          <NavIconButton onClick={u.action} key={idx}>
            <SettingsIcon />
          </NavIconButton>
        );

      case "notifications":
        return (
          <NavIconButton onClick={u.action} key={idx}>
            <NotificationsIcon />
          </NavIconButton>
        );
    }
  });

  return utilIcons.length === 0 ? (
    // @note Empty icons to set spacing without needing to manually apply css
    <>
      <NavIconButton isEmpty />
      <NavIconButton isEmpty />
    </>
  ) : (
    utilIcons
  );
});

const styleWaves: SxProps = {
  backgroundColor: "#60a4db",
  opacity: 1,
  backgroundImage:
    "repeating-radial-gradient( circle at 0 0, transparent 0, #60a4db 8px ), repeating-linear-gradient( #b4bec755, #b4bec7 )",
};

const TopNav: FC = () => {
  const currentView = useBaseStore((s) => s.currentView);

  // Customize navbar props based on current view
  const overrideProps: GridProps & PaperProps = {};
  switch (currentView) {
    case "home":
      overrideProps.elevation = 0;
      overrideProps.height = "100px";
      overrideProps.minHeight = "100px";
      overrideProps.maxHeight = "100px";
      overrideProps.sx = styleWaves;
      break;
    default:
      break;
  }

  return (
    <TopNavLayout {...overrideProps}>
      <TopNavLayout
        flex="1"
        px={0.5}
        {...{
          ...overrideProps,
          sx: {
            background: `linear-gradient(
              to top,
              rgba(255, 255, 255, 1) 0%,
              rgba(0, 0, 0, 0) 125%
            )
          `,
          },
        }}
      >
        <NavBackButton />
        <NavTitle />
        <NavUtil />
      </TopNavLayout>
    </TopNavLayout>
  );
};

export default observer(TopNav);
