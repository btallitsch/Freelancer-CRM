import { STAGES } from "../../lib/data";
import { fmt, stageColor } from "../../lib/helpers";
import { t } from "../../lib/styles";

export default function Pipeline({
  deals, onDragStart, onDrop, dragOver, setDragOver,
  dragging, onAdd, onDelete, getClientName,
}) {
  return (
    <div style={t.page}>
      <header style={t.pageHeader}>
        <div>
          <p style={t.pageEyebrow}>Sales</p>
          <h1 style={t.pageTitle}>Pipeline</h1>
        </div>
        <button style={t.primaryBtn} onClick={onAdd}>+ Add Deal</button>
      </header>

      <div style={styles.board}>
        {STAGES.map((stage) => {
          const stageDeals = deals.filter((d) => d.stage === stage);
          const total      = stageDeals.reduce((s, d) => s + d.value, 0);
          const isOver     = dragOver === stage;

          return (
            <div
              key={stage}
              style={{ ...styles.column, ...(isOver ? styles.columnOver : {}) }}
              onDragOver={(e)  => { e.preventDefault(); setDragOver(stage); }}
              onDrop={()       => onDrop(stage)}
              onDragLeave={()  => setDragOver(null)}
            >
              {/* Column header */}
              <div style={styles.columnHeader}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ ...styles.dot, background: stageColor(stage).color }} />
                  <span style={styles.columnTitle}>{stage}</span>
                  <span style={styles.count}>{stageDeals.length}</span>
                </div>
                <span style={styles.total}>{fmt(total)}</span>
              </div>

              {/* Cards */}
              <div style={styles.cards}>
                {stageDeals.map((d) => (
                  <div
                    key={d.id}
                    draggable
                    onDragStart={() => onDragStart(d.id)}
                    style={{ ...styles.card, opacity: dragging === d.id ? 0.4 : 1 }}
                    className="deal-card"
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <p style={styles.dealTitle}>{d.title}</p>
                      <button style={t.iconBtnSm} onClick={() => onDelete(d.id)}>✕</button>
                    </div>
                    <p style={styles.dealClient}>{getClientName(d.clientId)}</p>
                    <div style={styles.dealFooter}>
                      <span style={styles.dealValue}>{fmt(d.value)}</span>
                      <span style={styles.dealDate}>Due {d.dueDate}</span>
                    </div>
                    {d.notes && <p style={styles.dealNote}>{d.notes}</p>}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  board:       { display: "flex", gap: 16, overflowX: "auto", paddingBottom: 20 },
  column:      { minWidth: 240, flex: "0 0 240px", background: "#f0ede6", borderRadius: 12, padding: 16, transition: "background 0.15s", border: "2px dashed transparent" },
  columnOver:  { background: "#e8f4fd", borderColor: "#1d6fa4" },
  columnHeader:{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 },
  columnTitle: { fontSize: 13, fontWeight: 700, color: "#1a1a18" },
  count:       { background: "#ddd", color: "#6b7280", fontSize: 11, fontWeight: 700, borderRadius: 10, padding: "2px 7px", marginLeft: 4 },
  total:       { fontSize: 12, fontWeight: 700, color: "#1a6645" },
  dot:         { width: 8, height: 8, borderRadius: "50%", flexShrink: 0 },
  cards:       { display: "flex", flexDirection: "column", gap: 10 },
  card:        { background: "#fff", borderRadius: 10, padding: "14px 16px", border: "1px solid #ece9e2", cursor: "grab", userSelect: "none" },
  dealTitle:   { fontWeight: 700, fontSize: 14, margin: "0 0 4px", color: "#1a1a18" },
  dealClient:  { fontSize: 12, color: "#9ca3af", marginBottom: 10 },
  dealFooter:  { display: "flex", justifyContent: "space-between", alignItems: "center" },
  dealValue:   { fontSize: 14, fontWeight: 700, color: "#1a6645" },
  dealDate:    { fontSize: 11, color: "#9ca3af" },
  dealNote:    { fontSize: 12, color: "#9ca3af", marginTop: 8, paddingTop: 8, borderTop: "1px solid #f5f3ee", fontStyle: "italic" },
};
