import { FC } from "react";
// state
import { observer } from "mobx-react-lite";
// style
import {
  Avatar,
  AvatarGroup,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";

export class Contact {
  constructor(public fullName: string) {}
}

// from https://mui.com/material-ui/react-avatar/
function stringAvatar(name: string) {
  return {
    sx: {}, // bgcolor: "whitesmoke",
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

const ContactElem: FC<{ contactInfo: Contact }> = ({ contactInfo }) => {
  // "0x3as7dfi91us4hdf" OR "4 addresses"
  // @todo if addrs.len === 1 > addrs[0].value
  const addrOrAddrAmt = "";
  // @todo iter thru each addr: new Set().add(addr.blockchainId)
  const addrBlockchains: string[] = []; //[...bcSet]
  const blockchainElems = addrBlockchains.map((bc) => {
    return <Avatar alt={bc} /*alt={getBcLabel(bc)} src={lookupBcImg(bc)}*/ />;
  });

  return (
    <ListItem
      secondaryAction={<AvatarGroup max={4}>{blockchainElems}</AvatarGroup>}
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

const ContactList: FC = () => {
  // @todo use state
  const contacts: Map<string, Contact> = new Map<string, Contact>();

  // build
  const contactElems: JSX.Element[] = [];
  contacts.forEach((c, idx) => {
    return <ContactElem contactInfo={c} key={idx} />;
  });

  return <List>{contactElems}</List>;
};

export default observer(ContactList);
