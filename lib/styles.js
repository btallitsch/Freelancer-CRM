export const t = {
  // Layout
  page:       { padding: "36px 40px", maxWidth: 1200 },
  pageHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 },
  headerActions: { display: "flex", gap: 12, alignItems: "center" },

  // Typography
  pageEyebrow: { fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "#9ca3af", marginBottom: 4 },
  pageTitle:   { fontFamily: "'Playfair Display', Georgia, serif", fontSize: 32, fontWeight: 700, color: "#1a1a18", margin: 0 },
  sectionTitle:{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, margin: "0 0 14px" },

  // Cards
  card: { background: "#fff", borderRadius: 12, padding: 24, border: "1px solid #ece9e2" },
  cardHead: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },

  // Buttons
  primaryBtn:   { background: "#1c2820", color: "#6dcfa0", border: "none", borderRadius: 8, padding: "10px 18px", fontSize: 14, fontWeight: 600, cursor: "pointer" },
  secondaryBtn: { background: "#fff", color: "#1a1a18", border: "1.5px solid #ddd", borderRadius: 8, padding: "9px 16px", fontSize: 14, fontWeight: 600, cursor: "pointer" },
  dangerBtn:    { background: "#fee2e2", color: "#991b1b", border: "none", borderRadius: 8, padding: "9px 16px", fontSize: 14, fontWeight: 600, cursor: "pointer" },
  linkBtn:      { background: "none", border: "none", cursor: "pointer", color: "#1a6645", fontSize: 13, fontWeight: 600, padding: 0 },
  iconBtn:      { background: "none", border: "none", cursor: "pointer", color: "#d1d5db", fontSize: 13, padding: "2px 4px", borderRadius: 4 },
  iconBtnSm:    { background: "none", border: "none", cursor: "pointer", color: "#d1d5db", fontSize: 11, padding: "1px 3px" },
  backBtn:      { background: "none", border: "none", cursor: "pointer", color: "#6b7280", fontSize: 14, fontWeight: 500, padding: 0 },

  // Badges / Tags
  badge:   { fontSize: 11, fontWeight: 700, borderRadius: 20, padding: "3px 10px", whiteSpace: "nowrap" },
  tag:     { fontSize: 11, fontWeight: 600, background: "#f0ede6", color: "#6b7280", borderRadius: 6, padding: "3px 8px" },
  tagsRow: { display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 },

  // Table
  table: { width: "100%", borderCollapse: "collapse" },
  th:    { textAlign: "left", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "#9ca3af", padding: "0 8px 10px 0", borderBottom: "1px solid #ece9e2" },
  td:    { padding: "10px 8px 10px 0", fontSize: 14, borderBottom: "1px solid #f5f3ee", verticalAlign: "middle" },

  // Notes
  noteItem:   { background: "#f9f8f5", borderRadius: 8, padding: "12px 14px", marginBottom: 8 },
  noteClient: { fontSize: 13, fontWeight: 600, color: "#1a6645" },
  noteDate:   { fontSize: 12, color: "#9ca3af" },
  noteText:   { fontSize: 13, color: "#4a5568", margin: 0, lineHeight: 1.5 },

  // Forms
  formGrid:   { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  fieldWrap:  { display: "flex", flexDirection: "column", gap: 6 },
  fieldLabel: { fontSize: 12, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.08em" },
  input:      { padding: "10px 12px", borderRadius: 8, border: "1.5px solid #e5e7eb", fontSize: 14, outline: "none", fontFamily: "inherit", background: "#fafaf9" },

  // Modal
  overlay:    { position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
  modal:      { background: "#fff", borderRadius: 16, padding: 32, width: "100%", maxWidth: 520, boxShadow: "0 20px 60px rgba(0,0,0,0.15)", maxHeight: "90vh", overflowY: "auto" },
  modalHead:  { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 },
  modalTitle: { fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, fontWeight: 700, margin: 0 },
  modalClose: { background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#9ca3af", padding: 4 },
  modalActions:{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 24 },

  empty: { color: "#9ca3af", fontSize: 13, padding: "8px 0" },
};

export const globalCSS = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  .stat-card:hover  { transform: translateY(-2px); box-shadow: 0 4px 20px rgba(0,0,0,0.07); transition: all 0.2s; }
  .client-card:hover { transform: translateY(-2px); box-shadow: 0 4px 20px rgba(0,0,0,0.08); border-color: #ccc; }
  .deal-card:hover  { box-shadow: 0 4px 16px rgba(0,0,0,0.08); }
  .table-row:hover td { background: #f9f8f5; }
  input:focus, select:focus, textarea:focus { border-color: #1a6645 !important; box-shadow: 0 0 0 3px rgba(26,102,69,0.1); }
  button:active { transform: scale(0.97); }
  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 10px; }
`;
