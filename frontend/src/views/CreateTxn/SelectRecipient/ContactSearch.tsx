import { FC } from "react";
// state
import { observer } from "mobx-react-lite";
// style
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const BackButton: FC<{
  isContactsOpen: boolean;
  setIsContactsOpen: (input: boolean) => void;
}> = ({ isContactsOpen, setIsContactsOpen }) => {
  return (
    <Collapse
      in={isContactsOpen}
      timeout={{ enter: 250, exit: 250 }}
      orientation="horizontal"
    >
      <IconButton
        sx={{ borderRadius: 1 }}
        onClick={() => setIsContactsOpen(false)}
      >
        <ArrowBackIosIcon />
      </IconButton>
    </Collapse>
  );
};

const ContactSearch: FC<{
  isContactsOpen: boolean;
  setIsContactsOpen: (input: boolean) => void;
}> = ({ isContactsOpen, setIsContactsOpen }) => {
  const handleFocus = () => setIsContactsOpen(true);

  return (
    <Grid container flexDirection="row" wrap="nowrap" p={1} flex={1}>
      <BackButton
        isContactsOpen={isContactsOpen}
        setIsContactsOpen={setIsContactsOpen}
      />
      <TextField
        size="small"
        label="Search contacts"
        fullWidth
        onFocus={handleFocus}
        autoComplete="off"
      />
    </Grid>
  );
};

export default observer(ContactSearch);
