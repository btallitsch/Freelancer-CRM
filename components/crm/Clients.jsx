import { fmt, avatarColor } from "../../lib/helpers";
import { t } from "../../lib/styles";
import { StatusBadge } from "./ui";

export default function Clients({ clients, search, setSearch, onSelect, onAdd, deals }) {
  return (
    <div style={t.page}>
      <header style={t.pageHeader}>
        <div>
          <p style={t.pageEyebrow}>Relationships</p>
          <h1 style={t.pageTitle}>Clients</h1>
        </div>
        <div style={t.headerActions}>
          <input
            style={styles.searchInput}
            placeholder="Search clients…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button style={t.primaryBtn} onClick={onAdd}>+ Add Client</button>
        </div>
      </header>

      <div style={styles.grid}>
        {clients.map((c) => {
          const clientDeals  = deals.filter((d) => d.clientId === c.id);
          const openDeals    = clientDeals.filter((d) => !["Won", "Lost"].includes(d.stage)).length;

          return (
            <div key={c.id} style={styles.card} className="client-card" onClick={() => onSelect(c)}>
              {/* Top row */}
              <div style={styles.cardTop}>
                <div style={{ ...styles.avatar, background: avatarColor(c.name) }}>{c.avatar}</div>
                <div style={{ flex: 1 }}>
                  <p style={styles.name}>{c.name}</p>
                  <p style={styles.company}>{c.company}</p>
                </div>
                <StatusBadge status={c.status} />
              </div>

              {/* Email */}
              <p style={styles.meta}>✉ {c.email}</p>

              {/* Footer */}
              <div style={styles.footer}>
                <span style={styles.meta}>{openDeals} open deal{openDeals !== 1 ? "s" : ""}</span>
                <span style={styles.value}>{fmt(c.value)}</span>
              </div>

              {/* Tags */}
              {c.tags?.length > 0 && (
                <div style={t.tagsRow}>
                  {c.tags.map((tag) => <span key={tag} style={t.tag}>{tag}</span>)}
                </div>
              )}
            </div>
          );
        })}

        {clients.length === 0 && (
          <p style={{ color: "#9ca3af", gridColumn: "1/-1", textAlign: "center", padding: 40 }}>
            No clients found.
          </p>
        )}
      </div>
    </div>
  );
}

const styles = {
  searchInput: { padding: "9px 14px", borderRadius: 8, border: "1.5px solid #ddd", fontSize: 14, background: "#fff", outline: "none", width: 220 },
  grid:    { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 },
  card:    { background: "#fff", borderRadius: 12, padding: 20, border: "1px solid #ece9e2", cursor: "pointer", transition: "all 0.15s" },
  cardTop: { display: "flex", alignItems: "center", gap: 12, marginBottom: 12 },
  avatar:  { width: 40, height: 40, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#374151", flexShrink: 0 },
  name:    { fontWeight: 700, fontSize: 15, margin: 0, color: "#1a1a18" },
  company: { fontSize: 12, color: "#9ca3af", margin: "2px 0 0" },
  meta:    { fontSize: 12, color: "#9ca3af", marginBottom: 8 },
  footer:  { display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 10, borderTop: "1px solid #f5f3ee", marginTop: 4 },
  value:   { fontWeight: 600, color: "#1a6645", fontSize: 14 },
};
