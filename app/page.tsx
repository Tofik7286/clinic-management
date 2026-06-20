"use client";

import * as React from "react";
import { AppShell } from "@/components/app-shell";
import { DashboardView } from "@/components/dashboard-view";
import { PatientView } from "@/components/patient-view";
import { ClinicalView } from "@/components/clinical-view";
import { IpdView } from "@/components/ipd-view";
import { ComingSoon } from "@/components/coming-soon";
import { SettingsView } from "@/components/settings-view";

export default function Home() {
  return (
    <AppShell>
      {({ activeItem, setActiveItem }) => {
        // Dashboard
        if (activeItem === "Dashboard") {
          return <DashboardView />;
        }

        // Patient Management
        if (activeItem === "Patients") {
          return <PatientView />;
        }

        // Clinical Operations — Appointments
        if (activeItem === "Appointments") {
          return <ClinicalView defaultTab="appointments" />;
        }

        // Clinical Operations — OPD
        if (activeItem === "OPD") {
          return <ClinicalView defaultTab="opd" />;
        }

        // IPD — Admission Form
        if (activeItem === "IPD Admissions") {
          return <IpdView defaultTab="admission" />;
        }

        // IPD — Bed Board
        if (activeItem === "Bed Board") {
          return <IpdView defaultTab="bed-board" />;
        }

        // Settings & Configuration
        if (activeItem === "Settings") {
          return <SettingsView />;
        }

        // Coming Soon placeholder for remaining modules
        if (["Billing", "Pharmacy", "Reports"].includes(activeItem)) {
          return (
            <ComingSoon
              moduleName={activeItem}
              onGoBack={() => setActiveItem("Dashboard")}
            />
          );
        }

        // Fallback
        return (
          <ComingSoon
            moduleName={activeItem}
            onGoBack={() => setActiveItem("Dashboard")}
          />
        );
      }}
    </AppShell>
  );
}
