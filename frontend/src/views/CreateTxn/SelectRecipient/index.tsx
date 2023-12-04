import { FC, useState } from "react";
// state
import { observer } from "mobx-react-lite";
import { useCreateTxnStore } from "../../../mobx/stores";
// style
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
// components
import BodyLayout from "../../../layouts/BodyLayout";
import SendAmtField from "./SendAmtField";
import SendAddressField from "./SendAddressField";
import ContactSelector from "./ContactSelector";
import Typography from "@mui/material/Typography";
// data @todo move to state DataStore
import {
  BlockchainId,
  supportedBlockchains,
} from "../../../mobx/data/supportedBlockchains";

/** ### Validate address
 * @todo use ethers
 * @todo move to state
 */
const validateAddr = (_addr: string) => {
  return true;
};
/** ### Validate blockchain
 * @todo use ethers
 * @todo move to state
 */
const validateBlockchain = (bc: BlockchainId) => {
  return Object.keys(supportedBlockchains).includes(bc);
};

const ContinueButton: FC<{ isContactsOpen: boolean }> = observer(
  ({ isContactsOpen }) => {
    const sendAddr = useCreateTxnStore((s) => s.sendAddr);
    const sendBlockchain = useCreateTxnStore((s) => s.sendBlockchain);
    const sendAmt = useCreateTxnStore((s) => s.totalSendAmt);
    const setCurrentView = useCreateTxnStore((s) => s.setCurrentView);

    const isValidForm =
      sendAmt > 0 &&
      validateAddr(sendAddr) &&
      validateBlockchain(sendBlockchain);

    // event handler
    const handleAdvanceView = () => setCurrentView("selectSrc");

    return (
      <Collapse
        in={!isContactsOpen}
        timeout={{ enter: 250, exit: 250 }}
        sx={{ px: 1 }}
      >
        <Button
          variant="contained"
          component="div"
          sx={{ flexDirection: "column", textTransform: "none" }}
          disabled={!isValidForm}
          onClick={handleAdvanceView}
          fullWidth
        >
          <Typography variant="body1" fontWeight={600}>
            Confirm
          </Typography>
          <Typography variant="caption">
            (Continue to send-account selection)
          </Typography>
        </Button>
      </Collapse>
    );
  }
);

/** ### Display: Recipient selector
 */
const SelectRecipient: FC = () => {
  const [isContactsOpen, setIsContactsOpen] = useState(false);

  return (
    <BodyLayout justifyContent="flex-start" overflow="scroll">
      <Collapse in={!isContactsOpen} timeout={{ enter: 250, exit: 250 }}>
        <SendAmtField />
        <SendAddressField />
      </Collapse>

      <ContactSelector
        isContactsOpen={isContactsOpen}
        setIsContactsOpen={setIsContactsOpen}
      />

      <ContinueButton isContactsOpen={isContactsOpen} />
    </BodyLayout>
  );
};

export default SelectRecipient;
