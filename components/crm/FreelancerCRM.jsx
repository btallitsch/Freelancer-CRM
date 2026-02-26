"use client";

import { useState } from "react";
import { SEED_CLIENTS, SEED_DEALS, SEED_NOTES } from "../../lib/data";
import { initials } from "../../lib/helpers";
import { globalCSS } from "../../lib/styles";

import Sidebar      from "./Sidebar";
import Dashboard    from "./Dashboard";
import Clients      from "./Clients";
import ClientDetail from "./ClientDetail";
import Pipeline     from "./Pipeline";
import Notes        from "./Notes";

import ClientModal  from "./modals/ClientModal";
import DealModal    from "./modals/DealModal";
import NoteModal    from "./modals/NoteModal";

export default function FreelancerCRM() {
  // ── State ──────────────────────────────────────────────────
  const [view,           setView]           = useState("dashboard");
  const [clients,        setClients]        = useState(SEED_CLIENTS);
  const [deals,          setDeals]          = useState(SEED_DEALS);
  const [notes,          setNotes]          = useState(SEED_NOTES);
  const [modal,          setModal]          = useState(null);  // { type, data }
  const [selectedClient, setSelectedClient] = useState(null);
  const [search,         setSearch]         = useState("");

  // Pipeline drag state
  const [dragging,  setDragging]  = useState(null);
  const [dragOver,  setDragOver]  = useState(null);

  // ── Derived stats ──────────────────────────────────────────
  const totalRevenue  = deals.filter(d => d.stage === "Won").reduce((s, d) => s + d.value, 0);
  const pipeline      = deals.filter(d => !["Won","Lost"].includes(d.stage)).reduce((s, d) => s + d.value, 0);
  const activeClients = clients.filter(c => c.status === "Active").length;
  const leads         = clients.filter(c => c.status === "Lead").length;

  // ── Helpers ────────────────────────────────────────────────
  const getClientName = (id) => clients.find(c => c.id === id)?.name || "—";

  const filteredClients = clients.filter(c =>
    [c.name, c.company, c.email].some(f => f.toLowerCase().includes(search.toLowerCase()))
  );

  // ── Drag & drop pipeline ───────────────────────────────────
  const onDragStart = (id) => setDragging(id);
  const onDrop      = (stage) => {
    if (dragging !== null) setDeals(ds => ds.map(d => d.id === dragging ? { ...d, stage } : d));
    setDragging(null);
    setDragOver(null);
  };

  // ── CRUD ───────────────────────────────────────────────────
  const saveClient = (data) => {
    if (data.id) {
      setClients(cs => cs.map(c => c.id === data.id ? data : c));
    } else {
      setClients(cs => [...cs, { ...data, id: Date.now(), avatar: initials(data.name) }]);
    }
    setModal(null);
  };

  const saveDeal = (data) => {
    if (data.id) setDeals(ds => ds.map(d => d.id === data.id ? data : d));
    else         setDeals(ds => [...ds, { ...data, id: Date.now() }]);
    setModal(null);
  };

  const saveNote = (data) => {
    if (data.id) setNotes(ns => ns.map(n => n.id === data.id ? data : n));
    else         setNotes(ns => [...ns, { ...data, id: Date.now(), date: new Date().toISOString().slice(0, 10) }]);
    setModal(null);
  };

  const deleteClient = (id) => { setClients(cs => cs.filter(c => c.id !== id)); setSelectedClient(null); };
  const deleteDeal   = (id) => setDeals(ds => ds.filter(d => d.id !== id));
  const deleteNote   = (id) => setNotes(ns => ns.filter(n => n.id !== id));

  // ── Navigation helper ──────────────────────────────────────
  const navigateTo = (v) => { setView(v); setSelectedClient(null); };

  // ── Render ─────────────────────────────────────────────────
  return (
    <div style={styles.root}>
      <style>{globalCSS}</style>

      <Sidebar view={view} setView={navigateTo} />

      <main style={styles.main}>
        {view === "dashboard" && (
          <Dashboard
            stats={{ totalRevenue, pipeline, activeClients, leads }}
            deals={deals}
            notes={notes}
            getClientName={getClientName}
            setView={navigateTo}
          />
        )}

        {view === "clients" && !selectedClient && (
          <Clients
            clients={filteredClients}
            search={search}
            setSearch={setSearch}
            deals={deals}
            onSelect={setSelectedClient}
            onAdd={() => setModal({ type: "client", data: {} })}
          />
        )}

        {view === "clients" && selectedClient && (
          <ClientDetail
            client={selectedClient}
            deals={deals}
            notes={notes}
            onBack={() => setSelectedClient(null)}
            onEdit={(c)  => setModal({ type: "client", data: c })}
            onDelete={deleteClient}
            onAddDeal={() => setModal({ type: "deal",  data: { clientId: selectedClient.id } })}
            onAddNote={() => setModal({ type: "note",  data: { clientId: selectedClient.id } })}
            onDeleteDeal={deleteDeal}
            onDeleteNote={deleteNote}
          />
        )}

        {view === "pipeline" && (
          <Pipeline
            deals={deals}
            dragging={dragging}
            dragOver={dragOver}
            onDragStart={onDragStart}
            onDrop={onDrop}
            setDragOver={setDragOver}
            getClientName={getClientName}
            onAdd={() => setModal({ type: "deal", data: {} })}
            onDelete={deleteDeal}
          />
        )}

        {view === "notes" && (
          <Notes
            notes={notes}
            getClientName={getClientName}
            onAdd={() => setModal({ type: "note",  data: {} })}
            onEdit={(n)  => setModal({ type: "note",  data: n })}
            onDelete={deleteNote}
          />
        )}
      </main>

      {/* ── Modals ── */}
      {modal?.type === "client" && (
        <ClientModal data={modal.data} clients={clients} onSave={saveClient} onClose={() => setModal(null)} />
      )}
      {modal?.type === "deal" && (
        <DealModal   data={modal.data} clients={clients} onSave={saveDeal}   onClose={() => setModal(null)} />
      )}
      {modal?.type === "note" && (
        <NoteModal   data={modal.data} clients={clients} onSave={saveNote}   onClose={() => setModal(null)} />
      )}
    </div>
  );
}

const styles = {
  root: { display: "flex", minHeight: "100vh", background: "#f7f5f0", fontFamily: "'DM Sans', 'Segoe UI', sans-serif", color: "#1a1a18" },
  main: { flex: 1, overflow: "auto" },
};
