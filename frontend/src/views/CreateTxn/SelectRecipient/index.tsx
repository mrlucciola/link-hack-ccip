import { FC, useState } from "react";
// style
import Collapse from "@mui/material/Collapse";
// components
import BodyLayout from "../../../layouts/BodyLayout";
import SendAmtField from "./SendAmtField";
import SendAddressField from "./SendAddressField";
import ContactSelector from "./ContactSelector";

/** ### Display: Recipient selector
 * - @todo Enter send amt
 */
const SelectRecipient: FC = () => {
  const [isContactsOpen, setIsContactsOpen] = useState(false);
  return (
    <BodyLayout justifyContent="flex-start" flex={1} overflow="scroll">
      <Collapse in={!isContactsOpen} timeout={{ enter: 250, exit: 250 }}>
        <SendAmtField />
        <SendAddressField />
      </Collapse>

      <ContactSelector
        isContactsOpen={isContactsOpen}
        setIsContactsOpen={setIsContactsOpen}
      />
    </BodyLayout>
  );
};

export default SelectRecipient;
