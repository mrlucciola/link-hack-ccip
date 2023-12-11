import { FC, useState } from "react";
// state
import { observer } from "mobx-react-lite";
import { useUserStore } from "../../../mobx/stores";
// style
import Grid from "@mui/material/Unstable_Grid2/Grid2";
// import Button from "@mui/material/Button";
// components
import {
  CollapseList,
  CollapseSubheader,
} from "../../CreateTxn/ReviewTxn/utils/components";
import AddrElem from "./AddrElem";

/** ### Collapsible view for a user's addresses, grouped by wallet
 */
const UserAddresses: FC = () => {
  const [isOpen, setIsOpen] = useState(true); // @todo default: false
  const addresses = useUserStore((s) => s.addresses);
  // const addNewAddress = useUserStore((s) => s.addNewAddress);

  // event handlers
  // const onClickCreateNewAddress = (_: any) => {
  //   // addNewAddress()
  // };

  // Build wallet elems
  // const walletElems: JSX.Element[] = [];
  // addresses.forEach((a) => {
  //   walletElems.push(<AddrElem addr={a} key={`addr-${a.lookupId}`} />);
  // });
  // Build address elems
  const addrElems: JSX.Element[] = [];
  addresses.forEach((a) => {
    addrElems.push(<AddrElem addr={a} key={`addr-${a.lookupId}`} />);
  });

  return (
    <li key={`user-addrs-dropdown`}>
      <CollapseSubheader
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={`Addresses`}
      />
      <CollapseList isOpen={isOpen}>
        <Grid container direction="row" wrap="nowrap" flex={1}>
          {/* <Button
            variant="contained"
            onClick={onClickCreateNewAddress}
            sx={{ px: 1, textTransform: "none", flex: 1 }}
          >
            Create new address
          </Button> */}
        </Grid>
        {addrElems}
      </CollapseList>
    </li>
  );
};

export default observer(UserAddresses);
