"use client";

import { useState } from "react";
import { Search, Filter, Plus, X, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import PageHeader from "@/components/PageHeader";

const logs = [
  { id: "M-001", vehicle: "MH-22-19", issue: "Engine Failure", date: "2026-01-15", cost: "₹25,000", status: "In Shop" },
  { id: "M-002", vehicle: "MH-22-20", issue: "Tyre Replacement", date: "2026-01-18", cost: "₹8,500", status: "Done" },
  { id: "M-003", vehicle: "MH-22-21", issue: "Brake Inspection", date: "2026-01-20", cost: "₹3,200", status: "Done" },
  { id: "M-004", vehicle: "MH-22-23", issue: "Oil Change", date: "2026-01-25", cost: "₹2,100", status: "Done" },
  { id: "M-005", vehicle: "MH-22-24", issue: "AC Repair", date: "2026-02-01", cost: "₹12,500", status: "In Shop" },
  { id: "M-006", vehicle: "MH-22-25", issue: "Gear Box", date: "2026-02-10", cost: "₹45,000", status: "In Shop" },
];

const statusColor: Record<string, string> = {
  "In Shop": "bg-orange-100 text-orange-700",
  Done: "bg-green-100 text-green-700",
  Scheduled: "bg-blue-100 text-blue-700",
};

export default function MaintenancePage() {
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ vehicle: "", issue: "", service: "", date: "" });

  const filtered = logs.filter(
    (l) =>
      l.vehicle.toLowerCase().includes(search.toLowerCase()) ||
      l.issue.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Maintenance & Service Logs"
        actions={
          <>
            <Button size="sm" variant="outline"><Filter className="w-4 h-4 mr-1" /> Filter</Button>
            <Button size="sm" onClick={() => setShowForm(true)}><Plus className="w-4 h-4 mr-1" /> Add Service</Button>
          </>
        }
      />

      <div className="flex-1 p-6 space-y-5 overflow-y-auto">
        {/* Search */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search vehicles, issues..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        <div className="flex gap-5">
          {/* Table */}
          <div className="flex-1 bg-card rounded-xl border border-border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="text-left px-4 py-3 font-semibold">Log ID</th>
                    <th className="text-left px-4 py-3 font-semibold">Vehicle</th>
                    <th className="text-left px-4 py-3 font-semibold">Issue/Service</th>
                    <th className="text-left px-4 py-3 font-semibold">Date</th>
                    <th className="text-left px-4 py-3 font-semibold">Cost/Amount</th>
                    <th className="text-left px-4 py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((l) => (
                    <tr key={l.id} className="border-b border-border last:border-0 hover:bg-muted/20 cursor-pointer">
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{l.id}</td>
                      <td className="px-4 py-3 font-medium">{l.vehicle}</td>
                      <td className="px-4 py-3">{l.issue}</td>
                      <td className="px-4 py-3 text-muted-foreground">{l.date}</td>
                      <td className="px-4 py-3 text-muted-foreground">{l.cost}</td>
                      <td className="px-4 py-3">
                        <Badge className={`${statusColor[l.status] || ""} border-0 text-xs`}>{l.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* New Service Form */}
          {showForm && (
            <div className="w-72 bg-card border border-border rounded-xl shadow-sm p-5 flex-shrink-0">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-orange-500" />
                  New Service
                </h3>
                <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Vehicle (Plate)", key: "vehicle", placeholder: "e.g. MH-22-19" },
                  { label: "Grant/Issue", key: "issue", placeholder: "Engine, Tyres..." },
                  { label: "Sout", key: "service", placeholder: "Service description" },
                  { label: "Date", key: "date", placeholder: "YYYY-MM-DD" },
                ].map(({ label, key, placeholder }) => (
                  <div key={key}>
                    <Label className="text-xs font-medium">{label}</Label>
                    <Input
                      className="mt-1 h-8 text-sm"
                      placeholder={placeholder}
                      value={(form as any)[key]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    />
                  </div>
                ))}
                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1">Create</Button>
                  <Button size="sm" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                </div>
              </div>

              {/* The Attachable button note */}
              <div className="mt-4 p-3 bg-muted/50 rounded-lg text-xs text-muted-foreground">
                <strong>The Attachable:</strong> This lets you add a vehicle to maintenance log. Click the button to automatically mark it as "In Shop". This prevents it from accidentally being booked on a delivery.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
