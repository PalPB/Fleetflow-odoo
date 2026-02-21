"use client";

import { useState } from "react";
import { Search, Filter, Plus, X, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import PageHeader from "@/components/PageHeader";

const trips = [
  {
    id: "TR-001", tripType: "Delivery", origin: "Mumbai", destination: "Pune",
    vehicle: "MH-22-19", driver: "John Doe", freight: "Electronics", status: "On Trip",
  },
  {
    id: "TR-002", tripType: "Pickup", origin: "Pune", destination: "Nashik",
    vehicle: "MH-22-20", driver: "Ali Khan", freight: "Furniture", status: "Pending",
  },
  {
    id: "TR-003", tripType: "Delivery", origin: "Mumbai", destination: "Aurangabad",
    vehicle: "MH-22-21", driver: "Raj Patel", freight: "Auto Parts", status: "Completed",
  },
  {
    id: "TR-004", tripType: "Delivery", origin: "Nashik", destination: "Nagpur",
    vehicle: "MH-22-22", driver: "Suresh Kumar", freight: "Textiles", status: "Pending",
  },
  {
    id: "TR-005", tripType: "Pickup", origin: "Nagpur", destination: "Mumbai",
    vehicle: "MH-22-23", driver: "Ravi Singh", freight: "Food Items", status: "On Trip",
  },
];

const statusColor: Record<string, string> = {
  "On Trip": "bg-blue-100 text-blue-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Completed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function TripsPage() {
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    vehicle: "", driver: "", weight: "", origin: "", destination: "", estimatedFuel: "",
  });

  const filtered = trips.filter(
    (t) =>
      t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.driver.toLowerCase().includes(search.toLowerCase()) ||
      t.vehicle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Trip Dispatching & Management"
        actions={
          <>
            <Button size="sm" variant="outline"><Search className="w-4 h-4 mr-1" /> Search</Button>
            <Button size="sm" variant="outline"><Filter className="w-4 h-4 mr-1" /> Filter</Button>
            <Button size="sm" variant="outline">Add Trip</Button>
            <Button size="sm" onClick={() => setShowForm(true)}><Plus className="w-4 h-4 mr-1" /> Dispatch Trip</Button>
          </>
        }
      />

      <div className="flex-1 p-6 space-y-5 overflow-y-auto">
        {/* Search */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search trips..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        <div className="flex gap-5">
          {/* Table */}
          <div className="flex-1 bg-card rounded-xl border border-border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="text-left px-4 py-3 font-semibold">Trip ID</th>
                    <th className="text-left px-4 py-3 font-semibold">Trip Type</th>
                    <th className="text-left px-4 py-3 font-semibold">Origin</th>
                    <th className="text-left px-4 py-3 font-semibold">Destination</th>
                    <th className="text-left px-4 py-3 font-semibold">Vehicle</th>
                    <th className="text-left px-4 py-3 font-semibold">Driver</th>
                    <th className="text-left px-4 py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((t) => (
                    <tr key={t.id} className="border-b border-border last:border-0 hover:bg-muted/20 cursor-pointer">
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{t.id}</td>
                      <td className="px-4 py-3">{t.tripType}</td>
                      <td className="px-4 py-3 text-muted-foreground">{t.origin}</td>
                      <td className="px-4 py-3 text-muted-foreground">{t.destination}</td>
                      <td className="px-4 py-3 font-medium">{t.vehicle}</td>
                      <td className="px-4 py-3">{t.driver}</td>
                      <td className="px-4 py-3">
                        <Badge className={`${statusColor[t.status] || ""} border-0 text-xs`}>{t.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* New Trip Form */}
          {showForm && (
            <div className="w-72 bg-card border border-border rounded-xl shadow-sm p-5 flex-shrink-0">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  New Trip Form
                </h3>
                <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Select Vehicle", key: "vehicle", placeholder: "e.g. MH-22-19" },
                  { label: "Cargo Weight (kg)", key: "weight", placeholder: "e.g. 2000" },
                  { label: "Select Driver", key: "driver", placeholder: "Driver name" },
                  { label: "Origin (Address)", key: "origin", placeholder: "Starting point" },
                  { label: "Destination", key: "destination", placeholder: "End point" },
                  { label: "Estimated Fuel Cost", key: "estimatedFuel", placeholder: "e.g. ₹5000" },
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
                  <Button size="sm" className="flex-1">Confirm & Dispatch Trip</Button>
                </div>
                <Button size="sm" variant="outline" className="w-full" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
