import React, { FC, useEffect } from "react";
// state
import { observer } from "mobx-react-lite";
// style
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
// components
import BodyLayout from "../../../layouts/BodyLayout";
import RecipientOverview from "./RecipientOverview";
import SendAddrsOverview from "./SendAddrsOverview";
import FeesForm from "./FeesForm";
import ConfirmSubmitButton from "./ConfirmSubmitButton";
import { useBaseStore, useCreateTxnStore } from "../../../mobx/stores";

export const CollapseSubheader: FC<{
  isOpen: boolean;
  setIsOpen: (input: boolean) => void;
  title: string;
}> = ({ isOpen, setIsOpen, title }) => {
  return (
    <ListSubheader sx={{ px: 0 }} component="div">
      <ListItemButton
        dense
        sx={{ py: 0, m: 0 }}
        selected={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <ListItemSecondaryAction sx={{ display: "flex" }}>
          {isOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemSecondaryAction>
      </ListItemButton>
    </ListSubheader>
  );
};

export const CollapseList: FC<{
  isOpen: boolean;
  children: React.ReactNode;
}> = ({ isOpen, children }) => {
  return (
    <Collapse in={isOpen} timeout={250} sx={{ flex: 1 }}>
      <List component="div" disablePadding>
        {children}
      </List>
    </Collapse>
  );
};

/** ### Display: Review Transaction
 *
 * - Recipient, blockchain and amount;
 * - Sender addresses used:
 *    - addr value, label, and tokens;
 * - (maybe) Summary;
 * - Fees:
 *    - Group by blockchain:
 *       - For each account: addr, dollar value
 *       - @todo (separate ticket) Hidden: gas amt, (adjustable) gas limit, (adjustable) gas price
 * - Button to confirm & submit transaction;
 *
 * #### Style
 * - Each section should have a css-sticky title
 */
const ReviewTxn: FC = () => {
  const setNavBack = useBaseStore((s) => s.setNavBack);
  const setNavTitle = useBaseStore((s) => s.setNavTitle);
  const setCurrentView = useCreateTxnStore((s) => s.setCurrentView);

  useEffect(() => {
    setNavBack({
      baseView: "createTxn",
      subView: "selectSrc",
      navTo: () => setCurrentView("selectSrc"),
    });
    setNavTitle("Review transaction")
  }, []);

  return (
    <BodyLayout overflow="scroll">
      <List>
        <RecipientOverview />
        <SendAddrsOverview />
        <FeesForm />
      </List>
      <ConfirmSubmitButton />
    </BodyLayout>
  );
};

export default observer(ReviewTxn);
