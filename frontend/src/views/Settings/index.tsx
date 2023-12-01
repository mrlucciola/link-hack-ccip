import { observer } from "mobx-react-lite";
import { FC } from "react";
import { useSettingsStore } from "../../mobx/stores";
import RootLayout from "../../layouts/RootLayout";

const SettingsNav: FC = observer(() => {
  const currentView = useSettingsStore((s) => s.currentView);

  return <nav>(settings nav) view: {currentView}</nav>;
});

const settingsViewMap: { [key: string]: JSX.Element } = {
  menu: <div>settings menu</div>, // <SettingsMenuView />
  // one prop for each settings option
  // each element in this object should be wrapped with <SettingsViewLayout></SettingsViewLayout>
};
const SettingsViewController: FC = observer(() => {
  const currentView = useSettingsStore((s) => s.currentView);

  // return settingsViewMap[currentView]
  
  // delete this (use the above commented-out line):
  return (
    <div>
      <div>SettingsViewController</div>
      <div>view: {currentView}</div>
      {settingsViewMap[currentView]}
    </div>
  );
});

/** ### Display component for Settings View
 */
const Settings: FC = () => {
  return (
    <RootLayout>
      <SettingsNav />
      <SettingsViewController />
    </RootLayout>
  );
};

export default Settings;
