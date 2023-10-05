import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import "dayjs/locale/en-gb";
import { UseStyles } from "../../hooks/useStyles";
import { DatePickerStyles } from "./stlyes";

dayjs.locale("en-gb");

export default function DatePicker() {
  const styles = UseStyles(DatePickerStyles);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        sx={styles.root}
        slotProps={{
          toolbar: { hidden: true },
          actionBar: { hidden: true, sx: { display: "none" } },
        }}
        showDaysOutsideCurrentMonth
        orientation="landscape"
        minDate={dayjs(new Date())}
        maxDate={dayjs(new Date()).add(1, "month")}
        defaultValue={dayjs(new Date())}
      />
    </LocalizationProvider>
  );
}
