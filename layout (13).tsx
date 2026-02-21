"use client";

import { useState } from "react";
import { Truck, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function LoginPage() {
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl flex gap-8 items-center">
        {/* Left: Branding */}
        <div className="hidden md:flex flex-col flex-1 text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center">
              <Truck className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">FleetFlow</h1>
              <p className="text-blue-300 text-sm">Fleet Management System</p>
            </div>
          </div>
          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            Manage your entire fleet operation from a single, powerful platform.
          </p>
          <ul className="space-y-3 text-slate-300 text-sm">
            {[
              "Real-time vehicle tracking & dispatch",
              "Driver performance & safety monitoring",
              "Fuel & expense management",
              "Maintenance scheduling & alerts",
              "Operational analytics & reports",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Login Form */}
        <div className="w-full max-w-sm">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center gap-2 mb-6 md:hidden">
              <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
                <Truck className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white text-lg">FleetFlow</span>
            </div>

            <h2 className="text-2xl font-bold text-white mb-1">Welcome back</h2>
            <p className="text-slate-400 text-sm mb-6">Sign in to your account</p>

            <div className="space-y-4">
              <div>
                <Label className="text-slate-300 text-sm">Username</Label>
                <Input
                  className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-slate-500 focus:border-blue-400"
                  placeholder="Enter username"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                />
              </div>
              <div>
                <Label className="text-slate-300 text-sm">Password</Label>
                <div className="relative mt-1">
                  <Input
                    type={showPass ? "text" : "password"}
                    className="bg-white/10 border-white/20 text-white placeholder:text-slate-500 focus:border-blue-400 pr-10"
                    placeholder="Enter password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Link href="/dashboard">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-2" size="lg">
                  Login
                </Button>
              </Link>
            </div>

            <p className="text-center text-slate-400 text-sm mt-4">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-blue-400 hover:text-blue-300 font-medium">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
