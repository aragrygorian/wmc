/**
 * Common config across packages e.g. admin panel, dashboard, website.
 */
export const commonConfig = {
  platformTitle: "Workmetric",
  title: "Workmetric",
  taxRate: 0.07,
  theme: {
    palette: {
      primary: {
        main: "#36a1cf",
        light: "#a5d6e5",
        dark: "#134b63",
        contrastText: "#fff",
      },
      secondary: {
        main: "#134b63",
        light: "#36a1cf",
        dark: "#094057",
        contrastText: "#fff",
      },
      status: {
        cyan: { main: "#1B4F5C" },
        yellow: { main: "#F5BD07", dark: "#BF9001" },
        blue: { main: "#4485F4" },
        green: { main: "#34A853" },
        red: { main: "#F11503", dark: "#980000", light: "#F44336" },
        purple: { main: "#9900FF" },
        gray: { main: "#B7B7B7" },
      },
    },
  },
};
