import { UseStyles } from "../../hooks/useStyles";
import DatePicker from "./DatePicker";
import { ReservationStyles } from "./stlyes";
import { Box } from "@mui/material";
import ParkinkSlots from "./ParkingSlots";
import Confirm from "./Confirm";

function Reservations() {
  const styles = UseStyles(ReservationStyles);
  return (
    <Box sx={styles.content} className="content">
      <h1>Parking Slots</h1>
      <div className="reservation-container">
        <DatePicker />
        <ParkinkSlots />
      </div>
      <Confirm />
    </Box>
  );
}

export default Reservations;
