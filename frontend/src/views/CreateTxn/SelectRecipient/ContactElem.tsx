import { FC } from "react";
// state
import { useCreateTxnStore } from "../../../mobx/stores";
// style
import {
  Avatar,
  AvatarGroup,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
// interfaces
import { Address, Contact } from "../../../mobx/interfaces";
import { BlockchainId } from "../../../mobx/data/supportedBlockchains";

// from https://mui.com/material-ui/react-avatar/
function stringAvatar(name: string) {
  const splitName = name.toLocaleUpperCase().split(" ");
  const firstInit = splitName[0][0];
  const secondInit = splitName.length > 1 ? splitName[1][0] : "";

  return { children: `${firstInit}${secondInit}` };
}

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

/** ### Display: Contact info
 *
 * @todo if click on contact w/ mult addr, open modal/drawer to show the list of addrs
 */
const ContactElem: FC<{ contactInfo: Contact }> = ({ contactInfo }) => {
  const setRecipient = useCreateTxnStore((s) => s.setRecipient);
  const setCurrentView = useCreateTxnStore((s) => s.setCurrentView);
  // format address text
  const addrs = contactInfo.addresses;
  const isMultAddr = addrs.length > 1;
  const addrOrAddrAmt = isMultAddr
    ? addrs[0].value
    : `${addrs.length} addresses`;

  return (
    <ListItemButton
      onClick={() => {
        if (contactInfo.addresses.length === 1) {
          setRecipient(contactInfo);
        } else {
          // @todo open modal/drawer to show the list of addrs
        }
        // change view
        setCurrentView("selectSrc");
      }}
    >
      <ListItemAvatar>
        <Avatar {...stringAvatar(contactInfo.fullName)} />
      </ListItemAvatar>

      <ListItemText primary={contactInfo.fullName} secondary={addrOrAddrAmt} />

      <BlockchainElemGroup addrs={addrs} />
    </ListItemButton>
  );
};

export default ContactElem;
