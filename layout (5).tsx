"use client";

import { useState } from "react";
import {
  Truck,
  Wrench,
  TrendingDown,
  Clock,
  Search,
  Filter,
  Plus,
  Eye,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import PageHeader from "@/components/PageHeader";

const kpiCards = [
  {
    label: "Active Fleet",
    value: "248",
    sub: "vehicles on the road",
    icon: Truck,
    color: "bg-blue-500",
    trend: "+12 this week",
  },
  {
    label: "Maintenance Alerts",
    value: "160",
    sub: "vehicles in shop for repairs",
    icon: Wrench,
    color: "bg-orange-500",
    trend: "3 critical",
  },
  {
    label: "Pending Pickup",
    value: "45",
    sub: "waiting for a driver",
    icon: Clock,
    color: "bg-yellow-500",
    trend: "2 overdue",
  },
];

const trips = [
  { id: 1, vehicle: "xxxxxxxxxxxxxxx", driver: "John Doe", status: "On Trip", statusType: "active" },
  { id: 2, vehicle: "•", driver: "•", status: "•", statusType: "neutral" },
  { id: 3, vehicle: "•", driver: "•", status: "•", statusType: "neutral" },
  { id: 4, vehicle: "•", driver: "•", status: "•", statusType: "neutral" },
  { id: 5, vehicle: "•", driver: "•", status: "•", statusType: "neutral" },
];

const statusBadge = (type: string, label: string) => {
  if (type === "active") return <Badge className="bg-green-100 text-green-700 border-0">{label}</Badge>;
  if (type === "idle") return <Badge className="bg-yellow-100 text-yellow-700 border-0">{label}</Badge>;
  if (type === "error") return <Badge className="bg-red-100 text-red-700 border-0">{label}</Badge>;
  return <span className="text-muted-foreground text-sm">{label}</span>;
};

export default function DashboardPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Fleet Flow"
        actions={
          <>
            <Button size="sm" variant="outline">
              <Filter className="w-4 h-4 mr-1" /> Filter
            </Button>
            <Button size="sm" variant="outline">
              <Eye className="w-4 h-4 mr-1" /> View
            </Button>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-1" /> Add Trip
            </Button>
          </>
        }
      />

      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {kpiCards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.label} className="bg-card rounded-xl border border-border p-5 flex items-start gap-4 shadow-sm">
                <div className={`${card.color} rounded-xl p-3 flex-shrink-0`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-foreground">{card.value}</div>
                  <div className="text-sm font-medium text-foreground">{card.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{card.sub}</div>
                  <div className="text-xs text-blue-600 mt-1">{card.trend}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Search bar */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search trips, drivers, vehicles..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-1" /> Sorting Tools (Filters)
          </Button>
        </div>

        {/* Trips Table */}
        <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Trip #</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Vehicle</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Driver</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {trips.map((trip) => (
                  <tr key={trip.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3 text-muted-foreground">{trip.id}</td>
                    <td className="px-4 py-3 font-medium">{trip.vehicle}</td>
                    <td className="px-4 py-3 text-muted-foreground">{trip.driver}</td>
                    <td className="px-4 py-3">{statusBadge(trip.statusType, trip.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-blue-500" />
              Fleet Utilization
            </h3>
            <p className="text-xs text-muted-foreground mb-1">
              Fleet Efficiency: Shows a percentage indicating how many of your fleet are actually working versus sitting empty.
            </p>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: "72%" }} />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>72% Utilization</span>
              <span>248 / 345 active</span>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-orange-500" />
              Sorting Tools (Filters)
            </h3>
            <p className="text-xs text-muted-foreground">
              Vehicle Type: Only show trucks, vans, etc.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Status: Only show vehicles that are "Ready" or "Busy".
            </p>
            <div className="flex gap-2 mt-3">
              <Button size="sm" variant="outline" className="text-xs h-7">Truck</Button>
              <Button size="sm" variant="outline" className="text-xs h-7">Van</Button>
              <Button size="sm" variant="outline" className="text-xs h-7">Ready</Button>
              <Button size="sm" variant="outline" className="text-xs h-7">Busy</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
