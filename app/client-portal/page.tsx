import type { Metadata } from "next";
import { AccessPage } from "@/components/access-page";
import { business } from "@/lib/site";

export const metadata: Metadata = {
  title: "Client access",
  description:
    "The Isak Fire Protection client portal is coming soon. Contact the team for reports, schedules and billing.",
  alternates: { canonical: "/client-portal" },
};

const features = [
  {
    title: "Reports and compliance documents",
    body: "Inspection reports, certificates, permits and documentation for your local authority.",
  },
  { title: "Service schedules", body: "Upcoming inspections, testing and maintenance across all your facilities." },
  { title: "Direct communication", body: "Message your service team, request quotes and follow open work orders." },
  { title: "Billing and payments", body: "Invoices, estimates and payment history in one place." },
] as const;

export default function ClientPortalPage() {
  return (
    <AccessPage
      stamp="Client access"
      title="Your records, in one place."
      lede="A secure client portal for Isak customers is being set up. In the meantime, the team is a phone call away."
      features={features}
      statusUrl={business.portalUrl}
    />
  );
}
