import { SxProps, Theme } from "@mui/material";

export const ReservationStyles = (
  theme: Theme
): Record<string, SxProps<Theme> | undefined> => ({
  content: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: theme.sizes.desktopMaxWidth,
    margin: "0 auto",
    marginTop: "15vh",
    marginBottom: "25px",
    padding: "15px",
    borderRadius: theme.borderRadius.md,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    rowGap: theme.spacing(9),
    alignItems: "center",
    marginInline: "15px",
    [theme.breakpoints.up("md")]: {
      width: "786px",
    },
    [theme.breakpoints.up("lg")]: {
      width: theme.sizes.contentWidth,
    },
    "& h1": {
      marginTop: 0,
      marginBottom: 0,
    },
    "& .reservation-container": {
      display: "flex",
      flexDirection: "column",
      rowGap: theme.spacing(3),
      [theme.breakpoints.up("md")]: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        maxWidth: 700,
      },
    },
    "& .welcome-message": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  },
});

export const DatePickerStyles = (
  theme: Theme
): Record<string, SxProps<Theme> | undefined> => ({
  root: {
    display: "flex",
    flexDirection: "column",
    "& .MuiPickersSlideTransition-root": {
      minHeight: "200px",
    },
    "& .MuiPickersDay-root.Mui-disabled": {
      opacity: 0.5,
    },
    "& .MuiPickersDay-dayOutsideMonth": {
      color: "#000000",
    },
  },
});

export const ParkingSlotsStyles = (
  theme: Theme
): Record<string, SxProps<Theme> | undefined> => ({
  root: {
    //* 2 colum grid*/ */
    zIndex: 3,
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    justifyItems: "center",
    rowGap: "10px",
    alignContent: "center",
    [theme.breakpoints.up("md")]: {
      columnGap: theme.spacing(4),
    },
    "& .slot:not(:nth-of-type(7),:nth-of-type(8))": {
      width: "100%",
      display: "flex",
      paddingTop: "10px",
      paddingBottom: "10px",
      justifyContent: "center",
      borderBottom: "3px solid",
      borderColor: theme.palette.background.default,
    },
    "& .slot:nth-of-type(even) img": {
      transform: "rotate(180deg)",
    },
  },
});

export const EmptySlotStyles = (
  theme: Theme
): Record<string, SxProps<Theme> | undefined> => ({
  root: {
    border: "2px solid",
    borderColor: theme.palette.info.main,
    borderRadius: theme.borderRadius.sm,
    width: "119px",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: theme.palette.info.main,
    fontWeight: "bold",
  },
});

export const ReservedCardSlotStyle = (
  theme: Theme
): Record<string, SxProps<Theme> | undefined> => ({
  root: {
    width: "119px",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export const ConfirmButton = (
  theme: Theme
): Record<string, SxProps<Theme> | undefined> => ({
  root: {
    display: "flex",
    width: "300px",
    maxWidth: "100%",
    height: "10px",
    padding: "10px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: theme.borderRadius.md,
    "&.disabled": {
      backgroundColor: theme.palette.grey[500],
      color: theme.palette.grey[700],
    },
  },
});
