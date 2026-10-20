"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import FlightTakeoffRoundedIcon from "@mui/icons-material/FlightTakeoffRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import type { SvgIconComponent } from "@mui/icons-material";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/home/SectionHeading";

/** The three qualifying years, and what the business is doing in each. */
const YEARS = [
  { label: "Year 1", doing: "Develop and grow" },
  { label: "Year 2", doing: "Continue scaling" },
  { label: "Year 3", doing: "Prepare for settlement" },
];

/**
 * Fixed points on the three-year track, placed by percentage. The two
 * contact-point meetings are mandatory, so they are marked as gates rather
 * than ordinary steps.
 */
const MARKERS: {
  at: number;
  icon: SvgIconComponent;
  title: string;
  note?: string;
  gate?: boolean;
  end?: boolean;
}[] = [
  { at: 0, icon: FlightTakeoffRoundedIcon, title: "Visa granted" },
  { at: 33.33, icon: EventAvailableRoundedIcon, title: "~Month 12", note: "Contact-point meeting", gate: true },
  { at: 66.66, icon: EventAvailableRoundedIcon, title: "~Month 24", note: "Contact-point meeting", gate: true },
  { at: 100, icon: HomeRoundedIcon, title: "Year 3", note: "ILR assessment", end: true },
];

/**
 * §14 + §15, life after the visa is granted.
 *
 * This is the only part of the journey measured in years rather than steps,
 * so it is drawn as one continuous three-year meter with the two mandatory
 * contact-point meetings marked as gates along it, ending at the ILR
 * assessment. Horizontal on desktop, vertical on phones.
 */
export default function AfterVisa() {
  return (
    <Box id="three-year-journey" component="section" sx={{ py: { xs: 6, md: 9 }, bgcolor: "#fff", scrollMarginTop: 96 }}>
      <Container>
        <SectionHeading
          eyebrow="Three-Year Journey"
          title="After the visa: three years to potential ILR"
          subtitle="Three qualifying years can potentially lead to ILR, subject to requirements."
        />

        <Reveal>
          <Paper variant="outlined" sx={{ borderRadius: 5, p: { xs: 3, md: 5 } }}>
            {/* Desktop: horizontal meter */}
            <Box sx={{ display: { xs: "none", md: "block" }, px: 7 }}>
              {/* Year ruler */}
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", mb: 2 }}>
                {YEARS.map((y, i) => (
                  <Box
                    key={y.label}
                    sx={{
                      textAlign: "center",
                      borderLeft: i === 0 ? "none" : "1px dashed",
                      borderColor: "divider",
                      px: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "var(--font-geist-mono)",
                        fontSize: 12,
                        fontWeight: 800,
                        letterSpacing: 1,
                        textTransform: "uppercase",
                        color: "primary.main",
                      }}
                    >
                      {y.label}
                    </Typography>
                    <Typography sx={{ fontSize: 13.5, color: "text.secondary", mt: 0.25 }}>
                      {y.doing}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* The meter */}
              <Box sx={{ position: "relative", height: 128 }}>
                <Box
                  sx={{
                    position: "absolute",
                    top: 19,
                    left: 0,
                    right: 0,
                    height: 8,
                    borderRadius: 999,
                    background:
                      "linear-gradient(90deg, rgba(214,31,48,0.35), rgba(214,31,48,0.95) 70%, #15181d)",
                  }}
                />
                {MARKERS.map((m) => (
                  <Box
                    key={m.title}
                    sx={{
                      position: "absolute",
                      left: `${m.at}%`,
                      top: 0,
                      transform: "translateX(-50%)",
                      width: 168,
                      textAlign: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: 46,
                        height: 46,
                        mx: "auto",
                        borderRadius: "50%",
                        display: "grid",
                        placeItems: "center",
                        bgcolor: m.end ? "secondary.main" : "#fff",
                        color: m.end ? "#fff" : "primary.main",
                        border: m.end ? "none" : "2px solid",
                        borderColor: "primary.main",
                        boxShadow: m.end
                          ? "0 0 0 7px rgba(21,24,29,0.10)"
                          : m.gate
                            ? "0 0 0 7px rgba(214,31,48,0.12)"
                            : "none",
                      }}
                    >
                      <m.icon sx={{ fontSize: 23 }} />
                    </Box>
                    <Typography sx={{ mt: 1.25, fontWeight: 700, fontSize: 15, lineHeight: 1.3 }}>
                      {m.title}
                    </Typography>
                    {m.note && (
                      <Typography sx={{ fontSize: 13, color: "text.secondary", lineHeight: 1.4 }}>
                        {m.note}
                      </Typography>
                    )}
                    {m.gate && (
                      <Typography
                        sx={{ fontSize: 11, fontWeight: 800, letterSpacing: 0.6, textTransform: "uppercase", color: "primary.main", mt: 0.4 }}
                      >
                        Mandatory
                      </Typography>
                    )}
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Mobile: the same meter, turned vertical */}
            <Stack sx={{ display: { xs: "flex", md: "none" } }} spacing={0}>
              {MARKERS.map((m, i) => {
                const isLast = i === MARKERS.length - 1;
                return (
                  <Stack key={m.title} direction="row" spacing={2} sx={{ alignItems: "stretch" }}>
                    <Stack sx={{ alignItems: "center" }}>
                      <Box
                        sx={{
                          width: 42,
                          height: 42,
                          flexShrink: 0,
                          borderRadius: "50%",
                          display: "grid",
                          placeItems: "center",
                          bgcolor: m.end ? "secondary.main" : "#fff",
                          color: m.end ? "#fff" : "primary.main",
                          border: m.end ? "none" : "2px solid",
                          borderColor: "primary.main",
                        }}
                      >
                        <m.icon sx={{ fontSize: 21 }} />
                      </Box>
                      {!isLast && (
                        <Box
                          sx={{
                            width: 6,
                            flex: 1,
                            minHeight: 44,
                            my: 0.75,
                            borderRadius: 999,
                            background: "linear-gradient(rgba(214,31,48,0.5), rgba(214,31,48,0.9))",
                          }}
                        />
                      )}
                    </Stack>
                    <Box sx={{ pb: isLast ? 0 : 2.5, pt: 0.5 }}>
                      <Typography sx={{ fontWeight: 700, fontSize: 16, lineHeight: 1.3 }}>
                        {m.title}
                      </Typography>
                      {m.note && (
                        <Typography sx={{ fontSize: 14, color: "text.secondary", lineHeight: 1.45 }}>
                          {m.note}
                        </Typography>
                      )}
                      {!isLast && (
                        <Typography sx={{ fontSize: 13, color: "text.secondary", mt: 0.75 }}>
                          {YEARS[i].label}: {YEARS[i].doing.toLowerCase()}
                        </Typography>
                      )}
                    </Box>
                  </Stack>
                );
              })}
            </Stack>
          </Paper>
        </Reveal>

        {/* Premium sits with the two gates, so it belongs directly under them. */}
        <Reveal delay={100}>
          <Stack
            direction="row"
            spacing={1.25}
            sx={{ alignItems: "center", justifyContent: "center", mt: 3 }}
          >
            <WorkspacePremiumRoundedIcon sx={{ fontSize: 19, color: "primary.main", flexShrink: 0 }} />
            <Typography sx={{ fontSize: 14.5, color: "text.secondary", textAlign: "center" }}>
              Premium includes support at both contact-point meetings and through to the ILR stage.
            </Typography>
          </Stack>
        </Reveal>
      </Container>
    </Box>
  );
}
