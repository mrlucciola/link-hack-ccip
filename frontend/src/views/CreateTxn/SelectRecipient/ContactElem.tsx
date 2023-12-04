import { FC, useState } from "react";
// state
import { useCreateTxnStore } from "../../../mobx/stores";
// style
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
// interfaces
import { Contact } from "../../../mobx/interfaces";
import { Address } from "../../../mobx/interfaces/address";
import { BlockchainId } from "../../../mobx/data/supportedBlockchains";
import { newRecipient } from "../interfaces";

// from https://mui.com/material-ui/react-avatar/
export const stringAvatar = (name: string) => {
  const splitName = name.toLocaleUpperCase().split(" ");
  const firstInit = splitName[0][0];
  const secondInit = splitName.length > 1 ? splitName[1][0] : "";

  return { children: `${firstInit}${secondInit}` };
};

const BlockchainElemGroup: FC<{ addrs: Address[] }> = ({ addrs }) => {
  // build blockchain arr
  const bcIdSet = new Set(addrs.map((a) => a.blockchainId));
  const blockchainIds: BlockchainId[] = Array.from(bcIdSet);

  const blockchainElems = blockchainIds.map((bc, idx) => {
    return (
      <Avatar
        sx={{ width: 25, height: 25, fontSize: "8pt" }}
        key={`${bc}${idx}`}
        // src={getBlockchainInfo(bc).img.sm}
        // @todo add tooltip to show label
      >
        {bc}
      </Avatar>
    );
  });

  return (
    <ListItemSecondaryAction>
      <AvatarGroup spacing={10} max={4}>
        {blockchainElems}
      </AvatarGroup>
    </ListItemSecondaryAction>
  );
};

/**
 * Activates when user clicks on a contact with more than one address.
 *
 * Load list of addresses with their aliases - each addr is a clickable menuitem
 */
const MultiAddrModal: FC<{
  isOpen: boolean;
  handleClose: () => void;
  contactInfo: Contact;
}> = ({ isOpen, handleClose, contactInfo }) => {
  const setRecipient = useCreateTxnStore((s) => s.setRecipient);

  // @todo
  // build list of addrs
  const addrElems = contactInfo.addresses.map((addr) => (
    <ListItemButton
      onClick={() => {
        setRecipient(newRecipient(contactInfo, addr));
        handleClose();
      }}
      key={addr.lookupId}
    >
      <ListItemText primary={addr.value} secondary={addr.label} />
      <ListItemSecondaryAction>
        <Avatar src={addr.blockchainInfo.img?.sm}>
          <Typography>{addr.blockchainInfo.id.toLocaleUpperCase()}</Typography>
        </Avatar>
      </ListItemSecondaryAction>
    </ListItemButton>
  ));

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box
        sx={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 3,
          maxHeight: "60%",
          width: "90%",
        }}
        flexWrap="nowrap"
        overflow="scroll"
        component={List}
      >
        {addrElems}
      </Box>
    </Modal>
  );
};

/** ### Display: Contact info
 *
 * @todo if click on contact w/ mult addr, open modal/drawer to show the list of addrs
 */
const ContactElem: FC<{ contactInfo: Contact }> = ({ contactInfo }) => {
  const setRecipient = useCreateTxnStore((s) => s.setRecipient);
  const [isOpen, setIsOpen] = useState(false);
  // format address text
  const addrs = contactInfo.addresses;
  const isMultAddr = addrs.length > 1;
  const addrOrAddrAmt = isMultAddr
    ? `${addrs.length} addresses`
    : addrs[0].value;
  // modal event handlers
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <ListItemButton
        onClick={() => {
          if (isMultAddr) {
            handleOpen();
          } else {
            setRecipient(newRecipient(contactInfo, addrs[0]));
          }
        }}
      >
        <ListItemAvatar>
          <Avatar {...stringAvatar(contactInfo.fullName)} />
        </ListItemAvatar>

        <ListItemText
          primary={contactInfo.fullName}
          secondary={addrOrAddrAmt}
        />

        <BlockchainElemGroup addrs={addrs} />
      </ListItemButton>

      <MultiAddrModal
        isOpen={isOpen}
        handleClose={handleClose}
        contactInfo={contactInfo}
      />
    </>
  );
};

export default ContactElem;
