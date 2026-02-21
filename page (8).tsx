"use client";

import { useState } from "react";
import { Search, Filter, Plus, X, Fuel } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import PageHeader from "@/components/PageHeader";

const expenses = [
  { id: "E-001", tripId: "TR-001", driver: "John", distance: "1200 km", fuelCost: "₹8,400", fuelLiters: "120 L", status: "Strong" },
  { id: "E-002", tripId: "TR-002", driver: "Ali", distance: "850 km", fuelCost: "₹5,950", fuelLiters: "85 L", status: "Strong" },
  { id: "E-003", tripId: "TR-003", driver: "Raj", distance: "640 km", fuelCost: "₹4,480", fuelLiters: "64 L", status: "Avg" },
  { id: "E-004", tripId: "TR-004", driver: "Suresh", distance: "920 km", fuelCost: "₹6,440", fuelLiters: "92 L", status: "Avg" },
  { id: "E-005", tripId: "TR-005", driver: "Ravi", distance: "1100 km", fuelCost: "₹7,700", fuelLiters: "110 L", status: "Strong" },
];

const statusColor: Record<string, string> = {
  Strong: "bg-green-100 text-green-700",
  Avg: "bg-yellow-100 text-yellow-700",
  Low: "bg-red-100 text-red-700",
};

export default function ExpensesPage() {
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ tripId: "", driver: "", amount: "", fuelExpense: "", newExpense: "" });

  const filtered = expenses.filter(
    (e) =>
      e.tripId.toLowerCase().includes(search.toLowerCase()) ||
      e.driver.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Expense & Fuel Logging"
        actions={
          <>
            <Button size="sm" variant="outline"><Filter className="w-4 h-4 mr-1" /> Filter</Button>
            <Button size="sm" onClick={() => setShowForm(true)}><Plus className="w-4 h-4 mr-1" /> Add an Expense</Button>
          </>
        }
      />

      <div className="flex-1 p-6 space-y-5 overflow-y-auto">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Total Fuel Cost (MTD)", value: "₹32,970", sub: "Month to date", color: "text-red-500" },
            { label: "Avg km/L", value: "10.2", sub: "Fleet average efficiency", color: "text-blue-500" },
            { label: "Top Performing Vehicle", value: "MH-22-19", sub: "12.5 km/L", color: "text-green-500" },
          ].map((c) => (
            <div key={c.label} className="bg-card border border-border rounded-xl p-4 shadow-sm">
              <div className={`text-2xl font-bold ${c.color}`}>{c.value}</div>
              <div className="text-sm font-medium text-foreground">{c.label}</div>
              <div className="text-xs text-muted-foreground">{c.sub}</div>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search expenses..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        <div className="flex gap-5">
          {/* Table */}
          <div className="flex-1 bg-card rounded-xl border border-border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="text-left px-4 py-3 font-semibold">Exp ID</th>
                    <th className="text-left px-4 py-3 font-semibold">Trip ID</th>
                    <th className="text-left px-4 py-3 font-semibold">Driver</th>
                    <th className="text-left px-4 py-3 font-semibold">Distance</th>
                    <th className="text-left px-4 py-3 font-semibold">Fuel Cost</th>
                    <th className="text-left px-4 py-3 font-semibold">Liters</th>
                    <th className="text-left px-4 py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((e) => (
                    <tr key={e.id} className="border-b border-border last:border-0 hover:bg-muted/20 cursor-pointer">
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{e.id}</td>
                      <td className="px-4 py-3 font-medium">{e.tripId}</td>
                      <td className="px-4 py-3">{e.driver}</td>
                      <td className="px-4 py-3 text-muted-foreground">{e.distance}</td>
                      <td className="px-4 py-3 font-medium">{e.fuelCost}</td>
                      <td className="px-4 py-3 text-muted-foreground">{e.fuelLiters}</td>
                      <td className="px-4 py-3">
                        <Badge className={`${statusColor[e.status] || ""} border-0 text-xs`}>{e.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* New Expense Form */}
          {showForm && (
            <div className="w-72 bg-card border border-border rounded-xl shadow-sm p-5 flex-shrink-0">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <Fuel className="w-4 h-4 text-orange-500" />
                  New Expense
                </h3>
                <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Trip ID", key: "tripId", placeholder: "e.g. TR-001" },
                  { label: "Driver", key: "driver", placeholder: "Driver name" },
                  { label: "Amount", key: "amount", placeholder: "e.g. ₹5,000" },
                  { label: "Fuel Expense", key: "fuelExpense", placeholder: "Liters or cost" },
                  { label: "New Expense", key: "newExpense", placeholder: "Description" },
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
