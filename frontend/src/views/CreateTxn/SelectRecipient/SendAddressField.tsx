import { FC, useState } from "react";
// state
import { observer } from "mobx-react-lite";
import { useCreateTxnStore } from "../../../mobx/stores";
// style
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { SelectChangeEvent } from "@mui/material/Select";
import {
  BlockchainId,
  supportedBlockchains,
} from "../../../mobx/data/supportedBlockchains";

/**
 * @todo add blockchain address lookup validation
 */
const SendAddressField: FC = () => {
  const setSendAddr = useCreateTxnStore((s) => s.setSendAddr);
  const setSendBlockchain = useCreateTxnStore((s) => s.setSendBlockchain);
  // @todo add validation
  const placeholderIsError = false;
  const [inputText, setInputText] = useState("");
  const [bcSelect, setBcSelect] = useState<BlockchainId>("eth");
  // add data to root state
  const bcElems = Object.values(supportedBlockchains).map((bc, idx) => {
    return (
      <MenuItem value={bc.id} key={`${bc.id}${idx}`}>
        {bc.id.toLocaleUpperCase()}
      </MenuItem>
    );
  });
  // event handlers
  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputText(e.target.value);
    setSendAddr(e.target.value);
  };
  const handleBlockchainChange = (e: SelectChangeEvent) => {
    setBcSelect(e.target.value as BlockchainId);
    setSendBlockchain(e.target.value as BlockchainId);
  };

  return (
    <Grid container flexDirection="row" flex={1} px={1} mt={1} wrap="nowrap">
      <TextField
        size="small"
        margin="none"
        label="Enter address"
        variant="outlined"
        autoFocus
        sx={{ flex: 1 }}
        // input
        value={inputText}
        onChange={handleTextChange}
        // validation
        error={placeholderIsError}
        helperText=""
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <Select
        size="small"
        margin="none"
        value={bcSelect}
        onChange={handleBlockchainChange}
        // label="Blockchain"
      >
        {bcElems}
      </Select>
    </Grid>
  );
};

export default observer(SendAddressField);
