import React from "react";
import { UseStyles } from "../../hooks/useStyles";
import { ReservedCardSlotStyle } from "./stlyes";
import { Box } from "@mui/material";

function ReservedCard() {
  const styles = UseStyles(ReservedCardSlotStyle);
  return (
    <Box sx={styles.root}>
      <img
        src="/images/car.svg"
        loading="lazy"
        alt="car"
        height={50}
        width={110}
      />
    </Box>
  );
}

export default ReservedCard;
