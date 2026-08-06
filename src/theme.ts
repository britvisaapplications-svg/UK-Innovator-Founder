"use client";

import { createTheme, responsiveFontSizes } from "@mui/material/styles";

/**
 * Brand theme, shared with the client's existing eVisaPortal identity:
 * bold crimson for actions, near-black ink for headings and dark sections,
 * on a clean light-grey canvas.
 *
 * Display type is Bricolage Grotesque (headings) over Geist Sans (body/UI);
 * Geist Mono is used for tracking references.
 *
 * `cssVariables` lets MUI emit CSS variables and avoids the flash of
 * unstyled content on the App Router.
 */
let theme = createTheme({
  cssVariables: true,
  palette: {
    mode: "light",
    primary: {
      main: "#d61f30", // brand crimson
      dark: "#b3162a",
      light: "#f0808d",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#15181d", // ink / near-black
      light: "#3a3f47",
      contrastText: "#ffffff",
    },
    success: { main: "#2e9e5b" },
    warning: { main: "#c77800" },
    info: { main: "#17b3c9" },
    text: {
      primary: "#1a1d22",
      secondary: "#5b626d",
    },
    background: {
      default: "#f6f7f9",
      paper: "#ffffff",
    },
    divider: "rgba(20,22,28,0.10)",
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
    // Global readability bump: scales every variant ~7% over MUI's default.
    fontSize: 15,
    h1: {
      fontFamily: "var(--font-display), var(--font-geist-sans), sans-serif",
      fontWeight: 800,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontFamily: "var(--font-display), var(--font-geist-sans), sans-serif",
      fontWeight: 800,
      letterSpacing: "-0.02em",
    },
    h3: {
      fontFamily: "var(--font-display), var(--font-geist-sans), sans-serif",
      fontWeight: 800,
      letterSpacing: "-0.01em",
    },
    h4: {
      fontFamily: "var(--font-display), var(--font-geist-sans), sans-serif",
      fontWeight: 700,
      letterSpacing: "-0.01em",
    },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    button: { fontWeight: 700, textTransform: "none" },
    subtitle1: { fontWeight: 600 },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingInline: 22,
          paddingBlock: 10,
        },
        sizeLarge: { paddingBlock: 14, paddingInline: 28, fontSize: "1rem" },
        contained: {
          boxShadow: "0 8px 20px -8px rgba(214,31,48,0.55)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: { borderRadius: 18 },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          borderRadius: 20,
          border: "1px solid rgba(20,22,28,0.08)",
        },
      },
    },
    MuiTextField: {
      defaultProps: { variant: "outlined" },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { borderRadius: 12, background: "#fff" },
      },
    },
    MuiAccordion: {
      defaultProps: { disableGutters: true, elevation: 0 },
      styleOverrides: {
        root: {
          border: "1px solid rgba(20,22,28,0.08)",
          borderRadius: "14px !important",
          "&::before": { display: "none" },
        },
      },
    },
    MuiContainer: {
      defaultProps: { maxWidth: "lg" },
    },
  },
});

// Scale headings down automatically on smaller screens.
theme = responsiveFontSizes(theme, { factor: 2.4 });

export default theme;
