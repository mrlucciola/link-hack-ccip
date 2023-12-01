import { FC } from "react";
// components
import BodyLayout from "../../../layouts/BodyLayout";

/** ### Display: Select Sources
 */
const SelectSrc: FC = () => {
  return (
    <BodyLayout justifyContent="space-between" overflow="scroll">
      <AddressField />
      <ContactSelector />
    </BodyLayout>
  );
};

export default SelectSrc;
