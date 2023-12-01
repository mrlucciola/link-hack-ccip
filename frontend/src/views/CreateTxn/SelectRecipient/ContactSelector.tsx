import { FC } from "react";
// state
import { observer } from "mobx-react-lite";
// style
import Grid from "@mui/material/Unstable_Grid2/Grid2";
// components
import ContactSearch from "./ContactSearch";
import ContactList from "./ContactList";

const ContactSelector: FC = () => {
  return (
    <Grid direction="column">
      <ContactSearch />
      <ContactList />
    </Grid>
  );
};

export default observer(ContactSelector);
