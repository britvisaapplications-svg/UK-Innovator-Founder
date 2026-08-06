"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import WorkHistoryRoundedIcon from "@mui/icons-material/WorkHistoryRounded";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import type { SvgIconComponent } from "@mui/icons-material";
import { SITE_NAME } from "@/lib/site";

/**
 * Our Team, ported from the client's eVisaPortal site: the same
 * IAA-regulated advisers presented with full profile cards (bio,
 * qualifications, registration, expertise). Site-level copy is adapted to
 * the Innovator Founder journey; adviser bios are kept as published.
 */

type Adviser = {
  initials: string;
  name: string;
  role: string;
  iaaRef: string;
  bio: string[];
  qualifications: string[];
  experience?: string;
  expertise: string[];
};

const ADVISERS: Adviser[] = [
  {
    initials: "SS",
    name: "Shams Sherzad",
    role: "Director · UK Immigration Adviser",
    iaaRef: "F202200117",
    bio: [
      "Shams Sherzad is the Director of Shams Britvisa Lawyers Ltd and an experienced UK immigration adviser dedicated to helping individuals and families navigate the UK immigration system.",
      "He holds a Bachelor of Laws (LLB Hons) and has successfully completed the Postgraduate Legal Practice Course (LPC). He is authorised and regulated by the Immigration Advice Authority (IAA) to provide UK immigration advice and services.",
      "Over the years, Shams has assisted clients from around the world with a wide range of UK immigration matters. His approach combines legal knowledge with practical experience, ensuring that every application is prepared carefully, accurately and professionally.",
    ],
    qualifications: ["Bachelor of Laws (LLB Hons)", "Postgraduate Legal Practice Course (LPC)"],
    expertise: [
      "UK Innovator Founder Visa",
      "Endorsement Applications",
      "Immigration Advice",
      "Application Preparation",
      "Supporting Documents & Evidence",
      "Immigration Compliance",
      "Client Care",
    ],
  },
  {
    initials: "AK",
    name: "Atif Khan",
    role: "UK Immigration Adviser",
    iaaRef: "F202200016",
    bio: [
      "Atif Khan is an experienced UK immigration adviser with over four years' experience advising and assisting clients on UK immigration matters. He holds a Master of Laws (LLM) and is authorised and regulated by the Immigration Advice Authority (IAA) to provide UK immigration advice and services.",
      "Throughout his career, Atif has assisted clients with a wide range of UK immigration applications. He is committed to providing practical guidance, meticulous case preparation and a professional service tailored to each client's individual circumstances.",
    ],
    qualifications: ["Master of Laws (LLM)"],
    experience: "Over 4 years' experience in UK immigration advice and services",
    expertise: [
      "UK Innovator Founder Visa",
      "Endorsement Applications",
      "Immigration Advice",
      "Application Preparation",
      "Supporting Documents & Evidence",
      "Client Care",
    ],
  },
];

function DetailBlock({
  icon: Icon,
  label,
  children,
}: {
  icon: SvgIconComponent;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Box>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 1 }}>
        <Icon sx={{ fontSize: 18, color: "primary.main" }} />
        <Typography sx={{ fontSize: 12.5, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", color: "text.secondary" }}>
          {label}
        </Typography>
      </Stack>
      {children}
    </Box>
  );
}

function AdviserCard({ adviser }: { adviser: Adviser }) {
  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 4,
        overflow: "hidden",
        bgcolor: "background.paper",
        boxShadow: "0 1px 2px rgba(15,17,21,0.04)",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: { xs: 2.5, md: 3.5 },
          borderBottom: "1px solid",
          borderColor: "divider",
          background:
            "radial-gradient(700px 260px at 85% -20%, rgba(214,31,48,0.08), transparent 60%), #f6f7f9",
        }}
      >
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2.5} sx={{ alignItems: { sm: "center" } }}>
          <Box
            sx={{
              width: 76,
              height: 76,
              borderRadius: "50%",
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
              background: "linear-gradient(135deg, #d61f30 0%, #a8121f 100%)",
              color: "#fff",
              fontWeight: 800,
              fontSize: 28,
              letterSpacing: 0.5,
              boxShadow: "0 6px 18px rgba(214,31,48,0.28)",
            }}
            aria-hidden
          >
            {adviser.initials}
          </Box>
          <Box>
            <Typography variant="h3" sx={{ fontSize: { xs: 22, md: 26 }, fontWeight: 800, lineHeight: 1.2 }}>
              {adviser.name}
            </Typography>
            <Typography sx={{ color: "primary.main", fontWeight: 700, fontSize: 15.5, mt: 0.5 }}>
              {adviser.role}
            </Typography>
            <Chip
              icon={<VerifiedRoundedIcon sx={{ fontSize: 16 }} />}
              label={`IAA Regulated · Reg No. ${adviser.iaaRef}`}
              size="small"
              sx={{ mt: 1.25, fontWeight: 700, bgcolor: "#fff", border: "1px solid", borderColor: "divider", "& .MuiChip-icon": { color: "primary.main" } }}
            />
          </Box>
        </Stack>
      </Box>

      {/* Body */}
      <Box sx={{ p: { xs: 2.5, md: 3.5 } }}>
        <Stack spacing={1.5}>
          {adviser.bio.map((para, i) => (
            <Typography key={i} sx={{ color: "text.secondary", lineHeight: 1.75 }}>
              {para}
            </Typography>
          ))}
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={{ xs: 3, md: 4 }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack spacing={3}>
              <DetailBlock icon={SchoolRoundedIcon} label="Qualifications">
                <Box component="ul" sx={{ pl: 2.5, m: 0, color: "text.secondary", "& li": { mb: 0.5, lineHeight: 1.6 } }}>
                  {adviser.qualifications.map((q) => (
                    <li key={q}>{q}</li>
                  ))}
                </Box>
              </DetailBlock>

              <DetailBlock icon={WorkspacePremiumRoundedIcon} label="Professional Registration">
                <Typography sx={{ color: "text.secondary", lineHeight: 1.6 }}>Immigration Advice Authority (IAA)</Typography>
                <Typography sx={{ color: "text.primary", fontWeight: 700, lineHeight: 1.6 }}>
                  Registration Number: {adviser.iaaRef}
                </Typography>
              </DetailBlock>

              {adviser.experience && (
                <DetailBlock icon={WorkHistoryRoundedIcon} label="Experience">
                  <Typography sx={{ color: "text.secondary", lineHeight: 1.6 }}>{adviser.experience}</Typography>
                </DetailBlock>
              )}
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <DetailBlock icon={VerifiedRoundedIcon} label="Areas of Expertise">
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 0.5 }}>
                {adviser.expertise.map((e) => (
                  <Chip
                    key={e}
                    label={e}
                    size="small"
                    sx={{ fontWeight: 600, bgcolor: "#fbeaec", color: "secondary.main", border: "1px solid", borderColor: "rgba(214,31,48,0.18)" }}
                  />
                ))}
              </Box>
            </DetailBlock>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default function TeamPage() {
  return (
    <>
      {/* Hero */}
      <Box
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          background:
            "radial-gradient(1100px 500px at 85% -10%, rgba(214,31,48,0.10), transparent 60%), #f6f7f9",
        }}
      >
        <Container sx={{ py: { xs: 5, md: 8 } }}>
          <Stack direction="row" spacing={0.75} sx={{ alignItems: "center", color: "primary.main", mb: 1.5 }}>
            <GroupsRoundedIcon sx={{ fontSize: 18 }} />
            <Typography sx={{ fontSize: 13, fontWeight: 800, letterSpacing: 1.4, textTransform: "uppercase" }}>
              Our Experts Team
            </Typography>
          </Stack>
          <Typography variant="h2" sx={{ fontSize: { xs: 30, md: 46 }, lineHeight: 1.08, maxWidth: 820 }}>
            Our Immigration Experts
          </Typography>
          <Typography sx={{ mt: 2.5, color: "text.secondary", maxWidth: 780, lineHeight: 1.75 }}>
            At {SITE_NAME}, we are committed to delivering professional, reliable and
            client-focused immigration services. Our team of UK immigration advisers combine
            academic qualifications with practical experience in UK immigration law, providing
            clear guidance and dedicated support throughout your Innovator Founder journey,
            from business idea to endorsement and visa application.
          </Typography>
        </Container>
      </Box>

      {/* Adviser profiles */}
      <Container sx={{ py: { xs: 5, md: 7 } }}>
        <Stack spacing={{ xs: 4, md: 5 }}>
          {ADVISERS.map((a) => (
            <AdviserCard key={a.name} adviser={a} />
          ))}
        </Stack>
      </Container>

      {/* Our Commitment */}
      <Box sx={{ bgcolor: "secondary.main", color: "#fff" }}>
        <Container sx={{ py: { xs: 5, md: 7 } }}>
          <Stack sx={{ maxWidth: 820, mx: "auto", textAlign: "center", alignItems: "center" }}>
            <Typography sx={{ fontSize: 13, fontWeight: 800, letterSpacing: 1.4, textTransform: "uppercase", color: "primary.light", mb: 1.5 }}>
              Our Commitment
            </Typography>
            <Typography variant="h3" sx={{ fontSize: { xs: 24, md: 32 }, fontWeight: 800, lineHeight: 1.2, mb: 2 }}>
              Professionalism, integrity and attention to detail
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.78)", lineHeight: 1.8 }}>
              Every application is handled with professionalism, integrity and attention to
              detail. We understand that every client&apos;s circumstances are unique, and we
              are committed to providing clear advice, responsive communication and dedicated
              support from the initial enquiry through to the final decision on your Innovator
              Founder visa application.
            </Typography>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
