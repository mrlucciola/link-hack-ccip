import { FC } from "react";
// style
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Collapse from "@mui/material/Collapse";
// components
import ContactSearch from "./ContactSearch";
import ContactList from "./ContactList";

/**
 *
 * @todo if click on contact w/ one addr, add to state and proceed
 * @todo if click on contact w/ mult addr, open modal/drawer to show the list of addrs
 */
const ContactSelector: FC<{
  isContactsOpen: boolean;
  setIsContactsOpen: (input: boolean) => void;
}> = ({ isContactsOpen, setIsContactsOpen }) => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      overflow="scroll"
      flexWrap="nowrap"
    >
      <ContactSearch
        isContactsOpen={isContactsOpen}
        setIsContactsOpen={setIsContactsOpen}
      />
      <Collapse
        unmountOnExit
        in={isContactsOpen}
        timeout={{ enter: 500, exit: 250 }}
      >
        <ContactList setIsContactsOpen={setIsContactsOpen} />
      </Collapse>
    </Grid>
  );
};

export default ContactSelector;
