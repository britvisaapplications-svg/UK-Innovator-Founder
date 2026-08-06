"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import BusinessCenterRoundedIcon from "@mui/icons-material/BusinessCenterRounded";
import FamilyRestroomRoundedIcon from "@mui/icons-material/FamilyRestroomRounded";
import HomeWorkRoundedIcon from "@mui/icons-material/HomeWorkRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import PersonOffRoundedIcon from "@mui/icons-material/PersonOffRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import WorkHistoryRoundedIcon from "@mui/icons-material/WorkHistoryRounded";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/home/SectionHeading";

const BENEFITS = [
  {
    icon: PersonOffRoundedIcon,
    title: "No employer sponsor required",
    desc: "The route relies on endorsement of your business proposition, not a job offer.",
  },
  {
    icon: BusinessCenterRoundedIcon,
    title: "Build and run your own UK business",
    desc: "Establish and grow the company you found; you stay in control of the venture.",
  },
  {
    icon: HomeWorkRoundedIcon,
    title: "Potential ILR after 3 years",
    desc: "Subject to settlement requirements, one of the fastest potential routes to settlement.",
  },
  {
    icon: WorkHistoryRoundedIcon,
    title: "Work alongside your business",
    desc: "Eligible outside skilled employment is permitted alongside the business, subject to conditions.",
  },
  {
    icon: FamilyRestroomRoundedIcon,
    title: "Bring eligible dependants",
    desc: "Your eligible partner and children can apply to join you as dependants.",
  },
  {
    icon: PaymentsRoundedIcon,
    title: "No fixed £50,000 threshold",
    desc: "There is no universal minimum investment; funding should match the needs of your venture.",
  },
  {
    icon: PublicRoundedIcon,
    title: "Access to the UK market",
    desc: "Build from one of the world's leading economies, with potential national and international scale.",
  },
];

/** §5, Benefits: seven cards. */
export default function Benefits() {
  return (
    <Box id="benefits" component="section" sx={{ py: { xs: 6, md: 9 }, scrollMarginTop: 96 }}>
      <Container>
        <SectionHeading
          eyebrow="Benefits"
          title="Why founders choose this route"
        />
        <Grid container spacing={2}>
          {BENEFITS.map((b, i) => (
            <Grid key={b.title} size={{ xs: 12, sm: 6, md: 4 }}>
              <Reveal delay={(i % 3) * 80} sx={{ height: "100%" }}>
                <Paper className="lift-card" sx={{ p: 2.5, borderRadius: 4, height: "100%" }}>
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: 2.5,
                      bgcolor: "#fbeaec",
                      display: "grid",
                      placeItems: "center",
                      mb: 1.5,
                    }}
                  >
                    <b.icon sx={{ color: "primary.main", fontSize: 24 }} />
                  </Box>
                  <Typography sx={{ fontWeight: 700, fontSize: 16.5, mb: 0.5 }}>{b.title}</Typography>
                  <Typography sx={{ fontSize: 14.5, color: "text.secondary", lineHeight: 1.6 }}>
                    {b.desc}
                  </Typography>
                </Paper>
              </Reveal>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
