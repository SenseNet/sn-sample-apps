import { UseStyles } from "../../hooks/useStyles";
import DatePicker from "./DatePicker";
import { ReservationStyles } from "./stlyes";
import { Box } from "@mui/material";
import ParkingSlots from "./ParkingSlots";
import Confirm from "./Confirm";
import { SetStateAction, useState } from "react";
import dayjs from "dayjs";
import { useOidcAuthentication } from "@sensenet/authentication-oidc-react";

function Reservations() {
  const styles = UseStyles(ReservationStyles);
  const { oidcUser } = useOidcAuthentication();
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(
    dayjs(new Date())
  );

  const reserveButton = oidcUser && <Confirm selectedSlot={selectedSlot} />;

  return (
    <Box sx={styles.content} className="content">
      <h1>Parking Slots</h1>
      <div className="reservation-container">
        <DatePicker
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <ParkingSlots setSelectedSlot={setSelectedSlot} selectedDate={selectedDate} />
      </div>
      {reserveButton}
    </Box>
  );
}

export default Reservations;
