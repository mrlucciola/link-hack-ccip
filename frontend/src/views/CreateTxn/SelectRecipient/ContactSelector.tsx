import { FC } from "react";
// style
import Grid from "@mui/material/Unstable_Grid2/Grid2";
// components
import ContactSearch from "./ContactSearch";
import ContactList from "./ContactList";

/**
 *
 * @todo if click on contact w/ one addr, add to state and proceed
 * @todo if click on contact w/ mult addr, open modal/drawer to show the list of addrs
 */
const ContactSelector: FC = () => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      overflow="scroll"
      flexWrap="nowrap"
    >
      <ContactSearch />
      <ContactList />
    </Grid>
  );
};

export default ContactSelector;
