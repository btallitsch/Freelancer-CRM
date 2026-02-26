import { fmt } from "../../lib/helpers";
import { t } from "../../lib/styles";
import { StatusBadge, StageBadge } from "./ui";

export default function ClientDetail({
  client, deals, notes,
  onBack, onEdit, onDelete,
  onAddDeal, onAddNote,
  onDeleteDeal, onDeleteNote,
}) {
  const clientDeals = deals.filter((d) => d.clientId === client.id);
  const clientNotes = notes.filter((n) => n.clientId === client.id);

  return (
    <div style={t.page}>
      <header style={t.pageHeader}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button style={t.backBtn} onClick={onBack}>← Back</button>
          <div>
            <p style={t.pageEyebrow}>{client.company}</p>
            <h1 style={t.pageTitle}>{client.name}</h1>
          </div>
        </div>
        <div style={t.headerActions}>
          <button style={t.secondaryBtn} onClick={() => onEdit(client)}>Edit</button>
          <button style={t.dangerBtn}    onClick={() => onDelete(client.id)}>Delete</button>
        </div>
      </header>

      <div style={styles.grid}>
        {/* Contact Info */}
        <div style={t.card}>
          <h3 style={t.sectionTitle}>Contact Info</h3>
          <div style={styles.infoRows}>
            {[
              ["Email",  client.email],
              ["Phone",  client.phone],
              ["Value",  fmt(client.value)],
            ].map(([label, val]) => (
              <div key={label} style={styles.infoRow}>
                <span style={styles.infoLabel}>{label}</span>
                <span style={styles.infoValue}>{val}</span>
              </div>
            ))}
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Status</span>
              <StatusBadge status={client.status} />
            </div>
            {client.tags?.length > 0 && (
              <div style={{ ...styles.infoRow, alignItems: "flex-start" }}>
                <span style={styles.infoLabel}>Tags</span>
                <div style={t.tagsRow}>{client.tags.map((tag) => <span key={tag} style={t.tag}>{tag}</span>)}</div>
              </div>
            )}
          </div>
        </div>

        {/* Deals */}
        <div style={t.card}>
          <div style={t.cardHead}>
            <h3 style={t.sectionTitle}>Deals</h3>
            <button style={t.linkBtn} onClick={onAddDeal}>+ Add</button>
          </div>
          {clientDeals.length === 0 && <p style={t.empty}>No deals yet.</p>}
          {clientDeals.map((d) => (
            <div key={d.id} style={styles.dealRow} className="table-row">
              <div>
                <p style={{ fontWeight: 600, fontSize: 14 }}>{d.title}</p>
                <p style={{ fontSize: 12, color: "#6b7280" }}>Due {d.dueDate}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontWeight: 600, color: "#1a6645", fontSize: 14 }}>{fmt(d.value)}</span>
                <StageBadge stage={d.stage} />
                <button style={t.iconBtn} onClick={() => onDeleteDeal(d.id)}>✕</button>
              </div>
            </div>
          ))}
        </div>

        {/* Notes — full width */}
        <div style={{ ...t.card, gridColumn: "1 / -1" }}>
          <div style={t.cardHead}>
            <h3 style={t.sectionTitle}>Notes</h3>
            <button style={t.linkBtn} onClick={onAddNote}>+ Add</button>
          </div>
          {clientNotes.length === 0 && <p style={t.empty}>No notes yet.</p>}
          {clientNotes.map((n) => (
            <div key={n.id} style={t.noteItem}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={t.noteDate}>{n.date}</span>
                <button style={t.iconBtn} onClick={() => onDeleteNote(n.id)}>✕</button>
              </div>
              <p style={t.noteText}>{n.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  grid:      { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 },
  infoRows:  { display: "flex", flexDirection: "column", gap: 12 },
  infoRow:   { display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 10, borderBottom: "1px solid #f5f3ee", gap: 12 },
  infoLabel: { fontSize: 12, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em" },
  infoValue: { fontSize: 14, color: "#1a1a18", textAlign: "right" },
  dealRow:   { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f5f3ee" },
};
