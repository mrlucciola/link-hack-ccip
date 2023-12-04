import { FC } from "react";
// state
import { observer } from "mobx-react-lite";
import { useCreateTxnStore } from "../../../../mobx/stores";
// style
import Button from "@mui/material/Button";
// components

const ConfirmSubmitButton: FC = () => {
  const areAllFormsValid = useCreateTxnStore((s) => s.areAllFormsValid);

  return (
    <Button disabled={areAllFormsValid} variant="contained">
      Confirm and submit
    </Button>
  );
};

export default observer(ConfirmSubmitButton);
