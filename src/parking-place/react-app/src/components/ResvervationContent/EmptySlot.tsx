import React from "react";
import { UseStyles } from "../../hooks/useStyles";
import { EmptySlotStyles } from "./stlyes";
import { Box } from "@mui/material";

type EmptySlotProps = {
  id: number;
};

function EmptySlot({ id }: EmptySlotProps) {
  const styles = UseStyles(EmptySlotStyles);
  return <Box sx={styles.root}>0{id}</Box>;
}

export default EmptySlot;
