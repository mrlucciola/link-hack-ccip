import { FC, useEffect } from "react";
// state
import { observer } from "mobx-react-lite";
import { useBaseStore } from "../../mobx/stores";
// style
import Button, { ButtonProps } from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// import { SxProps } from "@mui/material";
// components
import BodyLayout from "../../layouts/BodyLayout";

// const styleWaves: SxProps = {
//   backgroundColor: "#60a4db",
//   opacity: 1,
//   backgroundImage:
//     "repeating-radial-gradient( circle at 0 0, transparent 0, #60a4db 8px ), repeating-linear-gradient( #b4bec755, #b4bec7 )",
// };
// const styleZigzag: SxProps = {
//   backgroundColor: "#e5e5f7",
//   opacity: 0.3,
//   background:
//     "linear-gradient(135deg, #f7964555 25%, transparent 25%) -4px 0/ 8px 8px, linear-gradient(225deg, #f79645 25%, transparent 25%) -4px 0/ 8px 8px, linear-gradient(315deg, #f7964555 25%, transparent 25%) 0px 0/ 8px 8px, linear-gradient(45deg, #f79645 25%, #e5e5f7 25%) 0px 0/ 8px 8px",
// };
// const styleIsometric: SxProps = {
//   backgroundColor: "#e5e5f7",
//   opacity: 0.1,
//   backgroundImage:
//     "linear-gradient(30deg, #00ad41 12%, transparent 12.5%, transparent 87%, #00ad41 87.5%, #00ad41), linear-gradient(150deg, #00ad41 12%, transparent 12.5%, transparent 87%, #00ad41 87.5%, #00ad41), linear-gradient(30deg, #00ad41 12%, transparent 12.5%, transparent 87%, #00ad41 87.5%, #00ad41), linear-gradient(150deg, #00ad41 12%, transparent 12.5%, transparent 87%, #00ad41 87.5%, #00ad41), linear-gradient(60deg, #00ad4177 25%, transparent 25.5%, transparent 75%, #00ad4177 75%, #00ad4177), linear-gradient(60deg, #00ad4177 25%, transparent 25.5%, transparent 75%, #00ad4177 75%, #00ad4177)",
//   backgroundSize: "18px 32px",
//   backgroundPosition: "0 0, 0 0, 9px 16px, 9px 16px, 0 0, 9px 16px",
// };

/** ### Styling component for individual menu items */
const MenuButton: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Button
      variant="contained"
      sx={{
        textTransform: "none",
        justifyContent: "start",
        py: 5,
        mx: 0.5,
        my: 0.25,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

/** ### Layout component for Home view
 *
 * Home view renders within the `Base` view.
 *
 * @todo add high-level data to buttons
 */
const Home: FC = () => {
  const setCurrentView = useBaseStore((s) => s.setCurrentView);
  const setNavBack = useBaseStore((s) => s.setNavBack);
  const setNavTitle = useBaseStore((s) => s.setNavTitle);
  const setNavUtils = useBaseStore((s) => s.setNavUtils);

  useEffect(() => {
    setNavBack();
    setNavTitle("");
    setNavTitle("");
    setNavUtils([
      {
        id: "notifications",
        action: () => {},
      },
      {
        id: "options",
        action: () => {},
      },
    ]);

    return () => {
      setNavUtils([]);
    };
  }, []);

  return (
    <BodyLayout overflow="hidden scroll" pl={1} pr={2}>
      <MenuButton onClick={() => setCurrentView("portfolio")}>
        <Typography>Portfolio</Typography>
      </MenuButton>
      <MenuButton onClick={() => setCurrentView("activity")}>
        <Typography>Activity & History</Typography>
      </MenuButton>
      <MenuButton onClick={() => setCurrentView("contacts")}>
        <Typography>Contacts</Typography>
      </MenuButton>
      <MenuButton
        disabled
        onClick={
          // @todo set up receive view
          () => null // setCurrentView("receive")
        }
      >
        <Typography>Receive tokens</Typography>
      </MenuButton>
    </BodyLayout>
  );
};

export default observer(Home);
