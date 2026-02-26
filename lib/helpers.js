export const fmt = (n) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

export const statusColor = (s) =>
  ({
    Active:   { bg: "#d6ede4", color: "#1a6645" },
    Lead:     { bg: "#fef3c7", color: "#92400e" },
    Inactive: { bg: "#f0f0ee", color: "#6b7280" },
  }[s] || { bg: "#f0f0ee", color: "#6b7280" });

export const stageColor = (s) =>
  ({
    Discovery:   { bg: "#e8f4fd", color: "#1d6fa4" },
    Proposal:    { bg: "#fef3c7", color: "#92400e" },
    "In Progress": { bg: "#ede9fe", color: "#5b21b6" },
    Won:         { bg: "#d6ede4", color: "#1a6645" },
    Lost:        { bg: "#fee2e2", color: "#991b1b" },
  }[s] || { bg: "#f0f0ee", color: "#6b7280" });

const AVATAR_COLORS = ["#c8dde3", "#d6ede4", "#fef3c7", "#ede9fe", "#fee2e2", "#fde8d0"];
export const avatarColor = (name) =>
  AVATAR_COLORS[(name?.charCodeAt(0) || 0) % AVATAR_COLORS.length];

export const initials = (name = "") =>
  name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
