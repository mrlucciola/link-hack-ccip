import { FC } from "react";
// mui
import { Grid } from "@mui/material";
// components
import TopNav from "./TopNav";
import Body from "./Body";
import BottomNav from "./BottomNav";

const Base: FC = () => {
  return (
    <Grid
      item
      container
      flexDirection="column"
      justifyContent="space-between"
      minWidth="100%"
      maxWidth="100%"
      width="100%"
      minHeight="100%"
      maxHeight="100%"
      height="100%"
      border={"1px solid green"}
    >
      <TopNav />
      <Body />
      <BottomNav />
    </Grid>
  );
};

export default Base;
