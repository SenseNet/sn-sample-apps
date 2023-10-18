import React from "react";
import { UseStyles } from "../../hooks/useStyles";
import { EmptySlotStyles } from "./stlyes";
import { Box } from "@mui/material";
import { useOidcAuthentication } from "@sensenet/authentication-oidc-react";

type EmptySlotProps = {
  id: number;
  displayName: string;
  parkingPlaceCode: string;
  selectedSlot: number;
  setSelectedAction: (slot: any) => void;
  setSelectedSlot: (slot: number) => void;
};

function EmptySlot({ id, displayName, parkingPlaceCode, selectedSlot, setSelectedSlot, setSelectedAction }: EmptySlotProps) {
  const styles = UseStyles(EmptySlotStyles);
  const { oidcUser } = useOidcAuthentication();
  
  function handleSlotSelection(slot: any) {
    setSelectedSlot(slot);
    setSelectedAction("reserve");
  }

  return (
    <Box 
      sx={{
        ...styles.root,
        ...(id === selectedSlot ? {borderColor:"darkcyan", color:"darkcyan"} : {}),
        '&:hover': {
          cursor: 'pointer',
        },
      }}
      onClick={() => oidcUser?handleSlotSelection(id):null}>
      {parkingPlaceCode}
    </Box>
  );
}

export default EmptySlot;