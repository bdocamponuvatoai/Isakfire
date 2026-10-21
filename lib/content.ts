// Content restated from isakfire.com (reviewed 2026-10-22). Technical intervals,
// certification claims and response-time promises from the source are left out
// until the client confirms them; see docs/content-sources.md.

export type ServiceGroup = "Suppression" | "Detection" | "System care";

export type Service = {
  slug: string;
  name: string;
  group: ServiceGroup;
  /** Code reference the source site associates with the service. */
  standard?: string;
  intro: string;
  description: string;
  detail: string;
  scope: readonly string[];
};

export const serviceGroups: readonly ServiceGroup[] = ["Suppression", "Detection", "System care"];

export const services: readonly Service[] = [
  {
    slug: "fire-sprinklers",
    name: "Fire sprinklers",
    group: "Suppression",
    standard: "NFPA 13",
    intro: "Protection built into the building.",
    description: "Wet, dry, pre-action and ESFR sprinkler systems: designed, installed and maintained.",
    detail:
      "From new construction to an occupied building, the system has to fit the structure and how it’s used. Isak coordinates design, installation and the ongoing inspection and service of water-based fire protection.",
    scope: [
      "Wet-pipe and dry-pipe systems",
      "Pre-action and ESFR systems",
      "New construction, retrofits and expansions",
      "Inspection, testing and maintenance",
    ],
  },
  {
    slug: "fire-alarms",
    name: "Fire alarms & detection",
    group: "Detection",
    standard: "NFPA 72",
    intro: "Awareness starts here.",
    description: "Addressable and conventional fire alarm, detection and voice evacuation systems.",
    detail:
      "Detection, notification and service work best as one coordinated system. Isak installs fire alarm systems and carries out the testing, reporting and repairs that follow.",
    scope: [
      "Addressable and conventional systems",
      "Detection and notification devices",
      "Voice evacuation systems",
      "Testing, reporting and repairs",
    ],
  },
  {
    slug: "kitchen-suppression",
    name: "Kitchen suppression",
    group: "Suppression",
    standard: "UL 300",
    intro: "Keep the cooking line covered.",
    description: "Wet chemical suppression for restaurants, hotels and commercial food service.",
    detail:
      "Cooking equipment and suppression coverage have to match. Isak installs and services kitchen systems, and reviews coverage whenever appliances move or the cooking line changes.",
    scope: [
      "Wet chemical suppression systems",
      "Installation and service",
      "Cooking-line coverage reviews",
      "Inspection documentation",
    ],
  },
  {
    slug: "fire-extinguishers",
    name: "Fire extinguishers",
    group: "Suppression",
    standard: "NFPA 10",
    intro: "The first line, kept ready.",
    description: "Extinguisher supply, inspection, recharging and hydrostatic testing.",
    detail:
      "Portable extinguishers belong in the same service plan as the rest of your systems. The team can review equipment needs, inspection findings and service options for the extinguishers on site.",
    scope: ["Equipment supply", "Inspection and condition checks", "Recharging and maintenance", "Hydrostatic testing"],
  },
  {
    slug: "systems-monitoring",
    name: "Systems monitoring",
    group: "Detection",
    intro: "Keep critical signals connected.",
    description: "Central station monitoring for fire alarm, sprinkler waterflow and tamper signals.",
    detail:
      "An alarm panel is one link in a longer response chain. Isak provides central station monitoring and signal supervision for a single building or a whole portfolio.",
    scope: [
      "Fire alarm signal monitoring",
      "Sprinkler waterflow signals",
      "Supervisory and tamper devices",
      "Portfolio-wide coordination",
    ],
  },
  {
    slug: "fire-pumps",
    name: "Fire pumps",
    group: "System care",
    standard: "NFPA 20",
    intro: "The system behind the system.",
    description: "Electric and diesel fire pump installation, flow testing and service.",
    detail:
      "Many water-based systems depend on a fire pump to reach design pressure. Isak installs electric and diesel pumps and plans flow testing and service around your equipment.",
    scope: ["Electric fire pumps", "Diesel fire pumps", "Flow testing", "Installation and service planning"],
  },
  {
    slug: "backflow-devices",
    name: "Backflow devices",
    group: "System care",
    intro: "Care for the connection.",
    description: "RPZ and DCVA installation, testing and reporting to local water authorities.",
    detail:
      "Backflow preventers protect the public water supply from your fire protection system. Isak installs and tests devices and handles the municipal reporting.",
    scope: ["RPZ and DCVA devices", "Installation and replacement", "Scheduled testing", "Municipal reporting"],
  },
  {
    slug: "emergency-lighting",
    name: "Emergency & exit lighting",
    group: "System care",
    standard: "NFPA 101",
    intro: "Keep the way out lit.",
    description: "Installation, testing and records for emergency lighting and exit signs.",
    detail:
      "Emergency lighting has to work during the one outage that matters. Isak installs fixtures and exit signs, carries out operational and discharge testing, and keeps the records.",
    scope: [
      "Emergency lighting installation",
      "Exit sign installation",
      "Operational and discharge testing",
      "Service records and follow-up",
    ],
  },
  {
    slug: "fire-suppression",
    name: "Special hazard suppression",
    group: "Suppression",
    intro: "Special hazards, considered.",
    description: "Clean agent, CO₂, foam and inert gas systems for specialised environments.",
    detail:
      "Some spaces can’t be protected with water. Isak works on special hazard applications, including data centres and industrial facilities, to select and maintain an appropriate suppression system.",
    scope: [
      "Clean agent systems",
      "CO₂ and inert gas systems",
      "Foam systems",
      "Data centre and industrial applications",
    ],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export const sectors = ["Commercial", "Industrial", "Residential"] as const;

export type Faq = { group: string; q: string; a: string };

export const faqs: readonly Faq[] = [
  {
    group: "Working with Isak",
    q: "What can Isak Fire Protection help with?",
    a: "Commercial, industrial and residential fire protection across nine disciplines: sprinklers, alarms and detection, kitchen suppression, special hazard suppression, extinguishers, monitoring, fire pumps, backflow devices, and emergency and exit lighting. Availability varies by location, so confirm it for your property.",
  },
  {
    group: "Working with Isak",
    q: "Which areas do you serve?",
    a: "Illinois, Michigan, Ohio, Indiana, Wisconsin and Ontario, from offices in Chicago (headquarters), Toronto, Detroit, Dayton, Indianapolis and Milwaukee. Confirm coverage for your address with the local team.",
  },
  {
    group: "Working with Isak",
    q: "How do I request a quote?",
    a: "Call (312) 445-7787, call toll free on (833) 306-8200, or email sales@isakfire.com. You can also use the quote planner on this site to put your project details together and open them as an email draft.",
  },
  {
    group: "Working with Isak",
    q: "What are your office hours?",
    a: "Monday to Friday, 8:00 AM to 4:00 PM.",
  },
  {
    group: "Inspection & maintenance",
    q: "How often do my systems need to be inspected?",
    a: "It depends on the system, the component, the code edition your jurisdiction has adopted, the manufacturer and your local authority. Ask the team to review what applies to your building and set a schedule around it.",
  },
  {
    group: "Inspection & maintenance",
    q: "What is NFPA 25?",
    a: "NFPA 25 is the standard for inspecting, testing and maintaining water-based fire protection systems, such as wet-pipe, dry-pipe, pre-action and deluge sprinklers. Your authority having jurisdiction decides which edition applies.",
  },
  {
    group: "Inspection & maintenance",
    q: "What happens if an inspection finds a deficiency?",
    a: "Isak documents each deficiency and provides a corrective action plan, and can carry out the repairs. How quickly it must be fixed depends on the deficiency and on local requirements.",
  },
  {
    group: "Inspection & maintenance",
    q: "How long does an inspection take?",
    a: "It depends on the building, the size of the system, the number of devices and access. Inspections can be scheduled during or after business hours.",
  },
  {
    group: "Inspection & maintenance",
    q: "Will I receive inspection records?",
    a: "Yes. Isak provides a signed certificate of inspection and a detailed report listing each device tested, the method, the result and any deficiencies, for your insurance and authority records.",
  },
  {
    group: "Installation & projects",
    q: "Do you work on new construction and retrofits?",
    a: "Yes: new construction, existing-building retrofits, system expansions and tenant improvements. Isak works alongside architects and general contractors, or as the prime fire protection contractor.",
  },
  {
    group: "Installation & projects",
    q: "How is an installation schedule set?",
    a: "Building size, system complexity, permitting and access all shape the schedule. Isak reviews the project and agrees a detailed schedule with you before work starts.",
  },
  {
    group: "Installation & projects",
    q: "Can work happen while my business stays open?",
    a: "Usually, yes. Phased shutdowns, prefabricated assemblies and agreed work windows let many hotels, restaurants and retailers keep operating. Raise occupied-building requirements early so the team can plan for them.",
  },
  {
    group: "Installation & projects",
    q: "Do you handle permits and the authority having jurisdiction?",
    a: "Yes. Isak handles permitting, plan review submissions and coordination with the authority having jurisdiction. Your proposal sets out exactly who is responsible for what.",
  },
  {
    group: "Kitchen systems",
    q: "How often should kitchen suppression be serviced?",
    a: "Service intervals depend on the system, the manufacturer, applicable standards and your local authority. Ask the team to confirm the schedule for your kitchen, and keep the service records on hand.",
  },
  {
    group: "Kitchen systems",
    q: "Does moving or adding cooking equipment affect my system?",
    a: "Yes. Appliance positions decide where the nozzles need to be. Have the coverage reviewed and the design updated before you change the cooking line.",
  },
  {
    group: "Kitchen systems",
    q: "What is a UL 300 system?",
    a: "UL 300 is the fire-test standard for systems protecting commercial cooking equipment, including the wet chemical systems used with modern high-efficiency appliances. Ask your system provider how it applies to your kitchen.",
  },
  {
    group: "Accounts & portfolios",
    q: "Do you offer recurring inspection programs?",
    a: "Yes. Isak offers annual agreements covering the inspection cycles your systems require. Discuss the systems included, reporting, pricing and terms with the team.",
  },
  {
    group: "Accounts & portfolios",
    q: "How do I pay an invoice?",
    a: "Use the Pay an invoice link, which opens Isak’s secure Stripe payment page. Check your invoice details before paying. This website never collects card or bank details itself.",
  },
  {
    group: "Accounts & portfolios",
    q: "Do you work with property management companies?",
    a: "Yes. Much of Isak’s work is with property managers, facility management firms and REITs, with consolidated invoicing, portfolio-wide reporting and a dedicated account contact.",
  },
];

export const faqGroups = [...new Set(faqs.map((faq) => faq.group))];

export type Insight = { title: string; category: "Code update" | "Fire safety" | "Company news"; date: string };

// Titles exactly as published on isakfire.com/news.html. Full articles stay there.
export const insights: readonly Insight[] = [
  {
    title: "NFPA 13 2025 Edition: Every Change That Affects Your Building",
    category: "Code update",
    date: "March 2026",
  },
  {
    title: "Fire Alarm Inspection Reports: What NFPA 72 Actually Requires and Why Most Reports Fall Short",
    category: "Fire safety",
    date: "February 2026",
  },
  {
    title: "Five Sprinkler System Failures Nobody Discusses Until After the Fire",
    category: "Fire safety",
    date: "January 2026",
  },
  {
    title:
      "Isak Fire Protection Expands to Ontario, Canada: What Building Owners Need to Know About Cross-Border Fire Protection Licensing",
    category: "Company news",
    date: "December 2025",
  },
  {
    title: "The Compliance-Protection Gap in Commercial Kitchen Fire Suppression",
    category: "Fire safety",
    date: "November 2025",
  },
  {
    title: "NFPA 25: A Building Owner’s Complete Guide to Water-Based Fire Protection System Maintenance",
    category: "Fire safety",
    date: "October 2025",
  },
  {
    title: "NFPA 72 2025 Edition: The Cybersecurity Requirement, the Voice Evacuation Changes, and Everything Else",
    category: "Code update",
    date: "September 2025",
  },
  {
    title:
      "Backflow Prevention for Fire Suppression Systems: The Annual Requirement Most Building Owners Discover Too Late",
    category: "Fire safety",
    date: "August 2025",
  },
  {
    title: "Emergency and Exit Lighting: Why the System That Must Work in a Blackout Is the One Most Often Neglected",
    category: "Fire safety",
    date: "July 2025",
  },
  {
    title: "Fire Pump Testing Under NFPA 20: A Complete Technical Guide for Facility Managers",
    category: "Fire safety",
    date: "June 2025",
  },
  {
    title: "Wisconsin and Indiana 2021 IFC Adoptions: A Practical Compliance Comparison for Multi-State Operators",
    category: "Code update",
    date: "May 2025",
  },
  {
    title: "Illinois 2024 IFC Adoption: A Complete Compliance Guide for Building Owners and Facility Managers",
    category: "Code update",
    date: "April 2025",
  },
];

export const insightCategories = ["Code update", "Fire safety", "Company news"] as const;

export type Career = { title: string; location: string; duties: readonly string[]; requirements: readonly string[] };

// Roles as listed on isakfire.com/careers.html. Availability must be confirmed.
export const careers: readonly Career[] = [
  {
    title: "Fire Sprinkler Fitter",
    location: "Chicago, IL",
    duties: [
      "Install, test and service wet-pipe, dry-pipe, pre-action and deluge sprinkler systems",
      "Read and interpret construction drawings and NFPA 13 design documents",
      "Coordinate with general contractors and inspectors on job sites",
      "Complete daily field documentation and deficiency reports",
    ],
    requirements: [
      "2+ years of fire sprinkler installation experience",
      "Ability to read fire protection drawings",
      "Valid driver’s license with a clean record",
      "Able to work at heights and in confined spaces",
    ],
  },
  {
    title: "Fire Alarm Technician",
    location: "Chicago, IL / Detroit, MI",
    duties: [
      "Install, program, test and inspect addressable and conventional fire alarm systems",
      "Service and repair panels from major manufacturers",
      "Perform NFPA 72 annual inspections and issue certificates of inspection",
      "Troubleshoot faults and report findings to clients and supervisors",
    ],
    requirements: [
      "2+ years of fire alarm installation and service experience",
      "Experience with major fire alarm panel manufacturers",
      "Valid driver’s license with a clean record",
      "Strong written communication for inspection reporting",
    ],
  },
  {
    title: "Kitchen Suppression Technician",
    location: "Chicago, IL / Milwaukee, WI",
    duties: [
      "Install, inspect and service UL 300 wet chemical kitchen suppression systems",
      "Perform semi-annual inspections to NFPA 96",
      "Verify nozzle coverage against the current cooking equipment layout",
      "Recharge and maintain system components, and complete inspection records",
    ],
    requirements: [
      "1+ year of kitchen suppression or fire protection experience",
      "Familiarity with UL 300 systems",
      "Valid driver’s license with a clean record",
      "Able to work flexible hours around restaurant operations",
    ],
  },
  {
    title: "Fire Protection Inspector (NFPA 25)",
    location: "Multiple locations",
    duties: [
      "Conduct NFPA 25 inspections of water-based suppression systems",
      "Perform main drain flow tests, trip tests and tamper and flow device checks",
      "Document findings in accurate deficiency reports",
      "Coordinate remediation with installation teams",
    ],
    requirements: [
      "3+ years of fire sprinkler inspection experience",
      "Strong knowledge of NFPA 13, 14, 20 and 25",
      "Proficient with inspection reporting software",
      "Excellent organisation and client communication",
    ],
  },
];

export const lifecycle = [
  {
    step: "01",
    title: "Plan",
    body: "Design, permitting, plan review and coordination with your architect, general contractor and local authority.",
  },
  {
    step: "02",
    title: "Install",
    body: "New construction, retrofits, expansions and tenant improvements, phased around occupied buildings where needed.",
  },
  {
    step: "03",
    title: "Inspect & maintain",
    body: "Scheduled inspection and testing, signed certificates, itemised reports and a corrective plan for every deficiency.",
  },
] as const;
