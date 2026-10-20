import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import theme from "@/theme";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MobileCtaBar from "@/components/MobileCtaBar";
import { SITE_NAME } from "@/lib/site";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} | Build Your Own Innovative Business in the UK`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "UK Innovator Founder Visa support: no employer sponsor required, potential ILR after 3 years. Start with a free CV & profile check; we review, discuss and help you refine your own business idea.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${geistSans.variable} ${geistMono.variable}`}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* Bottom padding on phones keeps the fixed CV-check bar clear of the footer. */}
            <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100dvh", pb: { xs: 9, sm: 0 } }}>
              <SiteHeader />
              <Box component="main" sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                {children}
              </Box>
              <SiteFooter />
              <MobileCtaBar />
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
