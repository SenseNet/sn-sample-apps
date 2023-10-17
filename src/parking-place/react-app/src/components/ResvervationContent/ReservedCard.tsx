import React from "react";
import { UseStyles } from "../../hooks/useStyles";
import { ReservedCardSlotStyle } from "./stlyes";
import { Box } from "@mui/material";
import { useOidcAuthentication } from "@sensenet/authentication-oidc-react";

type ReservedSlotProps = {
  id: number | undefined;
  displayName: string;
  parkingPlaceCode: string;
  selectedSlot: number;
  setSelectedAction: (slot: any) => void;
  setSelectedSlot: (slot: number) => void;
};

function ReservedCard({ id, displayName, parkingPlaceCode, selectedSlot, setSelectedSlot, setSelectedAction}: ReservedSlotProps) {
  const styles = UseStyles(ReservedCardSlotStyle);
  const { oidcUser } = useOidcAuthentication();
  
  function handleSlotSelection(slot: any) {
    setSelectedSlot(slot);
    setSelectedAction("cancel");
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
          filter: id === selectedSlot ? 'contrast(50%)' : '',
        }}
      />
    </Box>
  );
}

export default ReservedCard;
