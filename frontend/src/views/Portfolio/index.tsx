import { FC, useEffect } from "react";
// state
import { observer } from "mobx-react-lite";
import { useBaseStore } from "../../mobx/stores";
// style
import List from "@mui/material/List";
// components
import BodyLayout from "../../layouts/BodyLayout";
import RootWallets from "./RootWallets";
import UserAddresses from "./UserAddresses";

/** ### Layout component for Portfolio view
 *
 * Portfolio view renders in the `Body` component, within the `Base` view.
 *
 * @todo add a switcher
 */
const Portfolio: FC = () => {
  // const setCurrentView = useBaseStore((s) => s.setCurrentView);
  const setNavBack = useBaseStore((s) => s.setNavBack);
  const setNavTitle = useBaseStore((s) => s.setNavTitle);
  const setNavUtils = useBaseStore((s) => s.setNavUtils);

  // Update base components
  useEffect(() => {
    setNavBack();
    setNavTitle("Portfolio");
    setNavUtils([{ id: "options", action: () => {} }]);

    // Cleanup - remove nav utils
    return () => setNavUtils([]);
  }, []);

  return (
    <BodyLayout overflow="hidden scroll">
      <List>
        <RootWallets />
        <UserAddresses />
      </List>
    </BodyLayout>
  );
};

export default observer(Portfolio);
