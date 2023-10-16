import React from 'react';
import { Box } from '@mui/material';
import { UseStyles } from "../../hooks/useStyles";
import { ConfirmButton } from "./stlyes";
import { useRepository } from '@sensenet/hooks-react';
import { GenericContent } from '@sensenet/default-content-types'
import { useOidcAuthentication } from "@sensenet/authentication-oidc-react";

type ConfirmProps = {
  selectedSlot: any;
  selectedDate: any;
};

function Confirm(props: ConfirmProps) {
  const repository = useRepository();
  const { oidcUser } = useOidcAuthentication();
  const styles = UseStyles(ConfirmButton);
  
  
  interface ParkingPlaceBookingContent extends GenericContent {
    ParkingPlace: number;
    ParkingPlaceBookingStart: any;
    ParkingPlaceUser: any;
  }

  async function updateReservation(selectedSlot: any) {
    const response = await repository.post<ParkingPlaceBookingContent>({
      parentPath: "/Root/Content/sample/parkingplace/bookings",
      contentType: 'ParkingPlaceBooking',      
      content: {
        ParkingPlace: selectedSlot,
        ParkingPlaceBookingStart: props.selectedDate,
        // ParkingPlaceUser: ?
      },
    });
    console.log(response);
  }

  function handleConfirmation() {
    updateReservation(props.selectedSlot);
  }
  
  console.log('to be confirmed:', props.selectedSlot, props.selectedDate);

  if (!oidcUser) return null;
  console.log('user:', oidcUser);
    
  return (
    <Box sx={styles.root} onClick={handleConfirmation}>
      Confirm
    </Box>
  );
}

export default Confirm;
