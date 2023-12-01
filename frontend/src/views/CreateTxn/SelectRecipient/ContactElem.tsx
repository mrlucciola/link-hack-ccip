import { FC } from "react";
// style
import {
  Avatar,
  AvatarGroup,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
// interfaces
import { Contact } from "../../../mobx/interfaces";
import { BlockchainId } from "../../../mobx/data/supportedBlockchains";

// from https://mui.com/material-ui/react-avatar/
function stringAvatar(name: string) {
  const splitName = name.toLocaleUpperCase().split(" ");
  const firstInit = splitName[0][0];
  const secondInit = splitName.length > 1 ? splitName[1][0] : "";

  return { children: `${firstInit}${secondInit}` };
}

const ContactElem: FC<{ contactInfo: Contact }> = ({ contactInfo }) => {
  const addrs = contactInfo.addresses;
  const addrOrAddrAmt =
    addrs.length === 1 ? addrs[0].value : `${addrs.length} addresses`;
  const bcSet = new Set(addrs.map((a) => a.blockchainId));
  const bcsFromAddr: BlockchainId[] = Array.from(bcSet);
  const blockchainElems = bcsFromAddr.map((bc, idx) => {
    return (
      <Avatar
        sx={{ width: 25, height: 25, fontSize: "8pt" }}
        key={`${bc}${idx}`}
        // src={getBlockchainImg(bc)}
        // @todo add tooltip to show label
      >
        {bc}
      </Avatar>
    );
  });

  return (
    <ListItem
      secondaryAction={
        <AvatarGroup spacing={10} max={4}>
          {blockchainElems}
        </AvatarGroup>
      }
    >
      <ListItemButton>
        <ListItemAvatar>
          <Avatar {...stringAvatar(contactInfo.fullName)} />
          <ListItemText
            primary={contactInfo.fullName}
            secondary={addrOrAddrAmt}
          />
        </ListItemAvatar>
      </ListItemButton>
    </ListItem>
  );
};

export default ContactElem;
