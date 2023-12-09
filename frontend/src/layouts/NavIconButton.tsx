import { FC } from "react";
// style
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";

const NavIconButton: FC<IconButtonProps & { isEmpty?: boolean }> = ({
  isEmpty,
  children,
  ...props
}) => {
  const { sx: sxProps, ...componentProps } = props;

  return (
    <IconButton
      disabled={isEmpty}
      sx={{
        borderRadius: 1,
        px: 0.33,
        mx: 0.2,
        alignSelf: "start",
        "&:hover": { backgroundColor: "transparent" },
        ...sxProps,
      }}
      {...componentProps}
    >
      {isEmpty ? <Icon /> : children}
    </IconButton>
  );
};

export default NavIconButton;
