import React from "react";
import { UseStyles } from "../../hooks/useStyles";
import { ConfirmButton } from "./stlyes";
import { Box } from "@mui/material";

const Confirm = (props: any) => {
  const styles = UseStyles(ConfirmButton);
  console.log('to be confirmed:', props.selectedSlot, props.selectedDate);
  return <Box sx={styles.root}>Confirm</Box>;
};

export default Confirm;
