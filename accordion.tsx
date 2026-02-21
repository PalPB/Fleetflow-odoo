"use client";

import { useState } from "react";
import { Search, Filter, ShieldCheck, AlertTriangle, Ban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import PageHeader from "@/components/PageHeader";

const drivers = [
  {
    name: "John", license: "22333", expiry: "22/06", trips: "14%", safetyScore: "97%", complaints: 0,
    grade: "A+", status: "On Duty",
  },
  {
    name: "John", license: "22222", expiry: "22/04", trips: "14%", safetyScore: "97%", complaints: 1,
    grade: "B+", status: "On Duty",
  },
  {
    name: "•", license: "22333", expiry: "22/06", trips: "12%", safetyScore: "97%", complaints: 0,
    grade: "A", status: "Off Duty",
  },
  {
    name: "•", license: "•", expiry: "•", trips: "•", safetyScore: "•", complaints: 0,
    grade: "•", status: "Off Duty",
  },
  {
    name: "•", license: "•", expiry: "•", trips: "•", safetyScore: "•", complaints: 0,
    grade: "•", status: "Off Duty",
  },
];

const statusColor: Record<string, string> = {
  "On Duty": "bg-green-100 text-green-700",
  "Off Duty": "bg-gray-100 text-gray-600",
  "Taking a Break": "bg-yellow-100 text-yellow-700",
  Suspended: "bg-red-100 text-red-700",
};

const gradeColor: Record<string, string> = {
  "A+": "text-green-600 font-bold",
  "A": "text-green-500 font-bold",
  "B+": "text-blue-600 font-bold",
  "B": "text-blue-500 font-bold",
  "C": "text-yellow-600 font-bold",
};

export default function PerformancePage() {
  const [search, setSearch] = useState("");

  const filtered = drivers.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Driver Performance & Safety Profiles"
        actions={
          <>
            <Button size="sm" variant="outline"><Filter className="w-4 h-4 mr-1" /> Filter</Button>
          </>
        }
      />

      <div className="flex-1 p-6 space-y-5 overflow-y-auto">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-xl p-4 shadow-sm flex items-start gap-3">
            <div className="bg-green-100 rounded-lg p-2.5">
              <ShieldCheck className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">24</div>
              <div className="text-sm font-medium">Active Drivers</div>
              <div className="text-xs text-muted-foreground">Currently on duty or standby</div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 shadow-sm flex items-start gap-3">
            <div className="bg-yellow-100 rounded-lg p-2.5">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">3</div>
              <div className="text-sm font-medium">Expiring Licenses</div>
              <div className="text-xs text-muted-foreground">Within 30 days</div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 shadow-sm flex items-start gap-3">
            <div className="bg-red-100 rounded-lg p-2.5">
              <Ban className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">1</div>
              <div className="text-sm font-medium">Suspended</div>
              <div className="text-xs text-muted-foreground">Flagged for review</div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search drivers..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        {/* Table */}
        <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="text-left px-4 py-3 font-semibold">Name</th>
                  <th className="text-left px-4 py-3 font-semibold">License #</th>
                  <th className="text-left px-4 py-3 font-semibold">Expiration Date</th>
                  <th className="text-left px-4 py-3 font-semibold">Completion Rate</th>
                  <th className="text-left px-4 py-3 font-semibold">Safety Score</th>
                  <th className="text-left px-4 py-3 font-semibold">Complaints</th>
                  <th className="text-left px-4 py-3 font-semibold">Grade</th>
                  <th className="text-left px-4 py-3 font-semibold">Duty Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((d, i) => (
                  <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/20 cursor-pointer">
                    <td className="px-4 py-3 font-medium">{d.name}</td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{d.license}</td>
                    <td className="px-4 py-3 text-muted-foreground">{d.expiry}</td>
                    <td className="px-4 py-3">{d.trips}</td>
                    <td className="px-4 py-3">{d.safetyScore}</td>
                    <td className="px-4 py-3 text-center">{d.complaints}</td>
                    <td className={`px-4 py-3 ${gradeColor[d.grade] || ""}`}>{d.grade}</td>
                    <td className="px-4 py-3">
                      <Badge className={`${statusColor[d.status] || ""} border-0 text-xs`}>{d.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info note */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-muted-foreground">
          <div className="bg-card border border-border rounded-lg p-3">
            <p className="font-semibold text-foreground mb-1">Performance Grade</p>
            Shows the driver's license number and when it expires. You won't be able to assign them to any new trips until they renew it.
          </div>
          <div className="bg-card border border-border rounded-lg p-3">
            <p className="font-semibold text-foreground mb-1">Safety Score</p>
            Performance Scoring: The system gives drivers a "Safety Score" based on things like braking, trips on time and whether they've been involved in any accidents or reported issues.
          </div>
          <div className="bg-card border border-border rounded-lg p-3">
            <p className="font-semibold text-foreground mb-1">Duty Status</p>
            Duty Status: A simple indicator to show if a driver is currently "On Duty", "Taking a Break", or "Suspended".
          </div>
        </div>
      </div>
    </div>
  );
}
