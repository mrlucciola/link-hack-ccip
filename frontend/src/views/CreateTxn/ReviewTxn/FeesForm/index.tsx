import { FC, useState } from "react";
// state
import { observer } from "mobx-react-lite";
import { useCreateTxnStore } from "../../../../mobx/stores";
// style
import ListItem from "@mui/material/ListItem";
// components
import { CollapseList, CollapseSubheader } from "..";

const FeesItems: FC<{ isOpen: boolean }> = observer(({ isOpen }) => {
  const sendAmt = useCreateTxnStore((s) => s.totalSendAmtFmt);
  const sendAddr = useCreateTxnStore((s) => s.sendAddr);
  const sendBlockchain = useCreateTxnStore((s) => s.sendBlockchain);

  return (
    <CollapseList isOpen={isOpen}>
      <ListItem component="div">{sendBlockchain}</ListItem>
      <ListItem component="div">{sendAddr}</ListItem>
      <ListItem component="div">label</ListItem>
      <ListItem component="div">{sendAmt}</ListItem>
    </CollapseList>
  );
});

const FeesForm: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li key={`fees-dropdown`}>
      <CollapseSubheader isOpen={isOpen} setIsOpen={setIsOpen} title="Fees" />
      <FeesItems isOpen={isOpen} />
    </li>
  );
};

export default observer(FeesForm);
