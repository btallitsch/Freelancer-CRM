import { useState } from "react";
import { STATUS_OPTS } from "@/lib/data";
import { t } from "@/lib/styles";
import { Field, ModalShell } from "../ui";

export default function ClientModal({ data, onSave, onClose }) {
  const [form, setForm] = useState({
    name: "", company: "", email: "", phone: "",
    value: "", status: "Lead", tags: "",
    ...data,
    tags: Array.isArray(data.tags) ? data.tags.join(", ") : (data.tags || ""),
  });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSave = () => {
    if (!form.name.trim()) return;
    onSave({
      ...form,
      value: Number(form.value) || 0,
      tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
    });
  };

  return (
    <ModalShell title={data.id ? "Edit Client" : "New Client"} onClose={onClose}>
      <div style={t.formGrid}>
        <Field label="Full Name *"            value={form.name}    onChange={set("name")} />
        <Field label="Company"                value={form.company} onChange={set("company")} />
        <Field label="Email"    type="email"  value={form.email}   onChange={set("email")} />
        <Field label="Phone"                  value={form.phone}   onChange={set("phone")} />
        <Field label="Lifetime Value ($)" type="number" value={form.value} onChange={set("value")} />

        <div style={t.fieldWrap}>
          <label style={t.fieldLabel}>Status</label>
          <select style={t.input} value={form.status} onChange={set("status")}>
            {STATUS_OPTS.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>

        <Field label="Tags (comma separated)" value={form.tags} onChange={set("tags")} span={2} />
      </div>

      <div style={t.modalActions}>
        <button style={t.secondaryBtn} onClick={onClose}>Cancel</button>
        <button style={t.primaryBtn}   onClick={handleSave}>Save Client</button>
      </div>
    </ModalShell>
  );
}
