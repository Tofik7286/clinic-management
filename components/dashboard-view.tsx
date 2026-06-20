"use client";

import * as React from "react";
import {
  IndianRupee,
  Users,
  Bed,
  Activity,
  UserPlus,
  Calendar,
  LogIn,
  TrendingUp,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export function DashboardView() {
  // Mock recent appointments data
  const appointments = [
    {
      name: "Amit Patel",
      uhid: "UHID-10824",
      doctor: "Dr. Sarah Sharma",
      time: "10:15 AM",
      status: "In Consultation",
      statusVariant: "info" as const,
    },
    {
      name: "Priyan Singh",
      uhid: "UHID-11029",
      doctor: "Dr. Sarah Sharma",
      time: "10:30 AM",
      status: "Waiting",
      statusVariant: "warning" as const,
    },
    {
      name: "Rajesh Verma",
      uhid: "UHID-10492",
      doctor: "Dr. Abhinav Gupta",
      time: "09:45 AM",
      status: "Completed",
      statusVariant: "success" as const,
    },
    {
      name: "Meera Nair",
      uhid: "UHID-10901",
      doctor: "Dr. Sneha Reddy",
      time: "10:45 AM",
      status: "Waiting",
      statusVariant: "warning" as const,
    },
    {
      name: "David D'Souza",
      uhid: "UHID-10356",
      doctor: "Dr. Abhinav Gupta",
      time: "09:30 AM",
      status: "Completed",
      statusVariant: "success" as const,
    },
  ];

  // Mock bed occupancy data
  const wards = [
    {
      name: "General Ward",
      occupancy: 80,
      filled: 32,
      total: 40,
      color: "bg-teal-500",
      textClass: "text-teal-600 dark:text-teal-400",
    },
    {
      name: "ICU",
      occupancy: 100,
      filled: 10,
      total: 10,
      color: "bg-rose-500",
      textClass: "text-rose-600 dark:text-rose-400",
      alert: "At Capacity",
    },
    {
      name: "Private Rooms",
      occupancy: 40,
      filled: 4,
      total: 10,
      color: "bg-sky-500",
      textClass: "text-sky-600 dark:text-sky-400",
    },
    {
      name: "Pediatric Ward",
      occupancy: 60,
      filled: 6,
      total: 10,
      color: "bg-amber-500",
      textClass: "text-amber-600 dark:text-amber-400",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Dashboard Overview
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Welcome back, Dr. Admin. Here is today's summary.
          </p>
        </div>

        {/* Quick Actions Row */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Button variant="outline" className="h-10 text-xs">
            <LogIn className="mr-2 h-4 w-4 text-slate-550 dark:text-slate-400" />
            Admit to IPD
          </Button>
          <Button variant="secondary" className="h-10 text-xs">
            <Calendar className="mr-2 h-4 w-4 text-slate-550 dark:text-slate-400" />
            Schedule Appointment
          </Button>
          <Button variant="default" className="h-10 text-xs">
            <UserPlus className="mr-2 h-4 w-4 text-white" />
            New Patient
          </Button>
        </div>
      </div>

      {/* KPI Metric Cards (Top Row) */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {/* Today's Revenue */}
        <Card className="hover:scale-[1.01]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider dark:text-slate-500">
                Today's Revenue
              </span>
              <div className="rounded-xl bg-teal-50 p-2.5 text-teal-600 dark:bg-teal-950/40 dark:text-teal-400">
                <IndianRupee className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-2xl font-bold text-slate-800 dark:text-white">
                ₹45,200
              </span>
              <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <TrendingUp className="h-3.5 w-3.5" />
                <span>+12% from yesterday</span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* OPD Patients */}
        <Card className="hover:scale-[1.01]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider dark:text-slate-500">
                OPD Patients
              </span>
              <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                <Users className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-2xl font-bold text-slate-800 dark:text-white">
                84
              </span>
              <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-950/30 px-2 py-0.5 rounded-full w-max">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span>5 waiting in queue</span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Available Beds */}
        <Card className="hover:scale-[1.01]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider dark:text-slate-500">
                Available Beds
              </span>
              <div className="rounded-xl bg-rose-50 p-2.5 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400">
                <Bed className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-2xl font-bold text-slate-800 dark:text-white">
                12 / 50
              </span>
              <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                <AlertCircle className="h-3.5 w-3.5 text-slate-400" />
                <span>3 pending discharge</span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* New Admissions */}
        <Card className="hover:scale-[1.01]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider dark:text-slate-500">
                New Admissions
              </span>
              <div className="rounded-xl bg-purple-50 p-2.5 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400">
                <Activity className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-2xl font-bold text-slate-800 dark:text-white">
                8
              </span>
              <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                <CheckCircle className="h-3.5 w-3.5 text-slate-400" />
                <span>Admissions today</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Split (Bottom Section) */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Left Column - Recent OPD Appointments */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent OPD Appointments</CardTitle>
            <CardDescription>
              List of patients currently in waiting, consultation, or completed stages.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Patient Name</TableHead>
                  <TableHead>UHID</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead className="pr-6 text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.map((appt, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-bold text-slate-800 dark:text-slate-200 pl-6">
                      {appt.name}
                    </TableCell>
                    <TableCell className="font-mono text-xs text-slate-500">
                      {appt.uhid}
                    </TableCell>
                    <TableCell className="font-semibold text-slate-600 dark:text-slate-300">
                      {appt.doctor}
                    </TableCell>
                    <TableCell className="text-slate-500">{appt.time}</TableCell>
                    <TableCell className="pr-6 text-right">
                      <Badge variant={appt.statusVariant}>{appt.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Right Column - Bed Occupancy Summary */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Bed Occupancy Summary</CardTitle>
            <CardDescription>
              Current occupancy status categorized by specialized hospital wards.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {wards.map((ward, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span className="text-slate-700 dark:text-slate-300">
                    {ward.name}
                  </span>
                  <div className="flex items-center gap-2">
                    {ward.alert && (
                      <Badge variant="danger" className="py-0 px-1.5 text-[10px]">
                        {ward.alert}
                      </Badge>
                    )}
                    <span className="text-slate-400">
                      {ward.filled}/{ward.total} Beds
                    </span>
                    <span className={ward.textClass}>({ward.occupancy}%)</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${ward.color}`}
                    style={{ width: `${ward.occupancy}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
