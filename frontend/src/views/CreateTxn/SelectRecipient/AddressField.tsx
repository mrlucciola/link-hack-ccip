import { FC, useState } from "react";
// state
import { observer } from "mobx-react-lite";
// style
import {
  Divider,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";

const AddressField: FC = () => {
  // @todo add validation
  const placeholderIsError = false;
  // add data to root state
  const blockchainAbbreviationLookup: string[] = ["eth", "op"];
  const bcElems = blockchainAbbreviationLookup.map((bc, idx) => {
    return (
      <MenuItem value={bc} key={`${bc}${idx}`}>
        {bc}
      </MenuItem>
    );
  });
  const [bcSelect, setBcSelect] = useState("");
  // event handler
  const handleChange = (e: SelectChangeEvent) => setBcSelect(e.target.value);

  return (
    <Paper
      component="form"
      sx={{ p: "0 4px", display: "flex", alignItems: "center" }}
    >
      <TextField
        size="small"
        margin="none"
        label="Manually enter address"
        variant="standard"
        autoFocus
        InputProps={{ disableUnderline: true }}
        sx={{ flex: 1 }}
        helperText=""
        error={placeholderIsError}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <Select
        size="small"
        margin="none"
        variant="standard"
        disableUnderline
        sx={{ minWidth: "50px" }}
        value={bcSelect}
        onChange={handleChange}
        label="Blockchain"
        placeholder="eth"
      >
        {bcElems}
      </Select>
    </Paper>
  );
};

export default observer(AddressField);