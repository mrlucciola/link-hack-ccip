import { FC } from "react";
// state
import { observer } from "mobx-react-lite";
import { useCreateTxnStore } from "../../../mobx/stores";
// style
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Collapse from "@mui/material/Collapse";
// components
import ContactSearch from "./ContactSearch";
import ContactList from "./ContactList";

/**
 * @todo if click on contact w/ one addr, add to state and proceed
 * @todo if click on contact w/ mult addr, open modal/drawer to show the list of addrs
 */
const ContactSelector: FC = () => {
  const isContactsOpen = useCreateTxnStore((s) => s.isContactsOpen);

  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      overflow="hidden"
      flexWrap="nowrap"
      flex={1}
    >
      <ContactSearch />
      <Collapse
        unmountOnExit
        in={isContactsOpen}
        timeout={{ enter: 500, exit: 250 }}
        sx={{ overflow: "hidden scroll" }}
      >
        <ContactList />
      </Collapse>
    </Grid>
  );
};

export default observer(ContactSelector);
