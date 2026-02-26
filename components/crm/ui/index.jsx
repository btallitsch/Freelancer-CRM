import { t } from "@/lib/styles";
import { statusColor, stageColor } from "@/lib/helpers";

export function StatusBadge({ status }) {
  const c = statusColor(status);
  return <span style={{ ...t.badge, background: c.bg, color: c.color }}>{status}</span>;
}

export function StageBadge({ stage }) {
  const c = stageColor(stage);
  return <span style={{ ...t.badge, background: c.bg, color: c.color }}>{stage}</span>;
}

export function Field({ label, value, onChange, type = "text", span = 1 }) {
  return (
    <div style={{ ...t.fieldWrap, ...(span === 2 ? { gridColumn: "1 / -1" } : {}) }}>
      <label style={t.fieldLabel}>{label}</label>
      <input style={t.input} type={type} value={value} onChange={onChange} />
    </div>
  );
}

export function ModalShell({ title, onClose, children }) {
  return (
    <div style={t.overlay} onClick={onClose}>
      <div style={t.modal} onClick={(e) => e.stopPropagation()}>
        <div style={t.modalHead}>
          <h2 style={t.modalTitle}>{title}</h2>
          <button style={t.modalClose} onClick={onClose}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}
