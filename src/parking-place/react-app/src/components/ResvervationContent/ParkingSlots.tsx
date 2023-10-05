import React from "react";
import { Box } from "@mui/material";
import { UseStyles } from "../../hooks/useStyles";
import { ParkingSlotsStyles } from "./stlyes";
import EmptySlot from "./EmptySlot";
import ReservedCard from "./ReservedCard";

const ParkingSlotsData: Array<{ id: number; reserved: boolean }> = [
  {
    id: 1,
    reserved: false,
  },
  {
    id: 2,
    reserved: false,
  },
  {
    id: 3,
    reserved: false,
  },
  {
    id: 4,
    reserved: true,
  },
  {
    id: 5,
    reserved: false,
  },
  {
    id: 6,
    reserved: false,
  },
  {
    id: 7,
    reserved: true,
  },
  {
    id: 8,
    reserved: true,
  },
];

function ParkingSlots() {
  const styles = UseStyles(ParkingSlotsStyles);

  return (
    <Box sx={styles.root}>
      {ParkingSlotsData.map((slot) => {
        return (
          <div key={slot.id} className="slot">
            {slot.reserved ? <ReservedCard /> : <EmptySlot id={slot.id} />}
          </div>
        );
      })}
    </Box>
  );
}

export default ParkingSlots;
