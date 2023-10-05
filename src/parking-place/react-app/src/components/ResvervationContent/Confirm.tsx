import React from "react";
import { UseStyles } from "../../hooks/useStyles";
import { ConfirmButton } from "./stlyes";
import { Box } from "@mui/material";

const Confirm = () => {
  const styles = UseStyles(ConfirmButton);
  return <Box sx={styles.root}>Confirm</Box>;
};

export default Confirm;
