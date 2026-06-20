"use client";

import * as React from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";

interface AppShellProps {
  children: (context: { activeItem: string; setActiveItem: (item: string) => void }) => React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [activeItem, setActiveItem] = React.useState("Dashboard");
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  // Close mobile menu when screen size expands to desktop sizes
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 font-sans text-slate-800 dark:bg-slate-950 dark:text-slate-200">
      {/* Desktop Sidebar (Fixed Left Panel) */}
      <Sidebar
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        className="hidden lg:flex lg:shrink-0"
      />

      {/* Mobile Sidebar Overlay (Drawer Menu) */}
      {isMobileOpen && (
        <div className="relative z-50 lg:hidden">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
            onClick={() => setIsMobileOpen(false)}
          />

          {/* Drawer Content */}
          <div className="fixed inset-y-0 left-0 flex w-[280px] max-w-xs transform bg-white transition-transform duration-300 ease-out animate-in slide-in-from-left">
            <Sidebar
              activeItem={activeItem}
              setActiveItem={setActiveItem}
              onCloseMobile={() => setIsMobileOpen(false)}
              className="w-full"
            />
          </div>
        </div>
      )}

      {/* Main Right Side Content Container */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <Header onMenuClick={() => setIsMobileOpen(true)} className="shrink-0" />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-slate-50 p-6 dark:bg-slate-950/60">
          <div className="mx-auto max-w-7xl">
            {children({ activeItem, setActiveItem })}
          </div>
        </main>
      </div>
    </div>
  );
}
