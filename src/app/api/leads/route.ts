import { NextResponse, type NextRequest } from "next/server";
import { put } from "@vercel/blob";
import { createLead } from "@/db/queries";

/**
 * POST /api/leads, the Free CV & Profile Check form.
 *
 * Multipart form data: fullName, phone, email (required), country, hasIdea,
 * investmentBudget, and an optional `cv` file (PDF/DOC/DOCX, ≤8 MB).
 *
 * CVs are personal data: stored in Vercel Blob with access:"private" and only
 * reachable through the admin-gated /api/admin/file route. If Blob isn't
 * configured yet the lead is still saved (without the file) so no enquiry is
 * ever lost.
 */
export const runtime = "nodejs";

const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const str = (v: FormDataEntryValue | null, max = 300): string | null => {
  if (typeof v !== "string") return null;
  const t = v.trim().slice(0, max);
  return t || null;
};

export async function POST(req: NextRequest) {
  const form = await req.formData().catch(() => null);
  if (!form) {
    return NextResponse.json({ ok: false, error: "Invalid form data." }, { status: 400 });
  }

  const email = str(form.get("email"));
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "A valid email address is required." },
      { status: 400 },
    );
  }

  const file = form.get("cv");
  let cvUrl: string | null = null;
  let cvFileName: string | null = null;

  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ ok: false, error: "CV must be under 8 MB." }, { status: 400 });
    }
    if (file.type && !ALLOWED.includes(file.type)) {
      return NextResponse.json(
        { ok: false, error: "Upload a PDF, DOC or DOCX file." },
        { status: 400 },
      );
    }
    cvFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-80);

    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const blob = await put(`cvs/${Date.now()}-${cvFileName}`, file, {
          access: "private",
          addRandomSuffix: true,
        });
        cvUrl = blob.url;
      } catch (err) {
        console.error("CV upload failed:", err);
        // Keep the lead, the team can request the CV again by email.
      }
    } else {
      console.warn("BLOB_READ_WRITE_TOKEN not set, lead saved without CV file.");
    }
  }

  try {
    const lead = await createLead({
      fullName: str(form.get("fullName")),
      phone: str(form.get("phone"), 60),
      email,
      country: str(form.get("country"), 80),
      hasIdea: str(form.get("hasIdea"), 5),
      investmentBudget: str(form.get("investmentBudget"), 40),
      cvUrl,
      cvFileName,
    });
    return NextResponse.json({ ok: true, id: lead.id });
  } catch (err) {
    console.error("Lead insert failed:", err);
    return NextResponse.json(
      { ok: false, error: "We couldn't save your details. Please try again." },
      { status: 500 },
    );
  }
}
