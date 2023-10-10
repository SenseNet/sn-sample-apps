import React from "react";
import { UseStyles } from "../../hooks/useStyles";
import { EmptySlotStyles } from "./stlyes";
import { Box } from "@mui/material";

type EmptySlotProps = {
  id: number;
  displayName: string;
};

function EmptySlot({ id, displayName }: EmptySlotProps) {
  const styles = UseStyles(EmptySlotStyles);
  return <Box sx={styles.root}>{displayName}</Box>;
}

export default EmptySlot;
