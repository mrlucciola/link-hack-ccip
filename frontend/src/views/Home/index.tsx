import { FC } from "react";
// state
import { observer } from "mobx-react-lite";
import { useHomeStore } from "../../mobx/stores";
// components
import BodyLayout from "../../layouts/BodyLayout";

/** ### Layout component for Home view
 *
 * Home view renders within the `Base` view.
 */
const HomeView: FC = () => {
  const currentView = useHomeStore((s) => s);
  console.log(currentView);

  return <BodyLayout></BodyLayout>;
};

export default observer(HomeView);
