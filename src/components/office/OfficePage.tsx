"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import DirectionsRoundedIcon from "@mui/icons-material/DirectionsRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import GavelRoundedIcon from "@mui/icons-material/GavelRounded";
import type { SvgIconComponent } from "@mui/icons-material";
import { OFFICE, SUPPORT_EMAIL, WHATSAPP_NUMBER, whatsappHref } from "@/lib/site";

/**
 * Our Office, ported from the firm's eVisaPortal site: the same Manchester
 * office, photo gallery, map, hours and trust details, with copy adapted to
 * the Innovator Founder service.
 */

const REASONS: { icon: SvgIconComponent; title: string; body: string }[] = [
  { icon: GavelRoundedIcon, title: "IAA-Regulated Advice", body: "Professional UK immigration advice from an Immigration Advice Authority (IAA) regulated firm." },
  { icon: LockRoundedIcon, title: "Secure Case Management", body: "Secure online document submission and case tracking throughout your endorsement journey." },
  { icon: ChatRoundedIcon, title: "Clear Communication", body: "Clear, consistent updates from start to finish, so you always know where things stand." },
  { icon: PublicRoundedIcon, title: "Remote Worldwide", body: "Remote consultations available worldwide by phone, email, WhatsApp and secure video." },
  { icon: PaymentsRoundedIcon, title: "Transparent Fees", body: "Transparent fees with no hidden charges, agreed clearly before any work begins." },
  { icon: SupportAgentRoundedIcon, title: "Client-Focused Service", body: "Friendly, professional and client-focused service tailored to your circumstances." },
];

function QuickContactButtons({ size = "large" }: { size?: "medium" | "large" }) {
  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ width: { xs: "100%", sm: "auto" } }}>
      <Button
        variant="contained"
        size={size}
        startIcon={<CallRoundedIcon />}
        href={`tel:${WHATSAPP_NUMBER}`}
        sx={{ borderRadius: 2, fontWeight: 700, px: 2.5 }}
      >
        Call Us
      </Button>
      <Button
        variant="outlined"
        size={size}
        startIcon={<EmailRoundedIcon />}
        href={`mailto:${SUPPORT_EMAIL}`}
        sx={{ borderRadius: 2, fontWeight: 700, px: 2.5 }}
      >
        Email Us
      </Button>
      <Button
        variant="outlined"
        size={size}
        startIcon={<WhatsAppIcon />}
        href={whatsappHref()}
        target="_blank"
        rel="noopener"
        sx={{
          borderRadius: 2,
          fontWeight: 700,
          px: 2.5,
          color: "#1f8f3a",
          borderColor: "#1f8f3a",
          "&:hover": { borderColor: "#176e2c", bgcolor: "rgba(31,143,58,0.06)" },
        }}
      >
        WhatsApp
      </Button>
    </Stack>
  );
}

function InfoCard({
  icon: Icon,
  title,
  children,
}: {
  icon: SvgIconComponent;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        p: { xs: 2.5, md: 3 },
        bgcolor: "background.paper",
        height: "100%",
      }}
    >
      <Stack direction="row" spacing={1.25} sx={{ alignItems: "center", mb: 1.5 }}>
        <Box
          sx={{
            width: 38,
            height: 38,
            borderRadius: 2,
            display: "grid",
            placeItems: "center",
            bgcolor: "#fbeaec",
            color: "primary.main",
            flexShrink: 0,
          }}
        >
          <Icon sx={{ fontSize: 20 }} />
        </Box>
        <Typography sx={{ fontWeight: 800, fontSize: 17 }}>{title}</Typography>
      </Stack>
      {children}
    </Box>
  );
}

/** Office photos (bento order: exterior, reception, credentials, desks, waiting). */
const PHOTOS: { src: string; caption: string }[] = [
  { src: "/office/office-3.webp", caption: "Our Manchester office" },
  { src: "/office/office-2.webp", caption: "Reception & waiting area" },
  { src: "/office/office-5.webp", caption: "IAA-regulated law firm" },
  { src: "/office/office-1.webp", caption: "Private consultation desks" },
  { src: "/office/office-4.webp", caption: "Client waiting area" },
];

function PhotoTile({
  photo,
  onOpen,
  fill = false,
}: {
  photo: { src: string; caption: string };
  onOpen: () => void;
  /** Fill the parent's height (used by the tall feature tile). */
  fill?: boolean;
}) {
  return (
    <Box
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen()}
      sx={{
        position: "relative",
        cursor: "pointer",
        borderRadius: 3,
        overflow: "hidden",
        border: "1px solid",
        borderColor: "divider",
        height: fill ? "100%" : "auto",
        aspectRatio: fill ? undefined : "4 / 3",
        "&:hover img": { transform: "scale(1.05)" },
        "&:hover .cap": { opacity: 1 },
      }}
    >
      <Box
        component="img"
        src={photo.src}
        alt={`${photo.caption}, Shams Britvisa Lawyers Ltd, Manchester`}
        loading="lazy"
        sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .4s ease" }}
      />
      <Box
        className="cap"
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          px: 1.75,
          py: 1.25,
          color: "#fff",
          fontSize: 13.5,
          fontWeight: 700,
          background: "linear-gradient(transparent, rgba(0,0,0,0.65))",
          opacity: { xs: 1, md: 0.85 },
          transition: "opacity .25s ease",
        }}
      >
        {photo.caption}
      </Box>
    </Box>
  );
}

function PhotoGallery() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <Box sx={{ borderBottom: "1px solid", borderColor: "divider" }}>
      <Container sx={{ py: { xs: 5, md: 7 } }}>
        <Stack sx={{ alignItems: "center", textAlign: "center", mb: { xs: 3, md: 4 } }}>
          <Typography sx={{ fontSize: 13, fontWeight: 800, letterSpacing: 1.4, textTransform: "uppercase", color: "primary.main", mb: 1 }}>
            Take a Look Inside
          </Typography>
          <Typography variant="h3" sx={{ fontSize: { xs: 24, md: 34 }, fontWeight: 800, lineHeight: 1.15, maxWidth: 720 }}>
            Our Manchester office
          </Typography>
        </Stack>

        <Grid container spacing={{ xs: 1.5, md: 2 }}>
          {/* Row 1: tall exterior feature + a right column of two stacked tiles */}
          <Grid size={{ xs: 12, md: 8 }}>
            <PhotoTile photo={PHOTOS[0]} onOpen={() => setOpen(0)} fill />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack spacing={{ xs: 1.5, md: 2 }} sx={{ height: "100%" }}>
              <PhotoTile photo={PHOTOS[1]} onOpen={() => setOpen(1)} />
              <PhotoTile photo={PHOTOS[2]} onOpen={() => setOpen(2)} />
            </Stack>
          </Grid>
          {/* Row 2: two wide tiles */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <PhotoTile photo={PHOTOS[3]} onOpen={() => setOpen(3)} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <PhotoTile photo={PHOTOS[4]} onOpen={() => setOpen(4)} />
          </Grid>
        </Grid>
      </Container>

      {/* Lightbox */}
      <Dialog open={open !== null} onClose={() => setOpen(null)} maxWidth="lg" fullWidth>
        <Box sx={{ position: "relative", bgcolor: "#15181d" }}>
          <IconButton
            onClick={() => setOpen(null)}
            aria-label="Close"
            sx={{ position: "absolute", top: 8, right: 8, color: "#fff", bgcolor: "rgba(0,0,0,0.35)", "&:hover": { bgcolor: "rgba(0,0,0,0.6)" }, zIndex: 1 }}
          >
            <CloseRoundedIcon />
          </IconButton>
          {open !== null && (
            <Box
              component="img"
              src={PHOTOS[open].src}
              alt={PHOTOS[open].caption}
              sx={{ width: "100%", height: "auto", maxHeight: "85vh", objectFit: "contain", display: "block" }}
            />
          )}
        </Box>
      </Dialog>
    </Box>
  );
}

export default function OfficePage() {
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
            <LocationOnRoundedIcon sx={{ fontSize: 18 }} />
            <Typography sx={{ fontSize: 13, fontWeight: 800, letterSpacing: 1.4, textTransform: "uppercase" }}>
              Visit Us · Manchester, United Kingdom
            </Typography>
          </Stack>
          <Typography variant="h2" sx={{ fontSize: { xs: 30, md: 46 }, lineHeight: 1.08, maxWidth: 820 }}>
            Welcome to Our Manchester Office
          </Typography>
          <Stack spacing={1.75} sx={{ mt: 2.5, maxWidth: 780 }}>
            <Typography sx={{ color: "text.secondary", lineHeight: 1.75 }}>
              Shams Britvisa Lawyers Ltd is proudly based in Manchester, England, providing
              professional UK immigration advice and visa services, including the Innovator
              Founder route, to individuals, families and businesses throughout the United
              Kingdom and across the world.
            </Typography>
            <Typography sx={{ color: "text.secondary", lineHeight: 1.75 }}>
              Whilst our head office is in Manchester, the majority of our services can be
              provided remotely through secure online consultations, telephone, email, WhatsApp
              and video meetings, allowing us to assist clients wherever they are located.
            </Typography>
          </Stack>
          <Box sx={{ mt: 3.5 }}>
            <QuickContactButtons />
          </Box>
        </Container>
      </Box>

      {/* Office photo gallery */}
      <PhotoGallery />

      {/* Address + hours + map */}
      <Container sx={{ py: { xs: 5, md: 7 } }}>
        <Grid container spacing={{ xs: 3, md: 5 }}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Stack spacing={2.5}>
              <InfoCard icon={LocationOnRoundedIcon} title="Our Office">
                <Stack spacing={0.25}>
                  {OFFICE.addressLines.map((line, i) => (
                    <Typography
                      key={i}
                      sx={{ color: i === 0 ? "text.primary" : "text.secondary", fontWeight: i === 0 ? 700 : 400, lineHeight: 1.7 }}
                    >
                      {line}
                    </Typography>
                  ))}
                </Stack>
                <Divider sx={{ my: 2 }} />
                <Stack spacing={0.75}>
                  <Box component="a" href={`tel:${WHATSAPP_NUMBER}`} sx={{ display: "flex", alignItems: "center", gap: 1, color: "text.secondary", textDecoration: "none", "&:hover": { color: "primary.main" } }}>
                    <CallRoundedIcon sx={{ fontSize: 18 }} /> {OFFICE.phoneDisplay}
                  </Box>
                  <Box component="a" href={`mailto:${SUPPORT_EMAIL}`} sx={{ display: "flex", alignItems: "center", gap: 1, color: "#1a73e8", textDecoration: "none", fontWeight: 600, "&:hover": { textDecoration: "underline" } }}>
                    <EmailRoundedIcon sx={{ fontSize: 18 }} /> {SUPPORT_EMAIL}
                  </Box>
                </Stack>
              </InfoCard>

              <InfoCard icon={AccessTimeRoundedIcon} title="Office Hours">
                <Stack spacing={1}>
                  <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                    <Typography sx={{ color: "text.secondary" }}>Monday to Friday</Typography>
                    <Typography sx={{ fontWeight: 700 }}>9:00am to 5:30pm</Typography>
                  </Stack>
                  <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                    <Typography sx={{ color: "text.secondary" }}>Saturday &amp; Sunday</Typography>
                    <Typography sx={{ fontWeight: 700 }}>By appointment</Typography>
                  </Stack>
                </Stack>
                <Typography sx={{ mt: 1.75, color: "text.secondary", fontSize: 14.5, lineHeight: 1.6 }}>
                  Appointments may be conducted in person, by telephone or via secure online
                  video conferencing. Weekend appointments are subject to availability.
                </Typography>
              </InfoCard>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <Box
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 3,
                overflow: "hidden",
                height: "100%",
                minHeight: { xs: 300, md: 420 },
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                component="iframe"
                title="Manchester office location map"
                src={`https://www.google.com/maps?q=${OFFICE.mapsQuery}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                sx={{ border: 0, width: "100%", flex: 1, minHeight: { xs: 260, md: 380 } }}
              />
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                sx={{ p: 2, alignItems: { sm: "center" }, justifyContent: "space-between", borderTop: "1px solid", borderColor: "divider" }}
              >
                <Stack direction="row" spacing={1} sx={{ alignItems: "center", color: "text.secondary" }}>
                  <DirectionsRoundedIcon sx={{ fontSize: 20, color: "primary.main" }} />
                  <Typography sx={{ fontSize: 15 }}>
                    Within easy reach of Manchester City Centre, accessible by public transport and road.
                  </Typography>
                </Stack>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<DirectionsRoundedIcon />}
                  href={`https://www.google.com/maps/dir/?api=1&destination=${OFFICE.mapsQuery}`}
                  target="_blank"
                  rel="noopener"
                  sx={{ borderRadius: 2, fontWeight: 700, flexShrink: 0 }}
                >
                  Get Directions
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Serving clients worldwide */}
      <Box sx={{ bgcolor: "secondary.main", color: "#fff" }}>
        <Container sx={{ py: { xs: 5, md: 7 } }}>
          <Grid container spacing={{ xs: 3, md: 6 }} sx={{ alignItems: "center" }}>
            <Grid size={{ xs: 12, md: 5 }}>
              <Stack direction="row" spacing={1} sx={{ alignItems: "center", color: "primary.light", mb: 1.5 }}>
                <PublicRoundedIcon sx={{ fontSize: 20 }} />
                <Typography sx={{ fontSize: 13, fontWeight: 800, letterSpacing: 1.4, textTransform: "uppercase" }}>
                  Serving Clients Worldwide
                </Typography>
              </Stack>
              <Typography variant="h3" sx={{ fontSize: { xs: 24, md: 32 }, fontWeight: 800, lineHeight: 1.15 }}>
                Based in Manchester. Helping founders across the world.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 7 }}>
              <Stack spacing={1.75}>
                <Typography sx={{ color: "rgba(255,255,255,0.78)", lineHeight: 1.75 }}>
                  Although our office is located in Manchester, we regularly assist clients from
                  across the world with UK immigration matters. Our online systems let us provide
                  professional advice and support remotely, so you can instruct us conveniently
                  without visiting our office.
                </Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.78)", lineHeight: 1.75 }}>
                  We assist individuals, families and businesses from a wide range of countries,
                  and aim to make the endorsement and visa process as straightforward,
                  transparent and efficient as possible.
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Why choose us */}
      <Container sx={{ py: { xs: 5, md: 7 } }}>
        <Stack sx={{ alignItems: "center", textAlign: "center", mb: { xs: 4, md: 5 } }}>
          <Typography sx={{ fontSize: 13, fontWeight: 800, letterSpacing: 1.4, textTransform: "uppercase", color: "primary.main", mb: 1 }}>
            Why Choose Us
          </Typography>
          <Typography variant="h3" sx={{ fontSize: { xs: 24, md: 34 }, fontWeight: 800, lineHeight: 1.15, maxWidth: 720 }}>
            Why clients choose our Manchester office
          </Typography>
        </Stack>
        <Grid container spacing={{ xs: 2.5, md: 3 }}>
          {REASONS.map((r) => (
            <Grid key={r.title} size={{ xs: 12, sm: 6, md: 4 }}>
              <Box
                sx={{
                  height: "100%",
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 3,
                  p: { xs: 2.5, md: 3 },
                  transition: "box-shadow .2s ease, transform .2s ease",
                  "&:hover": { boxShadow: "0 12px 30px rgba(15,17,21,0.08)", transform: "translateY(-2px)" },
                }}
              >
                <Box
                  sx={{
                    width: 46,
                    height: 46,
                    borderRadius: 2.5,
                    display: "grid",
                    placeItems: "center",
                    bgcolor: "#fbeaec",
                    color: "primary.main",
                    mb: 1.75,
                  }}
                >
                  <r.icon sx={{ fontSize: 24 }} />
                </Box>
                <Typography sx={{ fontWeight: 800, fontSize: 17, mb: 0.75 }}>{r.title}</Typography>
                <Typography sx={{ color: "text.secondary", lineHeight: 1.7, fontSize: 15.5 }}>{r.body}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Trust strip */}
      <Box sx={{ borderTop: "1px solid", borderColor: "divider", bgcolor: "#fdf2f3" }}>
        <Container sx={{ py: { xs: 3.5, md: 4 } }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 2, sm: 4 }}
            sx={{ alignItems: "center", justifyContent: "center", textAlign: { xs: "center", sm: "left" } }}
            divider={<Divider orientation="vertical" flexItem sx={{ display: { xs: "none", sm: "block" } }} />}
          >
            <Stack direction="row" spacing={1.25} sx={{ alignItems: "center" }}>
              <VerifiedRoundedIcon sx={{ color: "primary.main" }} />
              <Typography sx={{ fontWeight: 700, fontSize: 15.5 }}>
                IAA Regulated · Reg No. {OFFICE.iaaRef}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1.25} sx={{ alignItems: "center" }}>
              <GavelRoundedIcon sx={{ color: "primary.main" }} />
              <Typography sx={{ fontWeight: 700, fontSize: 15.5 }}>
                Registered in England &amp; Wales · No. {OFFICE.companyNo}
              </Typography>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Contact CTA */}
      <Container sx={{ py: { xs: 5, md: 7 } }}>
        <Box
          sx={{
            borderRadius: 4,
            p: { xs: 3, md: 5 },
            textAlign: "center",
            background: "linear-gradient(135deg, #d61f30 0%, #a8121f 100%)",
            color: "#fff",
          }}
        >
          <Typography variant="h3" sx={{ fontSize: { xs: 23, md: 30 }, fontWeight: 800, mb: 1.25 }}>
            Contact our Manchester office
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.9)", maxWidth: 620, mx: "auto", mb: 3, lineHeight: 1.7 }}>
            We look forward to assisting you with your Innovator Founder journey. If you would
            like to attend in person, please contact us in advance so we can arrange a
            convenient time.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ justifyContent: "center" }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<CallRoundedIcon />}
              href={`tel:${WHATSAPP_NUMBER}`}
              sx={{ borderRadius: 2, fontWeight: 800, bgcolor: "#fff", color: "primary.main", "&:hover": { bgcolor: "#f4f4f4" } }}
            >
              Call Us
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<EmailRoundedIcon />}
              href={`mailto:${SUPPORT_EMAIL}`}
              sx={{ borderRadius: 2, fontWeight: 800, color: "#fff", borderColor: "rgba(255,255,255,0.6)", "&:hover": { borderColor: "#fff", bgcolor: "rgba(255,255,255,0.1)" } }}
            >
              Email Us
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<WhatsAppIcon />}
              href={whatsappHref()}
              target="_blank"
              rel="noopener"
              sx={{ borderRadius: 2, fontWeight: 800, color: "#fff", borderColor: "rgba(255,255,255,0.6)", "&:hover": { borderColor: "#fff", bgcolor: "rgba(255,255,255,0.1)" } }}
            >
              WhatsApp
            </Button>
          </Stack>
        </Box>
      </Container>
    </>
  );
}
