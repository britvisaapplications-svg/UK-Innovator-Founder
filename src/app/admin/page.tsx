import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin";
import { listCases, listLeads } from "@/db/queries";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const metadata: Metadata = {
  title: "Back office",
  robots: { index: false, follow: false },
};

// Always reflect the latest leads/cases, never cache the back office.
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const admin = await requireAdmin({ redirectOnFail: true });
  const [leads, cases] = await Promise.all([listLeads(), listCases()]);
  return <AdminDashboard adminName={admin!.name} leads={leads} cases={cases} />;
}
