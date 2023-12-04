import { FC } from "react";
// state
import { observer } from "mobx-react-lite";
// style
import List from "@mui/material/List";
// components
import BodyLayout from "../../../layouts/BodyLayout";
import RecipientOverview from "./RecipientOverview";
import SendAddrsOverview from "./SendAddrsOverview";
import FeesForm from "./FeesForm";
import ConfirmSubmitButton from "./ConfirmSubmitButton";

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
