"use client";

import { useRef, useState, type DragEvent } from "react";
import Link from "next/link";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import { INVESTMENT_OPTIONS } from "@/lib/site";
import { countryNames } from "@/lib/countries";

const CV_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

/**
 * FREE CV & PROFILE CHECK, the primary conversion action, repeated across
 * the site. Single-card form per the client mockup; only Email is required
 * (per the brief, other mandatory fields TBC with the client).
 */
export default function LeadForm() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [hasIdea, setHasIdea] = useState<string | null>(null);
  const [budget, setBudget] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [dragOver, setDragOver] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  function acceptFile(f: File | undefined | null) {
    setError(null);
    if (!f) return;
    if (f.size > 8 * 1024 * 1024) {
      setError("Your CV must be under 8 MB.");
      return;
    }
    if (f.type && !CV_TYPES.includes(f.type)) {
      setError("Please upload a PDF, DOC or DOCX file.");
      return;
    }
    setFile(f);
  }

  function onDrop(e: DragEvent) {
    e.preventDefault();
    setDragOver(false);
    acceptFile(e.dataTransfer.files?.[0]);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!emailValid) {
      setError("Enter a valid email address so we can send your assessment.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.set("fullName", fullName);
      fd.set("phone", phone);
      fd.set("email", email.trim());
      fd.set("country", country);
      if (hasIdea) fd.set("hasIdea", hasIdea);
      fd.set("investmentBudget", budget);
      if (file) fd.set("cv", file);

      const res = await fetch("/api/leads", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <Paper id="free-cv-check" sx={{ p: { xs: 3, md: 4 }, borderRadius: 4, textAlign: "center" }}>
        <CheckCircleRoundedIcon sx={{ fontSize: 52, color: "success.main", mb: 1 }} />
        <Typography variant="h5" sx={{ color: "secondary.main", mb: 1 }}>
          Thank you, we have your details
        </Typography>
        <Typography sx={{ color: "text.secondary", lineHeight: 1.65 }}>
          Our team will review your profile and contact you
          {phone ? " by WhatsApp or email" : " by email"} with your free initial assessment
          and the options available to you.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      id="free-cv-check"
      component="form"
      onSubmit={submit}
      sx={{
        p: { xs: 2.5, md: 3.5 },
        borderRadius: 4,
        boxShadow: "0 24px 60px -24px rgba(20,22,28,0.35)",
        scrollMarginTop: 110,
      }}
    >
      <Typography
        variant="h5"
        sx={{ fontFamily: "var(--font-display)", color: "secondary.main", letterSpacing: "-0.01em" }}
      >
        FREE CV &amp; PROFILE CHECK
      </Typography>
      <Typography sx={{ fontSize: 14.5, color: "text.secondary", mt: 0.75, mb: 2, lineHeight: 1.55 }}>
        Free initial assessment to see whether your profile may be suitable for the Innovator
        Founder Visa.
      </Typography>

      <Stack spacing={1.5}>
        <TextField
          label="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          size="small"
          autoComplete="name"
          fullWidth
        />
        <TextField
          label="WhatsApp / Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          size="small"
          type="tel"
          autoComplete="tel"
          fullWidth
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          size="small"
          type="email"
          autoComplete="email"
          required
          fullWidth
        />
        <TextField
          label="Country of Residence"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          size="small"
          select
          fullWidth
        >
          {countryNames().map((c) => (
            <MenuItem key={c} value={c} sx={{ fontSize: 15 }}>
              {c}
            </MenuItem>
          ))}
        </TextField>

        <Box>
          <Typography sx={{ fontSize: 14, fontWeight: 700, mb: 0.75 }}>
            Do you already have a business idea?
          </Typography>
          <ToggleButtonGroup
            value={hasIdea}
            exclusive
            onChange={(_, v) => setHasIdea(v)}
            size="small"
            fullWidth
          >
            <ToggleButton value="yes" sx={{ fontWeight: 700, borderRadius: "10px 0 0 10px" }}>
              Yes
            </ToggleButton>
            <ToggleButton value="no" sx={{ fontWeight: 700, borderRadius: "0 10px 10px 0" }}>
              No
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <TextField
          label="How much are you prepared to invest in your UK business?"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          size="small"
          select
          fullWidth
        >
          {INVESTMENT_OPTIONS.map((o) => (
            <MenuItem key={o} value={o} sx={{ fontSize: 15 }}>
              {o}
            </MenuItem>
          ))}
        </TextField>

        {/* CV upload */}
        <Box
          onClick={() => fileInput.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              fileInput.current?.click();
            }
          }}
          aria-label="Upload CV: PDF, DOC or DOCX"
          sx={{
            border: "2px dashed",
            borderColor: dragOver ? "primary.main" : "divider",
            bgcolor: dragOver ? "#fbeaec" : "background.default",
            borderRadius: 3,
            p: 2,
            textAlign: "center",
            cursor: "pointer",
            transition: "border-color 0.2s, background 0.2s",
            "&:hover": { borderColor: "primary.main" },
            "&:focus-visible": { outline: "3px solid", outlineColor: "primary.light" },
          }}
        >
          <input
            ref={fileInput}
            type="file"
            hidden
            accept=".pdf,.doc,.docx"
            onChange={(e) => acceptFile(e.target.files?.[0])}
          />
          {file ? (
            <Stack direction="row" spacing={1} sx={{ alignItems: "center", justifyContent: "center" }}>
              <InsertDriveFileRoundedIcon sx={{ color: "primary.main" }} />
              <Typography sx={{ fontSize: 14.5, fontWeight: 700 }}>{file.name}</Typography>
            </Stack>
          ) : (
            <>
              <CloudUploadRoundedIcon sx={{ color: "text.secondary" }} />
              <Typography sx={{ fontSize: 14.5, fontWeight: 700 }}>Upload CV</Typography>
              <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
                Drag &amp; drop or click to upload · PDF / DOC / DOCX
              </Typography>
            </>
          )}
        </Box>

        {error && <Alert severity="error">{error}</Alert>}

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={busy}
          endIcon={busy ? <CircularProgress size={18} color="inherit" /> : <ArrowForwardRoundedIcon />}
        >
          {busy ? "Sending…" : "GET MY FREE ASSESSMENT"}
        </Button>

        {/* One-line trust strip + GDPR pointer (required at the point of CV upload). */}
        <Typography sx={{ fontSize: 12.5, color: "text.secondary", textAlign: "center" }}>
          Free review · No obligation · Secure CV upload ·{" "}
          <Box component={Link} href="/privacy-notice" sx={{ color: "primary.main" }}>
            Privacy Policy
          </Box>
        </Typography>
      </Stack>
    </Paper>
  );
}
