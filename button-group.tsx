"use client";

import { useState } from "react";
import { Search, Filter, Plus, Truck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import PageHeader from "@/components/PageHeader";

const vehicles = [
  { id: "VH-001", plate: "MH-22-19", year: 2019, type: "Bus", owner: "PMDC", status: "Ready", load: "44t" },
  { id: "VH-002", plate: "MH-22-20", year: 2020, type: "Van", owner: "Private", status: "Busy", load: "12t" },
  { id: "VH-003", plate: "MH-22-21", year: 2021, type: "Truck", owner: "PMDC", status: "Maintenance", load: "32t" },
  { id: "VH-004", plate: "MH-22-22", year: 2022, type: "Bus", owner: "Private", status: "Ready", load: "44t" },
  { id: "VH-005", plate: "MH-22-23", year: 2018, type: "Truck", owner: "PMDC", status: "Busy", load: "28t" },
  { id: "VH-006", plate: "MH-22-24", year: 2023, type: "Van", owner: "Private", status: "Ready", load: "8t" },
];

const statusColor: Record<string, string> = {
  Ready: "bg-green-100 text-green-700",
  Busy: "bg-blue-100 text-blue-700",
  Maintenance: "bg-orange-100 text-orange-700",
};

export default function VehiclesPage() {
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ plate: "", year: "", make: "", type: "", loadCapacity: "", odometer: "", notes: "" });

  const filtered = vehicles.filter(
    (v) =>
      v.plate.toLowerCase().includes(search.toLowerCase()) ||
      v.type.toLowerCase().includes(search.toLowerCase()) ||
      v.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Vehicle Registry"
        actions={
          <>
            <Button size="sm" variant="outline"><Filter className="w-4 h-4 mr-1" /> Filter</Button>
            <Button size="sm" onClick={() => setShowForm(true)}><Plus className="w-4 h-4 mr-1" /> Add Vehicle</Button>
          </>
        }
      />

      <div className="flex-1 p-6 space-y-5 overflow-y-auto">
        {/* Search */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search vehicles..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        <div className="flex gap-5">
          {/* Table */}
          <div className="flex-1 bg-card rounded-xl border border-border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="text-left px-4 py-3 font-semibold">Veh ID</th>
                    <th className="text-left px-4 py-3 font-semibold">Plate</th>
                    <th className="text-left px-4 py-3 font-semibold">Year</th>
                    <th className="text-left px-4 py-3 font-semibold">Type</th>
                    <th className="text-left px-4 py-3 font-semibold">Property</th>
                    <th className="text-left px-4 py-3 font-semibold">Status</th>
                    <th className="text-left px-4 py-3 font-semibold">Max Load</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((v) => (
                    <tr key={v.id} className="border-b border-border last:border-0 hover:bg-muted/20 cursor-pointer">
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{v.id}</td>
                      <td className="px-4 py-3 font-medium">{v.plate}</td>
                      <td className="px-4 py-3 text-muted-foreground">{v.year}</td>
                      <td className="px-4 py-3">{v.type}</td>
                      <td className="px-4 py-3 text-muted-foreground">{v.owner}</td>
                      <td className="px-4 py-3">
                        <Badge className={`${statusColor[v.status] || ""} border-0 text-xs`}>{v.status}</Badge>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{v.load}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Side form panel */}
          {showForm && (
            <div className="w-72 bg-card border border-border rounded-xl shadow-sm p-5 flex-shrink-0">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <Truck className="w-4 h-4 text-blue-500" />
                  New Vehicle Registration
                </h3>
                <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {[
                  { label: "License Plate", key: "plate", placeholder: "e.g. MH-22-1234" },
                  { label: "Year / Model", key: "year", placeholder: "e.g. 2022 / Tata 407" },
                  { label: "Make / Model", key: "make", placeholder: "e.g. Tata" },
                  { label: "Type", key: "type", placeholder: "Bus / Van / Truck" },
                  { label: "Load Capacity (tons)", key: "loadCapacity", placeholder: "e.g. 40" },
                  { label: "Odometer (km)", key: "odometer", placeholder: "e.g. 50000" },
                  { label: "Notes", key: "notes", placeholder: "Any notes..." },
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
                  <Button size="sm" className="flex-1">Save</Button>
                  <Button size="sm" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
