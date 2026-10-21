import type { Metadata } from "next";
import { AccessPage } from "@/components/access-page";
import { business } from "@/lib/site";

export const metadata: Metadata = {
  title: "Partner access",
  description:
    "The Isak Fire Protection portal for subcontractors and trade partners is coming soon. Contact the team for work orders and payment status.",
  alternates: { canonical: "/partners" },
};

const features = [
  {
    title: "Work orders and bid invitations",
    body: "New project assignments, open bid opportunities and the status of every job from award to completion.",
  },
  {
    title: "Insurance and compliance",
    body: "Certificates of insurance, W-9, licence and certification documents, with renewal dates.",
  },
  {
    title: "Project communication",
    body: "Messages with project managers, field updates, photos, drawings and close-out documents.",
  },
  { title: "Invoicing and payment status", body: "Invoice submission, approval status and payment schedules." },
] as const;

export default function PartnersPage() {
  return (
    <AccessPage
      stamp="Partner access · Subcontractors & trade partners"
      title="Built for trade partners."
      lede="A portal for approved subcontractors and trade partners is being set up. Until then, contact the team directly."
      features={features}
      statusUrl={business.partnersUrl}
    />
  );
}
