// ==============================
// MUI Theme Typescript Extension
// ==============================
interface Neutral {
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

interface Status {
  cyan: { main: string };
  yellow: { main: string; dark: string };
  blue: { main: string };
  green: { main: string };
  red: { main: string; dark: string };
  purple: { main: string };
  gray: { main: string };
}

declare module "@mui/material/styles" {
  interface Palette {
    neutral?: Neutral;
    status?: Status;
  }

  interface PaletteOptions {
    neutral?: Neutral;
    status?: Status;
  }
}

export {};
