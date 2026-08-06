import "./env";
import { db } from "./client";
import { leads, cases } from "./schema";
import { generateTrackingRef } from "@/lib/trackingRef";

/**
 * Dev-only sample data: a few leads and one tracked case, so the admin
 * dashboard and the public tracker have something to show.
 *   npm run db:seed
 */
async function main() {
  const leadId = crypto.randomUUID();
  await db.insert(leads).values([
    {
      id: leadId,
      fullName: "Amira Hassan",
      phone: "+971 50 000 0000",
      email: "amira@example.com",
      country: "United Arab Emirates",
      hasIdea: "no",
      investmentBudget: "£25,000–£50,000",
      status: "converted",
    },
    {
      id: crypto.randomUUID(),
      fullName: "Diego Fernández",
      phone: "+52 55 0000 0000",
      email: "diego@example.com",
      country: "Mexico",
      hasIdea: "yes",
      investmentBudget: "£10,000–£25,000",
      status: "new",
    },
  ]);

  const ref = generateTrackingRef();
  const at = Math.floor(Date.now() / 1000);
  await db.insert(cases).values({
    id: crypto.randomUUID(),
    leadId,
    trackingRef: ref,
    clientName: "Amira Hassan",
    email: "amira@example.com",
    phone: "+971 50 000 0000",
    packageTier: "premium",
    caseStage: 2, // Stages 1-2 complete, Stage 3 awaiting
    caseHistory: JSON.stringify({ 0: at - 86400 * 14, 1: at - 86400 * 7 }),
    caseUpdatedAt: at - 86400 * 7,
  });

  console.log(`Seeded 2 leads + 1 case. Tracking ref: ${ref}`);
}

main().then(
  () => process.exit(0),
  (err) => {
    console.error("Seed failed:", err.message ?? err);
    process.exit(1);
  },
);
