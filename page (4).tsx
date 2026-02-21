"use client";

import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from "recharts";
import { TrendingUp, TrendingDown, Truck, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";

const fuelTrend = [
  { month: "Aug", efficiency: 9.2 },
  { month: "Sep", efficiency: 9.8 },
  { month: "Oct", efficiency: 10.1 },
  { month: "Nov", efficiency: 10.5 },
  { month: "Dec", efficiency: 10.0 },
  { month: "Jan", efficiency: 10.8 },
  { month: "Feb", efficiency: 11.2 },
];

const vehicleContribution = [
  { vehicle: "MH-22-19", trips: 24 },
  { vehicle: "MH-22-20", trips: 18 },
  { vehicle: "MH-22-21", trips: 15 },
  { vehicle: "MH-22-22", trips: 22 },
  { vehicle: "MH-22-23", trips: 19 },
];

const financialSummary = [
  { month: "Oct", profit: 120000, revenue: 185000, fuelCost: 32000, maintenance: 22000 },
  { month: "Nov", profit: 135000, revenue: 200000, fuelCost: 35000, maintenance: 18000 },
  { month: "Dec", profit: 148000, revenue: 220000, fuelCost: 38000, maintenance: 20000 },
  { month: "Jan", profit: 142000, revenue: 210000, fuelCost: 36000, maintenance: 25000 },
  { month: "Feb", profit: 160000, revenue: 235000, fuelCost: 40000, maintenance: 21000 },
];

const reports = [
  { profit: "Rs. TFC", revenue: "Rs. Go.", fuelCost: "Rs. ZL.", maintenance: "Rs. 2L.", netResult: "Rs. 7L." },
  { profit: "•", revenue: "•", fuelCost: "•", maintenance: "•", netResult: "•" },
  { profit: "•", revenue: "•", fuelCost: "•", maintenance: "•", netResult: "•" },
  { profit: "•", revenue: "•", fuelCost: "•", maintenance: "•", netResult: "•" },
  { profit: "•", revenue: "•", fuelCost: "•", maintenance: "•", netResult: "•" },
];

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Operational Analytics & Financial Reports"
        actions={
          <>
            <Button size="sm" variant="outline">Export PDF</Button>
            <Button size="sm" variant="outline">Export Excel</Button>
          </>
        }
      />

      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        {/* Top KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Fuel Cost", value: "₹1,65,000", sub: "This month", icon: TrendingDown, color: "text-red-500", bg: "bg-red-50" },
            { label: "Fleet KMpL", value: "10.8 km/L", sub: "+10.5% vs last month", icon: TrendingUp, color: "text-green-500", bg: "bg-green-50" },
            { label: "Fuel Cost", value: "₹40,000", sub: "Current period", icon: DollarSign, color: "text-blue-500", bg: "bg-blue-50" },
            { label: "Lost Revenue Ratio", value: "4.2%", sub: "Idle vs active fleet", icon: Truck, color: "text-orange-500", bg: "bg-orange-50" },
          ].map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.label} className="bg-card border border-border rounded-xl p-4 shadow-sm">
                <div className={`inline-flex p-2 rounded-lg ${c.bg} mb-2`}>
                  <Icon className={`w-4 h-4 ${c.color}`} />
                </div>
                <div className={`text-xl font-bold ${c.color}`}>{c.value}</div>
                <div className="text-xs font-medium text-foreground">{c.label}</div>
                <div className="text-xs text-muted-foreground">{c.sub}</div>
              </div>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Fuel Efficiency Trend */}
          <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
            <h3 className="font-semibold text-sm mb-4">Fuel Efficiency Trend (km/L)</h3>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={fuelTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} domain={[8, 12]} />
                <Tooltip />
                <Line type="monotone" dataKey="efficiency" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Top Contributor Vehicles */}
          <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
            <h3 className="font-semibold text-sm mb-4">Top Contributor Vehicles (Trips)</h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={vehicleContribution} barSize={24}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="vehicle" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="trips" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Financial Summary */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-sm mb-4">Financial Summary of Month</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={financialSummary} barSize={20}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: number) => `₹${v.toLocaleString()}`} />
              <Legend />
              <Bar dataKey="revenue" name="Revenue" fill="#22c55e" radius={[3, 3, 0, 0]} />
              <Bar dataKey="profit" name="Profit" fill="#3b82f6" radius={[3, 3, 0, 0]} />
              <Bar dataKey="fuelCost" name="Fuel Cost" fill="#f97316" radius={[3, 3, 0, 0]} />
              <Bar dataKey="maintenance" name="Maintenance" fill="#a855f7" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Reports table */}
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="px-5 py-3 border-b border-border">
            <h3 className="font-semibold text-sm">Financial Summary of Month</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="text-left px-4 py-3 font-semibold">Profit</th>
                  <th className="text-left px-4 py-3 font-semibold">Revenue</th>
                  <th className="text-left px-4 py-3 font-semibold">Fuel Cost</th>
                  <th className="text-left px-4 py-3 font-semibold">Maintenance</th>
                  <th className="text-left px-4 py-3 font-semibold">Net Result</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((r, i) => (
                  <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/20">
                    <td className="px-4 py-2.5 text-muted-foreground">{r.profit}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{r.revenue}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{r.fuelCost}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{r.maintenance}</td>
                    <td className="px-4 py-2.5 font-medium text-green-600">{r.netResult}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
