"use client";

import { useState } from "react";
import { Truck, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function RegisterPage() {
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", company: "", role: "" });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl flex gap-8 items-start">
        {/* Left: Branding */}
        <div className="hidden md:flex flex-col flex-1 text-white pt-4">
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
            Make all the information for Fleet registration simple and fast.
          </p>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3 text-sm text-slate-400">
            <p>Fill in all the required fields to create your fleet management account and get started with dispatching, tracking, and optimizing your operations.</p>
          </div>
        </div>

        {/* Right: Register Form */}
        <div className="w-full max-w-sm">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center gap-2 mb-6 md:hidden">
              <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
                <Truck className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white text-lg">FleetFlow</span>
            </div>

            <h2 className="text-2xl font-bold text-white mb-1">Create Account</h2>
            <p className="text-slate-400 text-sm mb-6">Register to start managing your fleet</p>

            <div className="space-y-3">
              {[
                { label: "Full Name", key: "name", placeholder: "Your full name", type: "text" },
                { label: "Email", key: "email", placeholder: "your@email.com", type: "email" },
                { label: "Company / Fleet Name", key: "company", placeholder: "e.g. PMDC Logistics", type: "text" },
                { label: "Role", key: "role", placeholder: "Fleet Manager / Admin", type: "text" },
              ].map(({ label, key, placeholder, type }) => (
                <div key={key}>
                  <Label className="text-slate-300 text-sm">{label}</Label>
                  <Input
                    type={type}
                    className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-slate-500 focus:border-blue-400"
                    placeholder={placeholder}
                    value={(form as any)[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  />
                </div>
              ))}
              <div>
                <Label className="text-slate-300 text-sm">Password</Label>
                <div className="relative mt-1">
                  <Input
                    type={showPass ? "text" : "password"}
                    className="bg-white/10 border-white/20 text-white placeholder:text-slate-500 focus:border-blue-400 pr-10"
                    placeholder="Create a password"
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
                  Register
                </Button>
              </Link>
            </div>

            <p className="text-center text-slate-400 text-sm mt-4">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
