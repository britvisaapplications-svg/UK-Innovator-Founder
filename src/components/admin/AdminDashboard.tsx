"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import type { Case, Lead, LeadStatus, PackageTier } from "@/db/schema";
import type { Stage5Outcome } from "@/lib/caseStages";
import CaseStageControl from "@/components/admin/CaseStageControl";

const LEAD_STATUS_OPTIONS: { value: LeadStatus; label: string }[] = [
  { value: "new", label: "New" },
  { value: "reviewing", label: "Reviewing" },
  { value: "contacted", label: "Contacted" },
  { value: "converted", label: "Converted" },
  { value: "closed", label: "Closed" },
];

const PACKAGE_OPTIONS: { value: PackageTier | ""; label: string }[] = [
  { value: "", label: "No package yet" },
  { value: "basic", label: "Basic" },
  { value: "standard", label: "Standard" },
  { value: "premium", label: "Premium" },
];

const fmtDate = (s?: number | null) =>
  s
    ? new Date(s * 1000).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })
    : "-";

/** Back-office dashboard: CV leads pipeline + tracked endorsement cases. */
export default function AdminDashboard({
  adminName,
  leads,
  cases,
}: {
  adminName: string;
  leads: Lead[];
  cases: Case[];
}) {
  const router = useRouter();
  const [tab, setTab] = useState(0);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <Box sx={{ flex: 1, py: 4, bgcolor: "background.default" }}>
      <Container>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", mb: 3, flexWrap: "wrap", gap: 1 }}>
          <Box>
            <Typography variant="h4" sx={{ fontSize: { xs: 24, md: 30 } }}>
              Back office
            </Typography>
            <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
              Signed in as {adminName}
            </Typography>
          </Box>
          <Button variant="outlined" color="secondary" size="small" startIcon={<LogoutRoundedIcon />} onClick={logout}>
            Sign out
          </Button>
        </Stack>

        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
          <Tab label={`CV Leads (${leads.length})`} />
          <Tab label={`Cases (${cases.length})`} />
        </Tabs>

        {tab === 0 && <LeadsPanel leads={leads} />}
        {tab === 1 && <CasesPanel cases={cases} />}
      </Container>
    </Box>
  );
}

/* -------------------------------------------------------------------- leads */

function LeadsPanel({ leads }: { leads: Lead[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState<LeadStatus | "all">("all");

  const visible = useMemo(
    () => (filter === "all" ? leads : leads.filter((l) => l.status === filter)),
    [leads, filter],
  );

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <Typography sx={{ fontSize: 13, fontWeight: 700 }}>Filter:</Typography>
        <Select size="small" value={filter} onChange={(e) => setFilter(e.target.value as LeadStatus | "all")} sx={{ minWidth: 150, fontSize: 13 }}>
          <MenuItem value="all" sx={{ fontSize: 13 }}>All statuses</MenuItem>
          {LEAD_STATUS_OPTIONS.map((o) => (
            <MenuItem key={o.value} value={o.value} sx={{ fontSize: 13 }}>{o.label}</MenuItem>
          ))}
        </Select>
      </Stack>

      {visible.length === 0 && (
        <Paper sx={{ p: 4, borderRadius: 4, textAlign: "center" }}>
          <Typography sx={{ color: "text.secondary" }}>
            No leads {filter === "all" ? "yet" : `with status "${filter}"`}. New Free CV Check
            submissions appear here.
          </Typography>
        </Paper>
      )}

      {visible.map((lead) => (
        <LeadCard key={lead.id} lead={lead} onChanged={() => router.refresh()} />
      ))}
    </Stack>
  );
}

function LeadCard({ lead, onChanged }: { lead: Lead; onChanged: () => void }) {
  const [status, setStatus] = useState<LeadStatus>(lead.status);
  const [note, setNote] = useState(lead.adminNote ?? "");
  const [savedNote, setSavedNote] = useState(lead.adminNote ?? "");
  const [pkg, setPkg] = useState<PackageTier | "">("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function patch(payload: Record<string, unknown>) {
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch(`/api/admin/leads/${lead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) throw new Error();
      return true;
    } catch {
      setMsg("Couldn't save. Try again.");
      return false;
    } finally {
      setBusy(false);
    }
  }

  async function convert() {
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch("/api/admin/cases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId: lead.id, packageTier: pkg || undefined }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) throw new Error();
      setMsg(`Case opened: ${data.trackingRef}`);
      setStatus("converted");
      onChanged();
    } catch {
      setMsg("Couldn't open a case. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Paper sx={{ p: 2.5, borderRadius: 4 }}>
      <Stack direction={{ xs: "column", md: "row" }} spacing={1} sx={{ justifyContent: "space-between", alignItems: { md: "center" } }}>
        <Box>
          <Typography sx={{ fontWeight: 800, fontSize: 16 }}>
            {lead.fullName || "(no name)"}{" "}
            <Typography component="span" sx={{ color: "text.secondary", fontSize: 13.5 }}>
              · {lead.email}
              {lead.phone ? ` · ${lead.phone}` : ""}
            </Typography>
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 0.75, flexWrap: "wrap", rowGap: 0.75 }}>
            {lead.country && <Chip size="small" label={lead.country} sx={{ height: 22 }} />}
            {lead.hasIdea && (
              <Chip
                size="small"
                label={lead.hasIdea === "yes" ? "Has a business idea" : "Needs idea suggestions"}
                color={lead.hasIdea === "yes" ? "success" : "info"}
                variant="outlined"
                sx={{ height: 22 }}
              />
            )}
            {lead.investmentBudget && <Chip size="small" label={lead.investmentBudget} sx={{ height: 22 }} />}
            <Chip size="small" label={`Received ${fmtDate(lead.createdAt)}`} variant="outlined" sx={{ height: 22 }} />
          </Stack>
        </Box>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center", flexShrink: 0 }}>
          {lead.cvUrl ? (
            <Button
              size="small"
              variant="outlined"
              startIcon={<AttachFileRoundedIcon />}
              href={`/api/admin/file?url=${encodeURIComponent(lead.cvUrl)}`}
              target="_blank"
              rel="noopener"
            >
              CV
            </Button>
          ) : (
            <Chip size="small" label={lead.cvFileName ? `CV not stored (${lead.cvFileName})` : "No CV"} variant="outlined" sx={{ height: 24 }} />
          )}
          <Select
            size="small"
            value={status}
            disabled={busy}
            onChange={async (e) => {
              const next = e.target.value as LeadStatus;
              const prev = status;
              setStatus(next);
              if (!(await patch({ status: next }))) setStatus(prev);
            }}
            sx={{ fontSize: 13, fontWeight: 600, minWidth: 130 }}
          >
            {LEAD_STATUS_OPTIONS.map((o) => (
              <MenuItem key={o.value} value={o.value} sx={{ fontSize: 13 }}>{o.label}</MenuItem>
            ))}
          </Select>
        </Stack>
      </Stack>

      <Divider sx={{ my: 1.5 }} />

      <Stack direction={{ xs: "column", md: "row" }} spacing={1.5} sx={{ alignItems: { md: "flex-start" } }}>
        <Box sx={{ flex: 1, width: "100%" }}>
          <TextField
            size="small"
            fullWidth
            multiline
            minRows={1}
            value={note}
            disabled={busy}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Internal note (not shown to the client)…"
          />
          <Button
            size="small"
            variant="outlined"
            sx={{ mt: 0.75 }}
            disabled={busy || note === savedNote}
            onClick={async () => {
              if (await patch({ adminNote: note })) {
                setSavedNote(note);
                setMsg("Note saved.");
              }
            }}
          >
            Save note
          </Button>
        </Box>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center", flexShrink: 0 }}>
          <Select
            size="small"
            value={pkg}
            disabled={busy}
            onChange={(e) => setPkg(e.target.value as PackageTier | "")}
            displayEmpty
            sx={{ fontSize: 13, minWidth: 150 }}
          >
            {PACKAGE_OPTIONS.map((o) => (
              <MenuItem key={o.value} value={o.value} sx={{ fontSize: 13 }}>{o.label}</MenuItem>
            ))}
          </Select>
          <Button
            size="small"
            variant="contained"
            disabled={busy}
            startIcon={busy ? <CircularProgress size={14} color="inherit" /> : <PersonAddAltRoundedIcon />}
            onClick={convert}
          >
            Open case
          </Button>
        </Stack>
      </Stack>
      {msg && (
        <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: msg.startsWith("Couldn't") ? "error.main" : "success.main", mt: 1 }}>
          {msg}
        </Typography>
      )}
    </Paper>
  );
}

/* -------------------------------------------------------------------- cases */

function CasesPanel({ cases }: { cases: Case[] }) {
  const router = useRouter();
  const [showNew, setShowNew] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pkg, setPkg] = useState<PackageTier | "">("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function createCase() {
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch("/api/admin/cases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientName: name, email, phone, packageTier: pkg || undefined }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) throw new Error(data?.error);
      setMsg(`Case opened: ${data.trackingRef}`);
      setName("");
      setEmail("");
      setPhone("");
      setPkg("");
      router.refresh();
    } catch (err) {
      setMsg(err instanceof Error && err.message ? err.message : "Couldn't create the case.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Stack spacing={2}>
      <Box>
        <Button size="small" variant="outlined" startIcon={<AddRoundedIcon />} onClick={() => setShowNew((v) => !v)}>
          {showNew ? "Hide new-case form" : "New case (manual)"}
        </Button>
      </Box>

      {showNew && (
        <Paper sx={{ p: 2.5, borderRadius: 4 }}>
          <Typography sx={{ fontWeight: 800, mb: 1.5 }}>Open a case manually</Typography>
          <Stack direction={{ xs: "column", md: "row" }} spacing={1.5}>
            <TextField size="small" label="Client name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
            <TextField size="small" label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
            <TextField size="small" label="Phone (optional)" value={phone} onChange={(e) => setPhone(e.target.value)} fullWidth />
            <Select
              size="small"
              value={pkg}
              onChange={(e) => setPkg(e.target.value as PackageTier | "")}
              displayEmpty
              sx={{ minWidth: 160, fontSize: 13 }}
            >
              {PACKAGE_OPTIONS.map((o) => (
                <MenuItem key={o.value} value={o.value} sx={{ fontSize: 13 }}>{o.label}</MenuItem>
              ))}
            </Select>
            <Button
              variant="contained"
              disabled={busy || !name || !email}
              onClick={createCase}
              startIcon={busy ? <CircularProgress size={14} color="inherit" /> : <AddRoundedIcon />}
              sx={{ flexShrink: 0 }}
            >
              Create
            </Button>
          </Stack>
          {msg && (
            <Typography sx={{ fontSize: 12.5, fontWeight: 700, mt: 1, color: msg.startsWith("Case opened") ? "success.main" : "error.main" }}>
              {msg}
            </Typography>
          )}
        </Paper>
      )}

      {cases.length === 0 && (
        <Paper sx={{ p: 4, borderRadius: 4, textAlign: "center" }}>
          <Typography sx={{ color: "text.secondary" }}>
            No cases yet. Convert a lead, or open a case manually.
          </Typography>
        </Paper>
      )}

      {cases.map((c) => (
        <Paper key={c.id} sx={{ p: 2.5, borderRadius: 4 }}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={1} sx={{ justifyContent: "space-between", alignItems: { md: "center" } }}>
            <Box>
              <Typography sx={{ fontWeight: 800, fontSize: 16 }}>
                {c.clientName}{" "}
                <Typography component="span" sx={{ color: "text.secondary", fontSize: 13.5 }}>
                  · {c.email}
                  {c.phone ? ` · ${c.phone}` : ""}
                </Typography>
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 0.75, flexWrap: "wrap", rowGap: 0.75 }}>
                {c.packageTier && (
                  <Chip
                    size="small"
                    label={c.packageTier.toUpperCase()}
                    color={c.packageTier === "premium" ? "primary" : "default"}
                    sx={{ height: 22, fontWeight: 700 }}
                  />
                )}
                <Chip size="small" label={`Opened ${fmtDate(c.createdAt)}`} variant="outlined" sx={{ height: 22 }} />
              </Stack>
            </Box>
          </Stack>
          <CaseStageControl
            caseId={c.id}
            trackingRef={c.trackingRef}
            caseStage={c.caseStage}
            stage5Outcome={(c.stage5Outcome as Stage5Outcome | null) ?? null}
            adminNote={c.adminNote}
          />
        </Paper>
      ))}
    </Stack>
  );
}
