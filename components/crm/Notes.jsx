import { t } from "../../lib/styles";

export default function Notes({ notes, onAdd, onEdit, onDelete, getClientName }) {
  const sorted = [...notes].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div style={t.page}>
      <header style={t.pageHeader}>
        <div>
          <p style={t.pageEyebrow}>Log</p>
          <h1 style={t.pageTitle}>Notes</h1>
        </div>
        <button style={t.primaryBtn} onClick={onAdd}>+ Add Note</button>
      </header>

      <div style={styles.list}>
        {sorted.map((n) => (
          <div key={n.id} style={styles.card} className="stat-card">
            <div style={styles.cardHead}>
              <div>
                <span style={styles.clientName}>{getClientName(n.clientId)}</span>
                <span style={t.noteDate}> · {n.date}</span>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={t.iconBtn} onClick={() => onEdit(n)}>✎</button>
                <button style={t.iconBtn} onClick={() => onDelete(n.id)}>✕</button>
              </div>
            </div>
            <p style={styles.text}>{n.text}</p>
          </div>
        ))}

        {notes.length === 0 && (
          <p style={{ color: "#9ca3af", textAlign: "center", padding: 40 }}>No notes yet.</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  list:       { display: "flex", flexDirection: "column", gap: 14 },
  card:       { background: "#fff", borderRadius: 12, padding: 20, border: "1px solid #ece9e2", position: "relative", overflow: "hidden" },
  cardHead:   { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  clientName: { fontSize: 14, fontWeight: 700, color: "#1a1a18" },
  text:       { fontSize: 14, color: "#374151", lineHeight: 1.6, margin: 0 },
};
