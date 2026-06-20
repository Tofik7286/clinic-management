"use client";

import * as React from "react";
import {
  Calendar as CalendarIcon,
  ChevronDown,
  User,
  Heart,
  Activity,
  Thermometer,
  Percent,
  Plus,
  Trash2,
  Save,
  CheckCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Mock list of doctors
const doctorsList = [
  "All Doctors",
  "Dr. Sarah Sharma",
  "Dr. Abhinav Gupta",
  "Dr. Sneha Reddy",
];

// Mock Appointments Database
const initialAppointments = [
  {
    time: "09:00 AM",
    patient: "Priya Sharma",
    uhid: "UHID-90412",
    doctor: "Dr. Sarah Sharma",
    status: "Checked-in",
    statusVariant: "success" as const,
  },
  {
    time: "09:30 AM",
    patient: null,
    uhid: null,
    doctor: null,
    status: null,
  },
  {
    time: "10:00 AM",
    patient: "Aarav Patel",
    uhid: "UHID-90801",
    doctor: "Dr. Abhinav Gupta",
    status: "Scheduled",
    statusVariant: "info" as const,
  },
  {
    time: "10:30 AM",
    patient: "Amit Mishra",
    uhid: "UHID-90231",
    doctor: "Dr. Sneha Reddy",
    status: "Checked-in",
    statusVariant: "success" as const,
  },
  {
    time: "11:00 AM",
    patient: "Sunita Rao",
    uhid: "UHID-91112",
    doctor: "Dr. Sarah Sharma",
    status: "Scheduled",
    statusVariant: "info" as const,
  },
  {
    time: "11:30 AM",
    patient: "Rajesh Kumar",
    uhid: "UHID-90523",
    doctor: "Dr. Abhinav Gupta",
    status: "No Show",
    statusVariant: "danger" as const,
  },
  {
    time: "12:00 PM",
    patient: null,
    uhid: null,
    doctor: null,
    status: null,
  },
];

interface ClinicalViewProps {
  defaultTab?: "appointments" | "opd";
}

export function ClinicalView({ defaultTab = "appointments" }: ClinicalViewProps) {
  const [activeTab, setActiveTab] = React.useState<string>(defaultTab);

  // Sync tab active value when props change
  React.useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  // Appointments filter states
  const [selectedDoctor, setSelectedDoctor] = React.useState("All Doctors");
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date(2026, 5, 20)); // June 20, 2026
  const [showDatePicker, setShowDatePicker] = React.useState(false);

  // Calendar dates generation helper (for mock popover datepicker)
  const generateMonthDays = () => {
    const days = [];
    // Generating days for June 2026 (starts on Monday)
    for (let i = 1; i <= 30; i++) {
      days.push(new Date(2026, 5, i));
    }
    return days;
  };

  const monthDays = generateMonthDays();

  // Filtered Appointments
  const filteredAppointments = initialAppointments.map((appt) => {
    if (selectedDoctor !== "All Doctors" && appt.doctor !== selectedDoctor) {
      // If it doesn't match selected doctor, return empty slot representation
      return { ...appt, patient: null, uhid: null, doctor: null, status: null };
    }
    return appt;
  });

  // OPD Vitals & Prescription States
  const [symptoms, setSymptoms] = React.useState("Mild dry cough, sore throat, and low-grade fever for 3 days.");
  const [diagnosis, setDiagnosis] = React.useState("Acute Viral Upper Respiratory Tract Infection");
  const [medicineName, setMedicineName] = React.useState("");
  const [dosage, setDosage] = React.useState("1-0-1");
  const [duration, setDuration] = React.useState("5 Days");
  
  const [prescriptions, setPrescriptions] = React.useState([
    { id: 1, name: "Paracetamol 650mg", dosage: "1-0-1", duration: "3 Days" },
    { id: 2, name: "Amoxicillin 500mg", dosage: "1-1-1", duration: "5 Days" },
  ]);

  const [consultCompleted, setConsultCompleted] = React.useState(false);

  const handleAddMedicine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!medicineName) return;

    const newMed = {
      id: Date.now(),
      name: medicineName,
      dosage,
      duration,
    };

    setPrescriptions([...prescriptions, newMed]);
    setMedicineName("");
    setDosage("1-0-1");
    setDuration("5 Days");
  };

  const handleDeleteMed = (id: number) => {
    setPrescriptions(prescriptions.filter((p) => p.id !== id));
  };

  const handleCompleteConsultation = () => {
    setConsultCompleted(true);
    setTimeout(() => {
      setConsultCompleted(false);
      setSymptoms("");
      setDiagnosis("");
      setPrescriptions([]);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Clinical Operations
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage clinical agendas, time slots, scheduling, and doctor consultations.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        {/* Main Tab Headers */}
        <div className="border-b border-slate-100 dark:border-slate-800 pb-px">
          <TabsList className="mb-2">
            <TabsTrigger value="appointments" className="cursor-pointer">Appointments</TabsTrigger>
            <TabsTrigger value="opd" className="cursor-pointer">OPD Consultation</TabsTrigger>
          </TabsList>
        </div>

        {/* Tab 1: Appointments Scheduling View */}
        <TabsContent value="appointments">
          <div className="space-y-6">
            {/* Filter Top Bar */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm">
              <div className="flex flex-wrap items-center gap-3">
                {/* Custom Date Picker (Popover) */}
                <div className="relative">
                  <Button
                    variant="outline"
                    onClick={() => setShowDatePicker(!showDatePicker)}
                    className="h-10 cursor-pointer text-xs flex items-center gap-2"
                  >
                    <CalendarIcon className="h-4 w-4 text-slate-400" />
                    <span>
                      {selectedDate.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <ChevronDown className="h-3 w-3 text-slate-400" />
                  </Button>

                  {showDatePicker && (
                    <>
                      {/* Backdrop for closing */}
                      <div
                        className="fixed inset-0 z-40 bg-transparent"
                        onClick={() => setShowDatePicker(false)}
                      />
                      {/* Date Picker Grid Popover */}
                      <div className="absolute left-0 mt-2 z-50 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl dark:border-slate-800 dark:bg-slate-950 w-72 animate-in fade-in slide-in-from-top-2">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-bold text-slate-800 dark:text-white">
                            June 2026
                          </span>
                          <div className="flex gap-1">
                            <button className="p-1 cursor-pointer rounded-lg hover:bg-slate-50 text-slate-450 dark:hover:bg-slate-800">
                              <ChevronLeft className="h-4 w-4" />
                            </button>
                            <button className="p-1 cursor-pointer rounded-lg hover:bg-slate-50 text-slate-450 dark:hover:bg-slate-800">
                              <ChevronRight className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400 mb-2">
                          {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
                            <div key={day} className="py-1">
                              {day}
                            </div>
                          ))}
                        </div>
                        <div className="grid grid-cols-7 gap-1">
                          {monthDays.map((date, idx) => {
                            const isSelected =
                              date.getDate() === selectedDate.getDate() &&
                              date.getMonth() === selectedDate.getMonth();
                            return (
                              <button
                                key={idx}
                                onClick={() => {
                                  setSelectedDate(date);
                                  setShowDatePicker(false);
                                }}
                                className={`h-8 w-8 cursor-pointer rounded-lg text-xs font-semibold flex items-center justify-center transition-all ${
                                  isSelected
                                    ? "bg-teal-600 text-white font-bold"
                                    : "text-slate-700 hover:bg-slate-100/80 dark:text-slate-300 dark:hover:bg-slate-800"
                                }`}
                              >
                                {date.getDate()}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Doctor Filter Selection */}
                <div className="relative">
                  <select
                    value={selectedDoctor}
                    onChange={(e) => setSelectedDoctor(e.target.value)}
                    className="h-10 cursor-pointer rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 px-3 text-xs font-semibold text-slate-750 outline-none transition-all hover:border-slate-350 focus:border-teal-500"
                  >
                    {doctorsList.map((doc) => (
                      <option key={doc} value={doc}>
                        {doc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Day Agenda Status badge */}
              <div className="flex items-center gap-2">
                <Badge variant="success" className="px-2.5 py-1">
                  {selectedDoctor === "All Doctors" ? "4 Active Slots" : "Consultation Slots"}
                </Badge>
              </div>
            </div>

            {/* Time Agenda List */}
            <div className="space-y-4">
              {filteredAppointments.map((slot, i) => (
                <div key={i} className="flex gap-4 items-start">
                  {/* Time indicator (Left) */}
                  <div className="w-20 shrink-0 flex items-center justify-end gap-1.5 pt-4 text-xs font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{slot.time}</span>
                  </div>

                  {/* Divider line */}
                  <div className="self-stretch w-px bg-slate-100 dark:bg-slate-800 relative">
                    <div className="h-2 w-2 rounded-full bg-slate-300 absolute -left-1 top-5 ring-4 ring-slate-50 dark:ring-slate-950" />
                  </div>

                  {/* Scheduled Appointment Card or Empty slot (Right) */}
                  <div className="flex-1">
                    {slot.patient ? (
                      <Card className="hover:shadow-sm cursor-pointer hover:bg-slate-55/10 border-slate-150/60 dark:border-slate-800 transition-all duration-200">
                        <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div className="space-y-1">
                            <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
                              {slot.patient}
                              <span className="font-mono text-[10px] text-slate-400 font-medium">
                                ({slot.uhid})
                              </span>
                            </h3>
                            <p className="text-xs text-slate-500 font-semibold dark:text-slate-400">
                              Consulting with: <span className="text-teal-600 dark:text-teal-400">{slot.doctor}</span>
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant={slot.statusVariant}>{slot.status}</Badge>
                            <Button variant="outline" size="sm" className="h-8 text-[11px] cursor-pointer">
                              Check Vitals
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <div className="border border-dashed border-slate-200 rounded-xl bg-slate-50/20 p-4.5 text-center text-xs font-semibold text-slate-400 dark:border-slate-800 dark:bg-slate-900/30">
                        No Appointment Scheduled
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Tab 2: OPD Consultation Workspace */}
        <TabsContent value="opd">
          {consultCompleted ? (
            <Card className="border border-slate-100 dark:border-slate-800">
              <CardContent className="p-12 text-center flex flex-col items-center justify-center animate-in zoom-in-95 duration-300">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 mb-4">
                  <CheckCircle className="h-7 w-7 animate-bounce" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                  Consultation Completed Successfully!
                </h3>
                <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
                  Prescriptions generated and saved to electronic health records.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
              {/* Left Panel: Patient Details (1/3 width) */}
              <Card className="lg:col-span-1 h-fit">
                <CardHeader>
                  <CardTitle className="text-sm font-bold flex items-center gap-2">
                    <User className="h-4.5 w-4.5 text-teal-600" />
                    Patient Profile
                  </CardTitle>
                  <CardDescription>Active consultation records</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Basic Demographics */}
                  <div className="pb-4 border-b border-slate-50 dark:border-slate-800/80">
                    <h3 className="text-base font-bold text-slate-800 dark:text-white">
                      Priyanka Patel
                    </h3>
                    <p className="text-xs font-semibold text-slate-400 mt-1">
                      31 / Female • <span className="font-mono">UHID-91309</span>
                    </p>
                  </div>

                  {/* Vitals Summary Grid */}
                  <div className="grid gap-3 grid-cols-2">
                    {[
                      {
                        title: "Blood Pressure",
                        value: "120/80",
                        unit: "mmHg",
                        icon: Heart,
                        color: "text-rose-500 bg-rose-50/50 dark:bg-rose-950/20",
                      },
                      {
                        title: "Pulse Rate",
                        value: "72",
                        unit: "bpm",
                        icon: Activity,
                        color: "text-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20",
                      },
                      {
                        title: "Temperature",
                        value: "98.6",
                        unit: "°F",
                        icon: Thermometer,
                        color: "text-amber-500 bg-amber-50/50 dark:bg-amber-950/20",
                      },
                      {
                        title: "Oxygen SpO2",
                        value: "98",
                        unit: "%",
                        icon: Percent,
                        color: "text-sky-500 bg-sky-50/50 dark:bg-sky-950/20",
                      },
                    ].map((vital, i) => {
                      const Icon = vital.icon;
                      return (
                        <div
                          key={i}
                          className="rounded-xl border border-slate-100 bg-slate-50/20 p-3 dark:border-slate-800/40"
                        >
                          <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            <span>{vital.title}</span>
                            <div className={`rounded p-1 ${vital.color}`}>
                              <Icon className="h-3.5 w-3.5" />
                            </div>
                          </div>
                          <div className="mt-2.5 flex items-baseline gap-1">
                            <span className="text-base font-bold text-slate-800 dark:text-white">
                              {vital.value}
                            </span>
                            <span className="text-[10px] font-semibold text-slate-400">
                              {vital.unit}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Right Panel: Doctor Consultation interface (2/3 width) */}
              <div className="lg:col-span-2 space-y-6">
                <Accordion defaultValue="symptoms">
                  {/* Accordion Item 1: Symptoms & Diagnosis */}
                  <AccordionItem value="symptoms">
                    <AccordionTrigger>Symptoms & Diagnosis</AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                          Chief Complaints / Symptoms
                        </label>
                        <textarea
                          rows={3}
                          value={symptoms}
                          onChange={(e) => setSymptoms(e.target.value)}
                          placeholder="Describe symptoms, complaints, and timeline..."
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/30 p-3 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 hover:border-slate-350 focus:border-teal-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-100"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                          Final Clinical Diagnosis
                        </label>
                        <textarea
                          rows={2}
                          value={diagnosis}
                          onChange={(e) => setDiagnosis(e.target.value)}
                          placeholder="Enter final diagnosis..."
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/30 p-3 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 hover:border-slate-355 focus:border-teal-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-100"
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Accordion Item 2: Prescription Builder */}
                  <AccordionItem value="prescriptions">
                    <AccordionTrigger>Prescription Builder</AccordionTrigger>
                    <AccordionContent className="space-y-6">
                      {/* Form Row */}
                      <form onSubmit={handleAddMedicine} className="grid gap-3 grid-cols-1 sm:grid-cols-4 items-end bg-slate-50/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800/80">
                        <div className="sm:col-span-2 space-y-1.5">
                          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                            Medicine Name
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Paracetamol 650mg"
                            value={medicineName}
                            onChange={(e) => setMedicineName(e.target.value)}
                            className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 hover:border-slate-350 focus:border-teal-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                            Dosage
                          </label>
                          <select
                            value={dosage}
                            onChange={(e) => setDosage(e.target.value)}
                            className="h-10 w-full cursor-pointer rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-955 px-2.5 text-sm text-slate-700 outline-none transition-all hover:border-slate-350 focus:border-teal-500"
                          >
                            <option value="1-0-1">1-0-1 (Morning, Night)</option>
                            <option value="1-1-1">1-1-1 (Thrice a day)</option>
                            <option value="0-0-1">0-0-1 (Bedtime)</option>
                            <option value="1-0-0">1-0-0 (Morning only)</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                            Duration
                          </label>
                          <div className="flex gap-2">
                            <select
                              value={duration}
                              onChange={(e) => setDuration(e.target.value)}
                              className="h-10 w-full cursor-pointer rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-955 px-2.5 text-sm text-slate-700 outline-none transition-all hover:border-slate-350 focus:border-teal-500"
                            >
                              <option value="3 Days">3 Days</option>
                              <option value="5 Days">5 Days</option>
                              <option value="1 Week">1 Week</option>
                              <option value="2 Weeks">2 Weeks</option>
                              <option value="1 Month">1 Month</option>
                            </select>
                            <Button
                              type="submit"
                              variant="default"
                              size="icon"
                              className="h-10 w-10 shrink-0 cursor-pointer"
                              aria-label="Add medicine"
                            >
                              <Plus className="h-4.5 w-4.5 text-white" />
                            </Button>
                          </div>
                        </div>
                      </form>

                      {/* Prescriptions List Table */}
                      <div className="border border-slate-100 rounded-xl overflow-hidden dark:border-slate-850">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="pl-4">Medicine Name</TableHead>
                              <TableHead>Dosage</TableHead>
                              <TableHead>Duration</TableHead>
                              <TableHead className="pr-4 text-right">Remove</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {prescriptions.length > 0 ? (
                              prescriptions.map((med) => (
                                <TableRow key={med.id}>
                                  <TableCell className="font-bold text-slate-800 dark:text-slate-200 pl-4">
                                    {med.name}
                                  </TableCell>
                                  <TableCell className="font-semibold text-slate-550 dark:text-slate-350">
                                    {med.dosage}
                                  </TableCell>
                                  <TableCell className="text-slate-500 font-medium">
                                    {med.duration}
                                  </TableCell>
                                  <TableCell className="pr-4 text-right">
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteMed(med.id)}
                                      className="rounded-xl p-1.5 cursor-pointer hover:bg-red-50 text-slate-400 hover:text-red-650 transition-colors"
                                      aria-label="Delete prescription"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  </TableCell>
                                </TableRow>
                              ))
                            ) : (
                              <TableRow>
                                <TableCell colSpan={4} className="h-20 text-center text-slate-400 font-semibold text-xs">
                                  No medicines added to the prescription yet.
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* Footer clinical actions */}
                <div className="flex items-center justify-end gap-3 border-t border-slate-50 dark:border-slate-850 pt-5">
                  <Button
                    variant="outline"
                    className="h-10 cursor-pointer text-xs"
                    onClick={() => alert("Draft saved successfully.")}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Draft
                  </Button>
                  <Button
                    variant="default"
                    className="h-10 cursor-pointer text-xs"
                    onClick={handleCompleteConsultation}
                  >
                    <CheckCircle className="mr-2 h-4 w-4 text-white" />
                    Complete Consultation
                  </Button>
                </div>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
