const NAV_ITEMS = [
  { id: "dashboard", icon: "◉", label: "Dashboard" },
  { id: "clients",   icon: "◎", label: "Clients" },
  { id: "pipeline",  icon: "◫", label: "Pipeline" },
  { id: "notes",     icon: "◱", label: "Notes" },
];

export default function Sidebar({ view, setView }) {
  return (
    <aside style={styles.sidebar}>
      {/* Brand */}
      <div style={styles.brand}>
        <span style={styles.brandMark}>◈</span>
        <span style={styles.brandName}>Folio CRM</span>
      </div>

      {/* Nav */}
      <nav style={styles.nav}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            style={{ ...styles.navItem, ...(view === item.id ? styles.navItemActive : {}) }}
            onClick={() => setView(item.id)}
          >
            <span style={styles.navIcon}>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div style={styles.footer}>
        <div style={styles.userPill}>
          <span style={styles.avatar}>YO</span>
          <span style={{ fontSize: 13, color: "#4a5568" }}>Your Studio</span>
        </div>
      </div>
    </aside>
  );
}

const styles = {
  sidebar:       { width: 220, minHeight: "100vh", background: "#1c2820", display: "flex", flexDirection: "column", padding: "0 0 20px", position: "sticky", top: 0, height: "100vh" },
  brand:         { display: "flex", alignItems: "center", gap: 10, padding: "28px 24px 24px", borderBottom: "1px solid #2d3d32" },
  brandMark:     { fontSize: 22, color: "#6dcfa0" },
  brandName:     { fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 700, color: "#f0ede6", letterSpacing: "0.02em" },
  nav:           { display: "flex", flexDirection: "column", padding: "16px 12px", gap: 4, flex: 1 },
  navItem:       { display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: "none", border: "none", borderRadius: 8, cursor: "pointer", color: "#8fa898", fontSize: 14, fontWeight: 500, textAlign: "left", transition: "all 0.15s" },
  navItemActive: { background: "#2d3d32", color: "#6dcfa0" },
  navIcon:       { fontSize: 16, width: 20, textAlign: "center" },
  footer:        { padding: "0 16px" },
  userPill:      { display: "flex", alignItems: "center", gap: 10, padding: "10px 8px", borderRadius: 8, background: "#2d3d32" },
  avatar:        { width: 28, height: 28, borderRadius: "50%", background: "#4a7c59", color: "#fff", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" },
};
