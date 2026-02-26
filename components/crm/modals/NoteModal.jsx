import { useState } from "react";
import { t } from "@/lib/styles";
import { ModalShell } from "../ui";

export default function NoteModal({ data, clients, onSave, onClose }) {
  const [form, setForm] = useState({
    text: "",
    clientId: clients[0]?.id || "",
    ...data,
    clientId: data.clientId || clients[0]?.id || "",
  });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSave = () => {
    if (!form.text.trim()) return;
    onSave({ ...form, clientId: Number(form.clientId) });
  };

  return (
    <ModalShell title={data.id ? "Edit Note" : "New Note"} onClose={onClose}>
      <div style={t.formGrid}>
        <div style={t.fieldWrap}>
          <label style={t.fieldLabel}>Client</label>
          <select style={t.input} value={form.clientId} onChange={set("clientId")}>
            {clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        <div style={{ ...t.fieldWrap, gridColumn: "1 / -1" }}>
          <label style={t.fieldLabel}>Note</label>
          <textarea
            style={{ ...t.input, minHeight: 100, resize: "vertical" }}
            value={form.text}
            onChange={set("text")}
          />
        </div>
      </div>

      <div style={t.modalActions}>
        <button style={t.secondaryBtn} onClick={onClose}>Cancel</button>
        <button style={t.primaryBtn}   onClick={handleSave}>Save Note</button>
      </div>
    </ModalShell>
  );
}
