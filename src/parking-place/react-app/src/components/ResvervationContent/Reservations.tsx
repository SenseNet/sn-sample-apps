import { UseStyles } from "../../hooks/useStyles";
import DatePicker from "./DatePicker";
import { ReservationStyles } from "./stlyes";
import { Box } from "@mui/material";
import ParkinkSlots from "./ParkingSlots";
import Confirm from "./Confirm";
import { useState } from "react";
import dayjs from "dayjs";
import { useOidcAuthentication } from "@sensenet/authentication-oidc-react";

function Reservations() {
  const styles = UseStyles(ReservationStyles);
  const { oidcUser } = useOidcAuthentication();

  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(
    dayjs(new Date())
  );

  const reserveButton = oidcUser && <Confirm />;

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
      {reserveButton}
    </Box>
  );
}

export default Reservations;
