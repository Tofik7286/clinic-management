"use client";

import * as React from "react";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Stethoscope,
  Bed,
  Layers,
  Receipt,
  Pill,
  FileBarChart,
  Settings,
  Plus,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface NavItem {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

export const navItems: NavItem[] = [
  { title: "Dashboard", icon: LayoutDashboard, href: "#dashboard" },
  { title: "Patients", icon: Users, href: "#patients" },
  { title: "Appointments", icon: Calendar, href: "#appointments" },
  { title: "OPD", icon: Stethoscope, href: "#opd" },
  { title: "IPD Admissions", icon: Bed, href: "#ipd" },
  { title: "Bed Board", icon: Layers, href: "#bed-board" },
  { title: "Billing", icon: Receipt, href: "#billing" },
  { title: "Pharmacy", icon: Pill, href: "#pharmacy" },
  { title: "Reports", icon: FileBarChart, href: "#reports" },
  { title: "Settings", icon: Settings, href: "#settings" },
];

interface SidebarProps {
  activeItem: string;
  setActiveItem: (title: string) => void;
  className?: string;
  onCloseMobile?: () => void;
}

export function Sidebar({ activeItem, setActiveItem, className, onCloseMobile }: SidebarProps) {
  return (
    <aside
      className={cn(
        "flex h-full w-[280px] flex-col border-r border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-900",
        className
      )}
    >
      {/* Brand Logo Area */}
      <div className="flex h-16 items-center justify-between px-6 border-b border-slate-50 dark:border-slate-800/50">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-teal-600 to-cyan-500 shadow-md shadow-teal-500/20">
            <Plus className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">
            Clinic<span className="bg-gradient-to-r from-teal-600 to-cyan-500 bg-clip-text text-transparent">OS</span>
          </span>
        </div>
        {/* Mobile close button */}
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-50 hover:text-slate-600 lg:hidden dark:hover:bg-slate-800"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.title;

          return (
            <a
              key={item.title}
              href={item.href}
              onClick={(e) => {
                // If it's a local anchor link, prevent default and trigger active state
                e.preventDefault();
                setActiveItem(item.title);
                if (onCloseMobile) {
                  onCloseMobile();
                }
              }}
              className={cn(
                "group flex items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200",
                isActive
                  ? "bg-teal-50/70 text-teal-700 shadow-sm shadow-teal-500/5 dark:bg-teal-950/40 dark:text-teal-400"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-200"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-105",
                  isActive
                    ? "text-teal-600 dark:text-teal-400"
                    : "text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300"
                )}
              />
              <span className="flex-1">{item.title}</span>
              {isActive && (
                <div className="h-1.5 w-1.5 rounded-full bg-teal-500 animate-pulse" />
              )}
            </a>
          );
        })}
      </div>

      {/* User Status Summary / Info Badge Footer */}
      <div className="border-t border-slate-50 p-4 dark:border-slate-800/50">
        <div className="flex items-center gap-3 rounded-xl bg-slate-50/50 p-3 dark:bg-slate-800/30">
          <div className="relative">
            <div className="h-2 w-2 rounded-full bg-emerald-500 absolute -right-0.5 -top-0.5 ring-2 ring-white dark:ring-slate-900" />
            <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center text-xs font-bold text-teal-700 dark:bg-teal-950 dark:text-teal-400">
              H1
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">Hospital Wing A</p>
            <p className="text-[10px] text-slate-400 font-medium truncate">Server status: Active</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
