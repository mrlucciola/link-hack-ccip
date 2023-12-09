import { FC, useEffect } from "react";
// state
import { observer } from "mobx-react-lite";
import { useBaseStore, useCreateTxnStore } from "../../../mobx/stores";
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
  TestnetId,
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
const validateBlockchain = (bc: TestnetId) => {
  return Object.keys(supportedBlockchains).includes(bc);
};

const ContinueButton: FC = observer(() => {
  const isContactsOpen = useCreateTxnStore((s) => s.isContactsOpen);
  const sendAddr = useCreateTxnStore((s) => s.sendAddr);
  const sendBlockchain = useCreateTxnStore((s) => s.sendBlockchain);
  const sendAmt = useCreateTxnStore((s) => s.totalSendAmt);
  const setCurrentView = useCreateTxnStore((s) => s.setCurrentView);

  const isValidForm =
    sendAmt > 0 && validateAddr(sendAddr) && validateBlockchain(sendBlockchain);

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
});

/** ### Display: Recipient selector
 */
const SelectRecipient: FC = () => {
  const isContactsOpen = useCreateTxnStore((s) => s.isContactsOpen);
  const setNavBack = useBaseStore((s) => s.setNavBack);
  const setNavTitle = useBaseStore((s) => s.setNavTitle);

  useEffect(() => {
    setNavBack(undefined);
    setNavTitle("Select recipient");
  }, []);

  return (
    <BodyLayout justifyContent="start">
      <Collapse in={!isContactsOpen} timeout={{ enter: 250, exit: 250 }}>
        <SendAmtField />
        <SendAddressField />
      </Collapse>

      {/* <ContactSelector /> */}

      {/* <ContinueButton /> */}
    </BodyLayout>
  );
};

export default observer(SelectRecipient);
