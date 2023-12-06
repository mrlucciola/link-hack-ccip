import { FC } from "react";
// state
import { observer } from "mobx-react-lite";
import { useUserStore } from "../../../mobx/stores";
// style
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import ContactElem from "./ContactElem";

const ContactList: FC = () => {
  const contacts = useUserStore((s) => s.contacts);

  // build
  const contactElems: JSX.Element[] = [];
  contacts.forEach((c, idx) => {
    contactElems.push(<ContactElem contactInfo={c} key={idx} />);
  });

  return (
    <Grid
      container
      flexWrap="nowrap"
      direction="column"
      justifyContent="flex-start"
      overflow="scroll"
      width="100%"
      maxWidth="100%"
      px={1}
      flex={1}
    >
      {contactElems}
    </Grid>
  );
};

export default observer(ContactList);
