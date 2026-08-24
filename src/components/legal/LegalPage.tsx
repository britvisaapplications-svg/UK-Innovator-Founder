"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import GavelRoundedIcon from "@mui/icons-material/GavelRounded";

/** A block of legal content. Strings keep the source text lint-safe. */
export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "sub"; text: string }
  | { type: "table"; columns: string[]; rows: string[][] };

export type LegalSection = { id: string; n: string; title: string; blocks: LegalBlock[] };

const EMAIL_RE = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;

/** Render text, turning any email addresses into blue mailto: links. */
function withEmailLinks(text: string) {
  const parts = text.split(new RegExp(`(${EMAIL_RE.source})`, "g"));
  if (parts.length === 1) return text;
  return parts.map((part, i) =>
    EMAIL_RE.test(part) ? (
      <Box
        key={i}
        component="a"
        href={`mailto:${part}`}
        sx={{
          color: "#1a73e8",
          textDecoration: "none",
          fontWeight: 600,
          "&:hover": { textDecoration: "underline" },
        }}
      >
        {part}
      </Box>
    ) : (
      part
    )
  );
}

function Blocks({ blocks }: { blocks: LegalBlock[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        if (b.type === "sub") {
          return (
            <Typography
              key={i}
              component="h3"
              sx={{ fontWeight: 800, fontSize: 15.5, mt: 2.5, mb: 1, color: "text.primary" }}
            >
              {b.text}
            </Typography>
          );
        }
        if (b.type === "ul") {
          return (
            <Box
              key={i}
              component="ul"
              sx={{ pl: 3, my: 1.5, color: "text.secondary", "& li": { mb: 0.75, lineHeight: 1.6 } }}
            >
              {b.items.map((it, j) => (
                <li key={j}>{withEmailLinks(it)}</li>
              ))}
            </Box>
          );
        }
        if (b.type === "table") {
          return (
            <Box key={i} sx={{ my: 2, overflowX: "auto" }}>
              <Box
                component="table"
                sx={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: 14,
                  "& th, & td": {
                    border: "1px solid",
                    borderColor: "divider",
                    p: 1.25,
                    textAlign: "left",
                    verticalAlign: "top",
                  },
                  "& th": { bgcolor: "#fbeaec", fontWeight: 800 },
                  "& td": { color: "text.secondary" },
                }}
              >
                <thead>
                  <tr>
                    {b.columns.map((c) => (
                      <th key={c}>{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {b.rows.map((r, ri) => (
                    <tr key={ri}>
                      {r.map((cell, ci) => (
                        <td key={ci}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Box>
            </Box>
          );
        }
        return (
          <Typography key={i} sx={{ color: "text.secondary", lineHeight: 1.75, mb: 1.5 }}>
            {withEmailLinks(b.text)}
          </Typography>
        );
      })}
    </>
  );
}

export default function LegalPage({
  title,
  effectiveDate,
  intro,
  sections,
}: {
  title: string;
  effectiveDate?: string;
  intro?: string;
  sections: LegalSection[];
}) {
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
        <Container sx={{ py: { xs: 5, md: 7 } }}>
          <Stack
            direction="row"
            spacing={0.75}
            sx={{ alignItems: "center", color: "primary.main", mb: 1.5 }}
          >
            <GavelRoundedIcon sx={{ fontSize: 18 }} />
            <Typography sx={{ fontSize: 12.5, fontWeight: 800, letterSpacing: 1.4, textTransform: "uppercase" }}>
              Legal
            </Typography>
          </Stack>
          <Typography variant="h2" sx={{ fontSize: { xs: 30, md: 44 }, lineHeight: 1.1 }}>
            {title}
          </Typography>
          {effectiveDate && (
            <Typography sx={{ mt: 1.5, color: "text.secondary", fontWeight: 600 }}>
              Effective Date: {effectiveDate}
            </Typography>
          )}
          {intro && (
            <Typography sx={{ mt: 2, color: "text.secondary", maxWidth: 760, lineHeight: 1.7 }}>
              {intro}
            </Typography>
          )}
        </Container>
      </Box>

      {/* Body: sticky table of contents + content */}
      <Container sx={{ py: { xs: 4, md: 6 } }}>
        <Grid container spacing={{ xs: 0, md: 5 }}>
          <Grid size={{ xs: 12, md: 3.5 }} sx={{ display: { xs: "none", md: "block" } }}>
            <Box
              component="nav"
              aria-label="On this page"
              sx={{ position: "sticky", top: 110, maxHeight: "calc(100vh - 140px)", overflowY: "auto", pr: 1 }}
            >
              <Typography sx={{ fontSize: 12, fontWeight: 800, letterSpacing: 1.2, textTransform: "uppercase", color: "text.secondary", mb: 1.5 }}>
                On this page
              </Typography>
              <Stack spacing={0.25}>
                {sections.map((s) => (
                  <Box
                    key={s.id}
                    component="a"
                    href={`#${s.id}`}
                    sx={{
                      fontSize: 13,
                      lineHeight: 1.4,
                      color: "text.secondary",
                      textDecoration: "none",
                      py: 0.5,
                      borderLeft: "2px solid transparent",
                      pl: 1.25,
                      transition: "color .15s ease, border-color .15s ease",
                      "&:hover": { color: "primary.main", borderColor: "primary.main" },
                    }}
                  >
                    {s.n}. {s.title}
                  </Box>
                ))}
              </Stack>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 8.5 }}>
            <Box sx={{ maxWidth: 820 }}>
              {sections.map((s, idx) => (
                <Box key={s.id} component="section" sx={{ mb: 1 }}>
                  <Typography
                    id={s.id}
                    component="h2"
                    sx={{
                      fontWeight: 800,
                      fontSize: { xs: 19, md: 22 },
                      mt: idx === 0 ? 0 : 5,
                      mb: 1.5,
                      scrollMarginTop: 110,
                      color: "text.primary",
                    }}
                  >
                    {s.n}. {s.title}
                  </Typography>
                  <Blocks blocks={s.blocks} />
                  {idx < sections.length - 1 && <Divider sx={{ mt: 3 }} />}
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
