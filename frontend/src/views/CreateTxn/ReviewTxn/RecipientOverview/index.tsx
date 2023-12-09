import { FC, useState } from "react";
// state
import { observer } from "mobx-react-lite";
import { useCreateTxnStore, useReviewTxnStore } from "../../../../mobx/stores";
// style
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import TextField from "@mui/material/TextField";
// components
import { CollapseList, CollapseSubheader } from "../utils/components";

const OverviewItems: FC<{ isOpen: boolean }> = observer(({ isOpen }) => {
  const sendAmt = useCreateTxnStore((s) => s.totalSendAmtFmt);
  const sendAddr = useCreateTxnStore((s) => s.sendAddr);
  const sendBlockchain = useCreateTxnStore((s) => s.sendBlockchain);

  return (
    <CollapseList isOpen={isOpen}>
      <ListItem component="div" ContainerComponent="div">
        <ListItemText
          primary={sendAddr}
          secondary={sendBlockchain.toLocaleUpperCase()}
        />

        <ListItemSecondaryAction sx={{ maxWidth: "60%" }}>
          <TextField
            variant="standard"
            InputProps={{ disableUnderline: true }}
            disabled
            fullWidth
            label="Amount to send"
            value={sendAmt}
            sx={{
              mt: 1,
              "& .MuiInputBase-input.Mui-disabled": {
                color: "black",
                WebkitTextFillColor: "black",
                textAlign: "end",
              },
              "& .MuiInputLabel-root.Mui-disabled": {
                color: "rgba(0, 0, 0, 0.6)",
                WebkitTextFillColor: "rgba(0, 0, 0, 0.6)",
                transformOrigin: "top right",
                left: "unset",
                right: 0,
              },
            }}
          />
        </ListItemSecondaryAction>
      </ListItem>
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
  const [isOpen, setIsOpen] = useState(false); // @todo revert to true
  const contact = useReviewTxnStore((s) => s.contact);

  return (
    <li key={`recipients-dropdown`}>
      <CollapseSubheader
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={`Recipient: ${contact.fullName}`}
      />
      <OverviewItems isOpen={isOpen} />
    </li>
  );
};

export default observer(RecipientOverview);
