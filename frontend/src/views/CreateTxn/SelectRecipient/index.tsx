import { FC } from "react";
// components
import BodyLayout from "../../../layouts/BodyLayout";
import SendAmtField from "./SendAmtField";
import AddressField from "./AddressField";
import ContactSelector from "./ContactSelector";

/** ### Display: Recipient selector
 * - @todo Enter send amt
 */
const SelectRecipient: FC = () => {
  return (
    <BodyLayout justifyContent="space-between" flex={1} overflow="scroll">
      <SendAmtField />
      <AddressField />
      <ContactSelector />
    </BodyLayout>
  );
};

export default SelectRecipient;
