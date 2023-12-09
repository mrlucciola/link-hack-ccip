import { FC } from "react";
// style
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Modal from "@mui/material/Modal";
import { BoxProps, ModalProps, SxProps, Theme } from "@mui/material";

const ListModal: FC<
  ModalProps & {
    boxStyle?: SxProps<Theme>;
    boxProps?: BoxProps;
  }
> = ({ boxStyle, boxProps, open, onClose, children, ...props }) => {
  return (
    <Modal {...props} open={open} onClose={onClose}>
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
          ...boxStyle,
        }}
        flexWrap="nowrap"
        overflow="hidden scroll"
        component={List}
        {...boxProps}
      >
        {children}
      </Box>
    </Modal>
  );
};

export default ListModal;
