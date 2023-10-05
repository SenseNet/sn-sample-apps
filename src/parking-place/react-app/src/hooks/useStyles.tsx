import { SxProps, useTheme, Theme } from "@mui/material";

export function UseStyles(
  SXStyles: (theme: Theme) => Record<string, SxProps<Theme> | undefined>
) {
  const theme = useTheme();
  return SXStyles(theme);
}
