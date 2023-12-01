import { FC } from "react";
// state
import { observer } from "mobx-react-lite";
// components
import BodyLayout from "../../../layouts/BodyLayout";

const SelectRecipient: FC = () => {
  return <BodyLayout sx={{ background: "red" }}></BodyLayout>;
};

export default observer(SelectRecipient);
