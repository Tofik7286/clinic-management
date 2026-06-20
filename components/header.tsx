"use client";

import * as React from "react";
import {
  Bell,
  Search,
  Menu,
  User,
  Settings,
  HelpCircle,
  LogOut,
  Sparkles,
  Command,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Dropdown, DropdownItem, DropdownSeparator } from "@/components/ui/dropdown";

interface HeaderProps {
  onMenuClick: () => void;
  className?: string;
}

export function Header({ onMenuClick, className }: HeaderProps) {
  const [hasNotifications, setHasNotifications] = React.useState(true);

  return (
    <header
      className={`sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-slate-100 bg-white/80 px-6 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80 ${className}`}
    >
      {/* Left side: Hamburger Trigger & Search */}
      <div className="flex flex-1 items-center gap-4">
        {/* Mobile menu trigger */}
        <button
          onClick={onMenuClick}
          className="rounded-xl p-2 text-slate-500 hover:bg-slate-50 lg:hidden dark:text-slate-400 dark:hover:bg-slate-800"
          aria-label="Toggle menu"
        >
          <Menu className="h-5.5 w-5.5" />
        </button>

        {/* Global Search Bar */}
        <div className="relative w-full max-w-md hidden sm:block">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4.5 w-4.5 text-slate-400 dark:text-slate-500" />
          </div>
          <input
            type="search"
            placeholder="Search patients, medical records, or bills..."
            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-12 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-100 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-100 dark:hover:border-slate-700 dark:focus:border-teal-500 dark:focus:bg-slate-950 dark:focus:ring-teal-950/50"
          />
          <div className="absolute inset-y-0 right-3 flex items-center gap-0.5">
            <span className="flex h-5 items-center gap-0.5 rounded border border-slate-200 bg-white px-1.5 text-[10px] font-semibold text-slate-400 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <Command className="h-2.5 w-2.5" />
              <span>K</span>
            </span>
          </div>
        </div>
      </div>

      {/* Right side: Notification + User Settings */}
      <div className="flex items-center gap-4">
        {/* Mobile Search Button (visible on mobile only) */}
        <button
          className="rounded-xl p-2 text-slate-500 hover:bg-slate-50 sm:hidden dark:text-slate-400 dark:hover:bg-slate-800"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </button>

        {/* Notifications Icon */}
        <button
          onClick={() => setHasNotifications(false)}
          className="relative rounded-xl p-2.5 text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          {hasNotifications && (
            <span className="absolute right-2.5 top-2.5 flex h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
          )}
        </button>

        {/* Vertical Divider */}
        <div className="h-6 w-px bg-slate-100 dark:bg-slate-800" />

        {/* User Profile Dropdown */}
        <Dropdown
          align="right"
          trigger={
            <button className="flex items-center gap-3 rounded-xl p-1.5 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 text-left transition-colors focus:outline-none">
              <Avatar fallback="DA" className="h-9 w-9 border-teal-100" />
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-none">
                  Dr. Admin
                </p>
                <p className="mt-1 text-[11px] font-medium text-slate-400 leading-none">
                  Administrator
                </p>
              </div>
            </button>
          }
        >
          {/* Dropdown Menu Items */}
          <div className="px-4 py-2 border-b border-slate-50 dark:border-slate-800/50 mb-1">
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500">Signed in as</p>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate mt-0.5">
              admin@clinicos.com
            </p>
          </div>
          <DropdownItem icon={<User className="h-4 w-4" />}>My Profile</DropdownItem>
          <DropdownItem icon={<Settings className="h-4 w-4" />}>Account Settings</DropdownItem>
          <DropdownItem icon={<HelpCircle className="h-4 w-4" />}>Help & Support</DropdownItem>
          <DropdownSeparator />
          <DropdownItem icon={<Sparkles className="h-4 w-4 text-amber-500" />}>
            Upgrade Plan
          </DropdownItem>
          <DropdownSeparator />
          <DropdownItem icon={<LogOut className="h-4 w-4" />} variant="danger">
            Sign out
          </DropdownItem>
        </Dropdown>
      </div>
    </header>
  );
}
