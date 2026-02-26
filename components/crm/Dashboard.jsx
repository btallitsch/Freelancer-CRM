import { fmt } from "../../lib/helpers";
import { t } from "../../lib/styles";
import { StageBadge } from "./ui";

export default function Dashboard({ stats, deals, notes, getClientName, setView }) {
  const recentDeals = [...deals].sort((a, b) => b.id - a.id).slice(0, 4);
  const recentNotes = [...notes].sort((a, b) => b.id - a.id).slice(0, 3);

  const statCards = [
    { label: "Revenue Closed",  value: fmt(stats.totalRevenue), delta: "+12% this quarter",                                         accent: "#1a6645" },
    { label: "Pipeline Value",  value: fmt(stats.pipeline),     delta: `${deals.filter(d => !["Won","Lost"].includes(d.stage)).length} open deals`, accent: "#5b21b6" },
    { label: "Active Clients",  value: stats.activeClients,     delta: `${stats.leads} new leads`,                                   accent: "#1d6fa4" },
    { label: "Avg Deal Size",   value: fmt(deals.length ? deals.reduce((s,d) => s + d.value, 0) / deals.length : 0), delta: "across all deals", accent: "#92400e" },
  ];

  return (
    <div style={t.page}>
      <header style={t.pageHeader}>
        <div>
          <p style={t.pageEyebrow}>Good morning</p>
          <h1 style={t.pageTitle}>Overview</h1>
        </div>
      </header>

      {/* Stat Cards */}
      <div style={styles.statsGrid}>
        {statCards.map((s, i) => (
          <div key={i} style={t.card} className="stat-card">
            <div style={{ ...styles.accentBar, background: s.accent }} />
            <p style={t.pageEyebrow}>{s.label}</p>
            <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 28, fontWeight: 700, color: s.accent, margin: "8px 0 4px" }}>{s.value}</p>
            <p style={{ fontSize: 12, color: "#9ca3af" }}>{s.delta}</p>
          </div>
        ))}
      </div>

      {/* Bottom grid */}
      <div style={styles.dashGrid}>
        {/* Recent Deals */}
        <div style={t.card}>
          <div style={t.cardHead}>
            <h3 style={t.sectionTitle}>Recent Deals</h3>
            <button style={t.linkBtn} onClick={() => setView("pipeline")}>View all →</button>
          </div>
          <table style={t.table}>
            <thead>
              <tr>
                {["Deal", "Client", "Value", "Stage"].map(h => <th key={h} style={t.th}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {recentDeals.map(d => (
                <tr key={d.id} className="table-row">
                  <td style={t.td}>{d.title}</td>
                  <td style={{ ...t.td, color: "#6b7280" }}>{getClientName(d.clientId)}</td>
                  <td style={t.td}>{fmt(d.value)}</td>
                  <td style={t.td}><StageBadge stage={d.stage} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Notes */}
        <div style={t.card}>
          <div style={t.cardHead}>
            <h3 style={t.sectionTitle}>Latest Notes</h3>
            <button style={t.linkBtn} onClick={() => setView("notes")}>View all →</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {recentNotes.map(n => (
              <div key={n.id} style={t.noteItem}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={t.noteClient}>{getClientName(n.clientId)}</span>
                  <span style={t.noteDate}>{n.date}</span>
                </div>
                <p style={t.noteText}>{n.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 },
  dashGrid:  { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 },
  accentBar: { position: "absolute", left: 0, top: 0, width: 4, height: "100%", borderRadius: "12px 0 0 12px" },
};
