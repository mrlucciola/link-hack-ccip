import { FC } from "react";
// state
import { observer } from "mobx-react-lite";
import { TextField } from "@mui/material";

const ContactSearch: FC = () => {
  return <TextField label="Search for contact" />;
};

export default observer(ContactSearch);
