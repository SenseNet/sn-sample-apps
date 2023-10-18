import React from 'react';
import { Box } from '@mui/material';
import { UseStyles } from "../../hooks/useStyles";
import { ConfirmButton } from "./stlyes";
import { useRepository } from '@sensenet/hooks-react';
import { GenericContent } from '@sensenet/default-content-types'

type ConfirmProps = {
  selectedSlot: any;
  resetSelectedSlot: (slot: any) => void;
  selectedAction: string;
  selectedDate: any;
  currentUserId: number | undefined;
};

function Confirm(props: ConfirmProps) {
  const repository = useRepository();
  const styles = UseStyles(ConfirmButton);
    
  interface ParkingPlaceBookingContent extends GenericContent {
    ParkingPlace: number;
    ParkingPlaceBookingStart: any;
    ParkingPlaceUser: number;
  }

  async function updateReservation(selectedSlot: number, resetSelectedSlot: any, selectedAction: string, currentUserId: number = 0) {
    switch (selectedAction) {
      case "Reserve": {
        await repository.post<ParkingPlaceBookingContent>({
          parentPath: "/Root/Content/sample/parkingplace/bookings",
          contentType: 'ParkingPlaceBooking',      
          content: {
            ParkingPlace: selectedSlot,
            ParkingPlaceBookingStart: props.selectedDate,
            ParkingPlaceUser: currentUserId,
          },
        }).then(() => {
          resetSelectedSlot(null);
        });
        break;
      }
      case "Cancel": {
        await repository.delete({
          idOrPath: selectedSlot,
          permanent: true,
        })
        .then(() => {
          resetSelectedSlot(null);
        });
        break;
      }
    }
  }

  function handleConfirmation() {
    updateReservation(props.selectedSlot, props.resetSelectedSlot, props.selectedAction, props.currentUserId);
  }
      
  return (
    <Box 
      sx={{
        ...styles.root,
        ...(props.selectedSlot ? {} : { pointerEvents: 'none' }),
        '&:hover': {
          cursor: 'pointer',
        },
      }}
      onClick={props.selectedSlot ? handleConfirmation : undefined}
      className={props.selectedSlot ? "" : "disabled"}>
      {props.selectedAction}
    </Box>
  );
}

export default Confirm;
