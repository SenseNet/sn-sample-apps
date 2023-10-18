import { UseStyles } from "../../hooks/useStyles";
import DatePicker from "./DatePicker";
import { ReservationStyles } from "./stlyes";
import { Box } from "@mui/material";
import ParkingSlots from "./ParkingSlots";
import Confirm from "./Confirm";
import { useState } from "react";
import dayjs from "dayjs";
import { useOidcAuthentication } from "@sensenet/authentication-oidc-react";

function Reservations() {
  const styles = UseStyles(ReservationStyles);
  const { oidcUser } = useOidcAuthentication();
  const [selectedAction, setSelectedAction] = useState("reserve");  
  const [selectedSlot, setSelectedSlot] = useState(0);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(
    dayjs(new Date())
  );

  return (
    <Box sx={styles.content} className="content">
      <h1>Parking Slots</h1>
      {(oidcUser && (
        <>
          <div className="reservation-container">
            <DatePicker
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
            <ParkingSlots selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} selectedDate={selectedDate} setSelectedAction={setSelectedAction} />
          </div>
          <Confirm selectedSlot={selectedSlot} resetSelectedSlot={setSelectedSlot} selectedDate={selectedDate} selectedAction={selectedAction} />
        </>
      )) || (
        <div className="welcome-message">
          <div>Sign in to reserve your parking spot effortlessly.</div>
          <div>Enjoy the convenience of secure parking with just a click!</div>
        </div>
      )}
    </Box>
  )
}

export default Reservations;
