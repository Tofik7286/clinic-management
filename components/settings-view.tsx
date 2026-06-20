"use client";

import * as React from "react";
import {
  Building2,
  Users2,
  Database,
  BadgeDollarSign,
  FileText,
  Camera,
  Save,
  Upload,
  Hospital,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UserManagementContent } from "@/components/user-management-view";
import { MasterDataContent } from "@/components/master-data-view";

/* ─── Settings Navigation Items ─── */
interface SettingsNavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const settingsNavItems: SettingsNavItem[] = [
  { id: "clinic-profile", label: "Clinic Profile", icon: Building2 },
  { id: "user-management", label: "User Management", icon: Users2 },
  { id: "master-data", label: "Master Data", icon: Database },
  { id: "financial-rules", label: "Financial Rules", icon: BadgeDollarSign },
  { id: "templates", label: "Templates", icon: FileText },
];

/* ─── Reusable Input ─── */
function FormInput({
  label,
  id,
  type = "text",
  placeholder,
  defaultValue,
}: {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-xs font-semibold text-slate-600 dark:text-slate-400"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={cn(
          "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400",
          "transition-all duration-200 outline-none",
          "focus:border-teal-400 focus:ring-2 focus:ring-teal-500/10",
          "hover:border-slate-300",
          "dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-200 dark:placeholder:text-slate-500",
          "dark:focus:border-teal-500 dark:focus:ring-teal-400/10 dark:hover:border-slate-600"
        )}
      />
    </div>
  );
}

/* ─── Clinic Profile Content ─── */
function ClinicProfileContent() {
  return (
    <div className="flex flex-col h-full">
      {/* Scrollable Form Content */}
      <div className="flex-1 overflow-y-auto space-y-6 pb-24">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Clinic Profile & Branding
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage your organization&apos;s core details
          </p>
        </div>

        {/* Section 1: Branding */}
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-5">
              Branding
            </h2>
            <div className="flex items-center gap-6">
              {/* Logo Placeholder */}
              <div className="relative group">
                <div
                  className={cn(
                    "flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/80",
                    "transition-all duration-200 group-hover:border-teal-300 group-hover:bg-teal-50/40",
                    "dark:border-slate-700 dark:bg-slate-800/40 dark:group-hover:border-teal-600 dark:group-hover:bg-teal-950/20"
                  )}
                >
                  <Hospital className="h-10 w-10 text-slate-300 transition-colors group-hover:text-teal-500 dark:text-slate-600 dark:group-hover:text-teal-400" />
                </div>
                {/* Camera overlay on hover */}
                <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-slate-900/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100 cursor-pointer">
                  <Camera className="h-6 w-6 text-white" />
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Clinic Logo
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  Upload a square image (min 200×200px). PNG, JPG, or SVG.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="cursor-pointer hover:border-teal-300 hover:text-teal-700 dark:hover:border-teal-600 dark:hover:text-teal-400 transition-all duration-200"
                >
                  <Upload className="h-3.5 w-3.5" />
                  Change Logo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Basic Details */}
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-5">
              Basic Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <FormInput
                label="Clinic Name"
                id="clinic-name"
                placeholder="e.g. ClinicOS Healthcare"
                defaultValue="ClinicOS Healthcare Pvt. Ltd."
              />
              <FormInput
                label="Registration Number"
                id="reg-number"
                placeholder="e.g. REG-2024-XXXXX"
                defaultValue="REG-2024-78452"
              />
              <FormInput
                label="Tax / GST Number"
                id="gst-number"
                placeholder="e.g. 22AAAAA0000A1Z5"
                defaultValue="07AABCU9603R1ZM"
              />
            </div>
          </CardContent>
        </Card>

        {/* Section 3: Contact & Address */}
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-5">
              Contact & Address
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormInput
                label="Primary Phone"
                id="phone"
                type="tel"
                placeholder="+91 XXXXXXXXXX"
                defaultValue="+91 98765 43210"
              />
              <FormInput
                label="Email Address"
                id="email"
                type="email"
                placeholder="admin@clinic.com"
                defaultValue="admin@clinicos.in"
              />
            </div>
            <div className="mt-5 space-y-5">
              <FormInput
                label="Street Address"
                id="address"
                placeholder="Building, Street, Locality"
                defaultValue="42, Medicity Complex, Sector 15"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <FormInput
                  label="City"
                  id="city"
                  placeholder="e.g. New Delhi"
                  defaultValue="New Delhi"
                />
                <FormInput
                  label="State"
                  id="state"
                  placeholder="e.g. Delhi"
                  defaultValue="Delhi"
                />
                <FormInput
                  label="PIN Code"
                  id="pincode"
                  placeholder="e.g. 110001"
                  defaultValue="110075"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sticky Save Footer */}
      <div className="sticky bottom-0 left-0 right-0 z-10 -mx-6 -mb-6 border-t border-slate-100 bg-white/80 px-6 py-4 backdrop-blur-lg dark:border-slate-800 dark:bg-slate-900/80">
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Last saved: Today, 11:42 AM
          </p>
          <Button
            variant="default"
            size="md"
            className="cursor-pointer hover:-translate-y-px transition-all duration-200 shadow-md shadow-teal-500/15"
          >
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ─── Placeholder for other settings sub-pages ─── */
function SettingsPlaceholder({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-800/50 mb-4">
        <Database className="h-8 w-8 text-slate-300 dark:text-slate-600" />
      </div>
      <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-300">
        {title}
      </h2>
      <p className="mt-1.5 text-sm text-slate-400 dark:text-slate-500 max-w-xs">
        This settings panel will be available in a future update.
      </p>
    </div>
  );
}

/* ─── Main Settings View ─── */
export function SettingsView() {
  const [activeSection, setActiveSection] = React.useState("clinic-profile");

  const renderContent = () => {
    switch (activeSection) {
      case "clinic-profile":
        return <ClinicProfileContent />;
      case "user-management":
        return <UserManagementContent />;
      case "master-data":
        return <MasterDataContent />;
      default:
        return (
          <SettingsPlaceholder
            title={
              settingsNavItems.find((n) => n.id === activeSection)?.label ??
              "Settings"
            }
          />
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Settings & Configuration
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Manage your clinic&apos;s system preferences, profiles, and rules.
        </p>
      </div>

      {/* 2-Column Layout: Settings Nav + Content */}
      <div className="flex gap-6 min-h-[calc(100vh-14rem)]">
        {/* Left Inner Sidebar */}
        <Card className="w-[240px] shrink-0 shadow-sm self-start sticky top-0">
          <div className="p-3 space-y-1">
            {settingsNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all duration-200 cursor-pointer",
                    isActive
                      ? "bg-teal-50/70 text-teal-700 shadow-sm shadow-teal-500/5 dark:bg-teal-950/40 dark:text-teal-400"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4.5 w-4.5 shrink-0",
                      isActive
                        ? "text-teal-600 dark:text-teal-400"
                        : "text-slate-400 dark:text-slate-500"
                    )}
                  />
                  <span>{item.label}</span>
                  {isActive && (
                    <div className="ml-auto h-1.5 w-1.5 rounded-full bg-teal-500 animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        </Card>

        {/* Right Content Area */}
        <div className="flex-1 min-w-0">{renderContent()}</div>
      </div>
    </div>
  );
}
