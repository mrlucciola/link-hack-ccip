import { FC, useState } from "react";
// state
import { observer } from "mobx-react-lite";
import { useCreateTxnStore, useUserStore } from "../../../../mobx/stores";
// style
import ListItem from "@mui/material/ListItem";
// components
import { CollapseList, CollapseSubheader } from "..";

const OverviewItems: FC<{ isOpen: boolean }> = observer(({ isOpen }) => {
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

/** ### Recipient overview
 * - Blockchain
 * - Address
 * - Label (if in contacts)
 * - Amount to send (in usdc)
 */
const RecipientOverview: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sendAddr = useCreateTxnStore((s) => s.sendAddr);
  const contacts = useUserStore((s) => s.contacts);
  const contactLabel = contacts.get(sendAddr);
  console.log("label:", contactLabel);

  return (
    <li key={`recipients-dropdown`}>
      <CollapseSubheader
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Recipient"
      />
      <OverviewItems isOpen={isOpen} />
    </li>
  );
};

export default observer(RecipientOverview);
