import { FC } from "react";
// state
import { observer } from "mobx-react-lite";
// components
import BodyLayout from "../../../layouts/BodyLayout";
import ContactSelector from "./ContactSelector";
import AddressField from "./AddressField";

/** ### Display: Recipient selector
 */
const SelectRecipient: FC = () => {
  return (
    <BodyLayout justifyContent="space-between" overflow="scroll">
      <AddressField />
      <ContactSelector />
    </BodyLayout>
  );
};

export default observer(SelectRecipient);
