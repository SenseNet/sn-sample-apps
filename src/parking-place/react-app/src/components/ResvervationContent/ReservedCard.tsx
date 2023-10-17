import React from "react";
import { UseStyles } from "../../hooks/useStyles";
import { ReservedCardSlotStyle } from "./stlyes";
import { Box } from "@mui/material";
import { useOidcAuthentication } from "@sensenet/authentication-oidc-react";

type ReservedSlotProps = {
  id: number | undefined;
  ownReservation: boolean;
  displayName: string;
  parkingPlaceCode: string;
  reservedByName: string | undefined;
  selectedSlot: number;
  setSelectedAction: (slot: any) => void;
  setSelectedSlot: (slot: number) => void;
};

function ReservedCard({ id, ownReservation, reservedByName, displayName, parkingPlaceCode, selectedSlot, setSelectedSlot, setSelectedAction}: ReservedSlotProps) {
  const styles = UseStyles(ReservedCardSlotStyle);
  const { oidcUser } = useOidcAuthentication();
  
  function handleSlotSelection(slot: any) {
    setSelectedSlot(slot);
    setSelectedAction("cancel");
  }

  function colorizeSvg(selected: boolean, ownReservation: boolean) {
    return (selected ? 'contrast(50%)' : '') + (ownReservation ? ' invert(1%) sepia(10%) saturate(1352%) hue-rotate(87deg) brightness(119%)' : '');
  }

  return (
    <Box 
      sx={{
        ...styles.root,
        '&:hover': {
          cursor: 'pointer',
        },
      }}
      onClick={() => oidcUser?handleSlotSelection(id):null}>
      <img
        // src={id === selectedSlot ? "/images/car-x.svg" : "/images/car.svg"}
        src="/images/car.svg"
        loading="lazy"
        alt="car"
        height={50}
        width={110}
        style={{
            filter: colorizeSvg(id === selectedSlot, ownReservation),
        }}
        title={reservedByName}
      />      
    </Box>
  );
}

export default ReservedCard;
