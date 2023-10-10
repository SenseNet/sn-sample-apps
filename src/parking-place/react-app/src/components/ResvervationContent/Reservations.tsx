import { UseStyles } from "../../hooks/useStyles";
import DatePicker from "./DatePicker";
import { ReservationStyles } from "./stlyes";
import { Box } from "@mui/material";
import ParkinkSlots from "./ParkingSlots";
import Confirm from "./Confirm";
import { useState } from "react";
import dayjs from "dayjs";

function Reservations() {
  const styles = UseStyles(ReservationStyles);

  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(
    dayjs(new Date())
  );

  return (
    <Box sx={styles.content} className="content">
      <h1>Parking Slots</h1>
      <div className="reservation-container">
        <DatePicker
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <ParkinkSlots selectedDate={selectedDate} />
      </div>
      <Confirm />
    </Box>
  );
}

export default Reservations;
