export const STAGES = ["Discovery", "Proposal", "In Progress", "Won", "Lost"];
export const STATUS_OPTS = ["Lead", "Active", "Inactive"];

export const SEED_CLIENTS = [
  { id: 1, name: "Aria Nakamura", company: "Bloom Studio", email: "aria@bloomstudio.io", phone: "+1 415 555 0192", value: 8400, status: "Active", tags: ["Design", "Retainer"], avatar: "AN" },
  { id: 2, name: "Felix Oduya", company: "Crest Capital", email: "felix@crestcap.com", phone: "+1 212 555 0847", value: 14500, status: "Active", tags: ["Dev", "Enterprise"], avatar: "FO" },
  { id: 3, name: "Mara Engström", company: "Nordlight AB", email: "mara@nordlight.se", phone: "+46 70 555 1234", value: 3200, status: "Lead", tags: ["Copywriting"], avatar: "ME" },
  { id: 4, name: "James Tillman", company: "Horizon Labs", email: "jtillman@horizonlabs.com", phone: "+1 650 555 0034", value: 6750, status: "Inactive", tags: ["Dev", "Short-term"], avatar: "JT" },
  { id: 5, name: "Priya Anand", company: "Sunpath Media", email: "priya@sunpath.in", phone: "+91 98765 43210", value: 2100, status: "Lead", tags: ["Social"], avatar: "PA" },
];

export const SEED_DEALS = [
  { id: 1, title: "Brand Identity Redesign", clientId: 1, value: 5500, stage: "Proposal", dueDate: "2025-03-15", notes: "Waiting on feedback for v2 mockups" },
  { id: 2, title: "API Integration Sprint", clientId: 2, value: 9200, stage: "In Progress", dueDate: "2025-04-01", notes: "Backend endpoints delivered, frontend pending" },
  { id: 3, title: "Landing Page Copy", clientId: 3, value: 1800, stage: "Discovery", dueDate: "2025-03-22", notes: "Kick-off call scheduled for Friday" },
  { id: 4, title: "Dashboard UI Build", clientId: 2, value: 7400, stage: "Won", dueDate: "2025-02-28", notes: "Final invoice sent" },
  { id: 5, title: "Email Campaign Series", clientId: 5, value: 2100, stage: "Proposal", dueDate: "2025-03-30", notes: "Draft sent, awaiting approval" },
  { id: 6, title: "Mobile App Audit", clientId: 4, value: 3200, stage: "Discovery", dueDate: "2025-03-18", notes: "Preliminary findings compiled" },
];

export const SEED_NOTES = [
  { id: 1, clientId: 1, date: "2025-03-05", text: "Aria mentioned expanding scope to include motion design. Follow up next week." },
  { id: 2, clientId: 2, date: "2025-03-04", text: "Felix approved Q2 retainer. Contract sent via DocuSign." },
  { id: 3, clientId: 3, date: "2025-03-03", text: "Initial discovery call — Mara wants tone to feel 'calm but authoritative'." },
];
