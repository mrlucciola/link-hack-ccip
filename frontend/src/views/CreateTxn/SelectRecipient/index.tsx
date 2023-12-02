import { FC } from "react";
// components
import BodyLayout from "../../../layouts/BodyLayout";
import ContactSelector from "./ContactSelector";
import AddressField from "./AddressField";

/** ### Display: Recipient selector
 * - @todo Enter send amt
 */
const SelectRecipient: FC = () => {
  return (
    <BodyLayout justifyContent="space-between" overflow="scroll">
      <AddressField />
      <ContactSelector />
    </BodyLayout>
  );
};

export default SelectRecipient;
