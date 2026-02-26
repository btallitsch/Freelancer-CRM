import { useState } from "react";
import { STAGES } from "../../../lib/data";
import { t } from "../../../lib/styles";
import { Field, ModalShell } from "../ui";

export default function DealModal({ data, clients, onSave, onClose }) {
  const [form, setForm] = useState({
    title: "", value: "", stage: "Discovery",
    dueDate: "", notes: "",
    clientId: clients[0]?.id || "",
    ...data,
    clientId: data.clientId || clients[0]?.id || "",
  });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSave = () => {
    if (!form.title.trim()) return;
    onSave({ ...form, value: Number(form.value) || 0, clientId: Number(form.clientId) });
  };

  return (
    <ModalShell title={data.id ? "Edit Deal" : "New Deal"} onClose={onClose}>
      <div style={t.formGrid}>
        <Field label="Deal Title *" value={form.title} onChange={set("title")} span={2} />

        <div style={t.fieldWrap}>
          <label style={t.fieldLabel}>Client</label>
          <select style={t.input} value={form.clientId} onChange={set("clientId")}>
            {clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        <div style={t.fieldWrap}>
          <label style={t.fieldLabel}>Stage</label>
          <select style={t.input} value={form.stage} onChange={set("stage")}>
            {STAGES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>

        <Field label="Value ($)"  type="number" value={form.value}   onChange={set("value")} />
        <Field label="Due Date"   type="date"   value={form.dueDate} onChange={set("dueDate")} />
        <Field label="Notes"                    value={form.notes}   onChange={set("notes")} span={2} />
      </div>

      <div style={t.modalActions}>
        <button style={t.secondaryBtn} onClick={onClose}>Cancel</button>
        <button style={t.primaryBtn}   onClick={handleSave}>Save Deal</button>
      </div>
    </ModalShell>
  );
}
