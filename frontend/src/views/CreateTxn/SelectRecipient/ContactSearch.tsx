import { FC } from "react";
// state
import { observer } from "mobx-react-lite";
import { TextField } from "@mui/material";

const ContactSearch: FC = () => {
  return <TextField size="small" label="Search for contact" fullWidth />;
};

export default observer(ContactSearch);
