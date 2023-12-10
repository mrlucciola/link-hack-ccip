import { FC, useEffect } from "react";
// state
import { observer } from "mobx-react-lite";
import { useUserStore, useViewStore } from "./mobx/stores";
// components
import Base from "./views/Base";
import Onboarding from "./views/Onboarding";

import { seedAddrs, seedRootWallets } from "./mobx/data/seed/seedUser";

const App: FC = () => {
  const currentRootView = useViewStore((s) => s.currentRootView);

  /** @deprecated @todo @delete - used for seed */
  const setAddresses = useUserStore((s) => s.setAddresses);
  /** @deprecated @todo @delete - used for seed */
  const setRootWallets = useUserStore((s) => s.setRootWallets);

  // @todo @delete - used for seed
  useEffect(() => {
    // @todo seed wallet
    setRootWallets(seedRootWallets);
    // @todo seed addresses
    setAddresses(seedAddrs);
  }, []);

  switch (currentRootView) {
    case "base":
      return <Base />;
    case "onboarding":
      return <Onboarding />;

    default:
      return <Base />;
  }
};

export default observer(App);
