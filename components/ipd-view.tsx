"use client";

import * as React from "react";
import {
  Bed,
  Filter,
  UserCheck,
  Search,
  Calendar,
  Clock,
  User,
  ShieldAlert,
  CreditCard,
  PlusCircle,
  TrendingUp,
  Activity,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface BedInfo {
  id: string;
  ward: string;
  status: string;
  patient: string | null;
  uhid: string | null;
  doctor: string | null;
  bgClass: string;
  badgeVariant: "success" | "warning" | "danger" | "secondary" | "default" | "info";
}

// Mock data for initial beds list
const initialBeds: BedInfo[] = [
  { id: "ICU-01", ward: "ICU", status: "Occupied", patient: "Rajesh Kumar", uhid: "UHID-90523", doctor: "Dr. Abhinav Gupta", bgClass: "bg-rose-50/50 border-rose-100 hover:border-rose-300 dark:bg-rose-950/20 dark:border-rose-900/30", badgeVariant: "danger" },
  { id: "ICU-02", ward: "ICU", status: "Available", patient: null, uhid: null, doctor: null, bgClass: "bg-emerald-50/50 border-emerald-100 hover:border-emerald-300 dark:bg-emerald-950/20 dark:border-emerald-900/30", badgeVariant: "success" },
  { id: "ICU-03", ward: "ICU", status: "Cleaning", patient: null, uhid: null, doctor: null, bgClass: "bg-amber-50/50 border-amber-100 hover:border-amber-300 dark:bg-amber-950/20 dark:border-amber-900/30", badgeVariant: "warning" },
  { id: "GEN-01", ward: "General", status: "Occupied", patient: "Aarav Sharma", uhid: "UHID-90412", doctor: "Dr. Sarah Sharma", bgClass: "bg-rose-50/50 border-rose-100 hover:border-rose-300 dark:bg-rose-950/20 dark:border-rose-900/30", badgeVariant: "danger" },
  { id: "GEN-02", ward: "General", status: "Available", patient: null, uhid: null, doctor: null, bgClass: "bg-emerald-50/50 border-emerald-100 hover:border-emerald-300 dark:bg-emerald-950/20 dark:border-emerald-900/30", badgeVariant: "success" },
  { id: "GEN-03", ward: "General", status: "Available", patient: null, uhid: null, doctor: null, bgClass: "bg-emerald-50/50 border-emerald-100 hover:border-emerald-300 dark:bg-emerald-950/20 dark:border-emerald-900/30", badgeVariant: "success" },
  { id: "GEN-04", ward: "General", status: "Occupied", patient: "Priyanka Patel", uhid: "UHID-91309", doctor: "Dr. Sarah Sharma", bgClass: "bg-rose-50/50 border-rose-100 hover:border-rose-300 dark:bg-rose-950/20 dark:border-rose-900/30", badgeVariant: "danger" },
  { id: "GEN-05", ward: "General", status: "Cleaning", patient: null, uhid: null, doctor: null, bgClass: "bg-amber-50/50 border-amber-100 hover:border-amber-300 dark:bg-amber-950/20 dark:border-amber-900/30", badgeVariant: "warning" },
  { id: "GEN-06", ward: "General", status: "Available", patient: null, uhid: null, doctor: null, bgClass: "bg-emerald-50/50 border-emerald-100 hover:border-emerald-300 dark:bg-emerald-950/20 dark:border-emerald-900/30", badgeVariant: "success" },
  { id: "PRI-01", ward: "Private", status: "Occupied", patient: "Sunita Rao", uhid: "UHID-91112", doctor: "Dr. Sneha Reddy", bgClass: "bg-rose-50/50 border-rose-100 hover:border-rose-300 dark:bg-rose-950/20 dark:border-rose-900/30", badgeVariant: "danger" },
  { id: "PRI-02", ward: "Private", status: "Available", patient: null, uhid: null, doctor: null, bgClass: "bg-emerald-50/50 border-emerald-100 hover:border-emerald-300 dark:bg-emerald-950/20 dark:border-emerald-900/30", badgeVariant: "success" },
  { id: "PRI-03", ward: "Private", status: "Available", patient: null, uhid: null, doctor: null, bgClass: "bg-emerald-50/50 border-emerald-100 hover:border-emerald-300 dark:bg-emerald-950/20 dark:border-emerald-900/30", badgeVariant: "success" },
];

// Mock existing patients list for combobox
const existingPatients = [
  { name: "Amit Patel", uhid: "UHID-10824" },
  { name: "Priyan Singh", uhid: "UHID-11029" },
  { name: "Meera Nair", uhid: "UHID-10901" },
  { name: "David D'Souza", uhid: "UHID-10356" },
  { name: "Pooja Hegde", uhid: "UHID-12093" },
];

const doctorsList = ["Dr. Sarah Sharma", "Dr. Abhinav Gupta", "Dr. Sneha Reddy"];

interface IpdViewProps {
  defaultTab?: "bed-board" | "admission";
}

export function IpdView({ defaultTab = "bed-board" }: IpdViewProps) {
  const [activeTab, setActiveTab] = React.useState<string>(defaultTab);

  // Sync tab active value when props change
  React.useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  const [selectedWard, setSelectedWard] = React.useState("All Wards");
  const [beds, setBeds] = React.useState(initialBeds);
  const [selectedBed, setSelectedBed] = React.useState<typeof initialBeds[0] | null>(null);

  // Form states
  const [patientSearch, setPatientSearch] = React.useState("");
  const [admissionDate, setAdmissionDate] = React.useState("");
  const [expectedStay, setExpectedStay] = React.useState("5");
  const [assignedDoc, setAssignedDoc] = React.useState(doctorsList[0]);
  const [admissionWard, setAdmissionWard] = React.useState("General");
  const [admissionBed, setAdmissionBed] = React.useState("");
  const [advanceDeposit, setAdvanceDeposit] = React.useState("5000");
  const [paymentMode, setPaymentMode] = React.useState("UPI");
  const [insuranceProvider, setInsuranceProvider] = React.useState("");
  
  const [admissionSuccess, setAdmissionSuccess] = React.useState(false);

  // Filter available beds for select dropdown in form based on selected ward
  const availableBedsForForm = beds.filter(
    (b) => b.ward === admissionWard && b.status === "Available"
  );

  // Set default bed number when admission ward changes
  React.useEffect(() => {
    if (availableBedsForForm.length > 0) {
      setAdmissionBed(availableBedsForForm[0].id);
    } else {
      setAdmissionBed("");
    }
  }, [admissionWard]);

  // Filters Bed Board grid
  const filteredBeds = beds.filter(
    (b) => selectedWard === "All Wards" || b.ward === selectedWard
  );

  // Counts legend summaries
  const availableCount = filteredBeds.filter((b) => b.status === "Available").length;
  const occupiedCount = filteredBeds.filter((b) => b.status === "Occupied").length;
  const cleaningCount = filteredBeds.filter((b) => b.status === "Cleaning").length;

  const handleAdmissionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientSearch || !admissionBed) {
      alert("Please select a patient and an available bed.");
      return;
    }

    // Update beds array state to show bed as occupied
    const patientName = patientSearch.split(" (")[0];
    const patientUhid = patientSearch.includes(" (") 
      ? patientSearch.split(" (")[1].replace(")", "") 
      : `UHID-${Math.floor(10000 + Math.random() * 90000)}`;

    setBeds(
      beds.map((b) => {
        if (b.id === admissionBed) {
          return {
            ...b,
            status: "Occupied",
            patient: patientName,
            uhid: patientUhid,
            doctor: assignedDoc,
            bgClass: "bg-rose-50/50 border-rose-100 hover:border-rose-300 dark:bg-rose-950/20 dark:border-rose-900/30",
            badgeVariant: "danger" as const,
          };
        }
        return b;
      })
    );

    setAdmissionSuccess(true);
    
    // Clear form
    setPatientSearch("");
    setInsuranceProvider("");
    setAdvanceDeposit("5000");

    setTimeout(() => {
      setAdmissionSuccess(false);
      setActiveTab("bed-board");
    }, 2000);
  };

  const handleQuickDischarge = (bedId: string) => {
    setBeds(
      beds.map((b) => {
        if (b.id === bedId) {
          return {
            ...b,
            status: "Cleaning",
            patient: null,
            uhid: null,
            doctor: null,
            bgClass: "bg-amber-50/50 border-amber-100 hover:border-amber-300 dark:bg-amber-950/20 dark:border-amber-900/30",
            badgeVariant: "warning" as const,
          };
        }
        return b;
      })
    );
    setSelectedBed(null);
  };

  const handleCompleteCleaning = (bedId: string) => {
    setBeds(
      beds.map((b) => {
        if (b.id === bedId) {
          return {
            ...b,
            status: "Available",
            bgClass: "bg-emerald-50/50 border-emerald-100 hover:border-emerald-300 dark:bg-emerald-950/20 dark:border-emerald-900/30",
            badgeVariant: "success" as const,
          };
        }
        return b;
      })
    );
    setSelectedBed(null);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Inpatient Department (IPD)
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Monitor ward occupancies, schedule bed board cleanings, and allocate admissions.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        {/* Tabs triggers */}
        <div className="border-b border-slate-100 dark:border-slate-800 pb-px">
          <TabsList className="mb-2">
            <TabsTrigger value="bed-board" className="cursor-pointer">Bed Board</TabsTrigger>
            <TabsTrigger value="admission" className="cursor-pointer">New Admission</TabsTrigger>
          </TabsList>
        </div>

        {/* Tab 1: Bed Board */}
        <TabsContent value="bed-board">
          <div className="space-y-6">
            {/* Top Bar Filters and Legend */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-3">
                <select
                  value={selectedWard}
                  onChange={(e) => {
                    setSelectedWard(e.target.value);
                    setSelectedBed(null);
                  }}
                  className="h-10 cursor-pointer rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 px-3.5 text-xs font-semibold text-slate-750 outline-none transition-all hover:border-slate-350 focus:border-teal-500"
                >
                  <option value="All Wards">All Wards</option>
                  <option value="General">General Ward</option>
                  <option value="ICU">ICU Ward</option>
                  <option value="Private">Private Rooms</option>
                </select>
              </div>

              {/* Counts legend */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-100 dark:border-slate-800">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span>Available: {availableCount}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-100 dark:border-slate-800">
                  <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                  <span>Occupied: {occupiedCount}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-100 dark:border-slate-800">
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                  <span>Cleaning: {cleaningCount}</span>
                </div>
              </div>
            </div>

            {/* Split layout: Bed Grid (left) + Bed Details Inspector (right, if selected) */}
            <div className="grid gap-6 grid-cols-1 xl:grid-cols-4">
              <div className={selectedBed ? "xl:col-span-3" : "xl:col-span-4"}>
                {/* Beds Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {filteredBeds.map((bedItem) => (
                    <Card
                      key={bedItem.id}
                      onClick={() => setSelectedBed(bedItem)}
                      className={`cursor-pointer border select-none transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${
                        bedItem.bgClass
                      } ${selectedBed?.id === bedItem.id ? "ring-2 ring-teal-500 ring-offset-2 dark:ring-offset-slate-950" : ""}`}
                    >
                      <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-3">
                        <div className="rounded-xl bg-white dark:bg-slate-900 p-2.5 shadow-sm border border-slate-100 dark:border-slate-800/80">
                          <Bed className="h-5.5 w-5.5 text-slate-500 dark:text-slate-400" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800 dark:text-white leading-none">
                            {bedItem.id}
                          </p>
                          <p className="text-[10px] font-semibold text-slate-400 mt-1 uppercase tracking-wide">
                            {bedItem.ward}
                          </p>
                        </div>
                        <Badge variant={bedItem.badgeVariant} className="px-2 py-0.5 text-[10px]">
                          {bedItem.status}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Bed Details Side Inspector */}
              {selectedBed && (
                <div className="xl:col-span-1 animate-in slide-in-from-right duration-250">
                  <Card className="h-full border border-slate-200 dark:border-slate-800 bg-white">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-bold flex items-center gap-2">
                          <Activity className="h-4.5 w-4.5 text-teal-600" />
                          Bed Status
                        </CardTitle>
                        <button
                          onClick={() => setSelectedBed(null)}
                          className="text-xs font-bold text-slate-450 hover:text-slate-600 dark:hover:text-slate-350 cursor-pointer"
                        >
                          Close
                        </button>
                      </div>
                      <CardDescription>Details for Bed: {selectedBed.id}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="rounded-xl bg-slate-50/50 p-4 border border-slate-100/50 space-y-1.5 dark:bg-slate-850 dark:border-slate-800">
                        <p className="text-[10px] font-bold text-slate-450 uppercase tracking-wide">Bed ID</p>
                        <p className="text-sm font-bold text-slate-800 dark:text-white">{selectedBed.id}</p>
                        <p className="text-[10px] font-bold text-slate-450 uppercase tracking-wide pt-2">Ward Type</p>
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{selectedBed.ward}</p>
                        <p className="text-[10px] font-bold text-slate-450 uppercase tracking-wide pt-2">Current State</p>
                        <Badge variant={selectedBed.badgeVariant} className="mt-1">{selectedBed.status}</Badge>
                      </div>

                      {/* Dynamic Details based on status */}
                      {selectedBed.status === "Occupied" && (
                        <div className="space-y-4">
                          <div className="border-t border-slate-100 pt-4 dark:border-slate-800 space-y-3.5">
                            <h4 className="text-xs font-bold text-slate-450 uppercase tracking-wider">Patient Demographics</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between text-xs">
                                <span className="text-slate-450 font-medium">Name:</span>
                                <span className="font-bold text-slate-800 dark:text-white">{selectedBed.patient}</span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-slate-450 font-medium">UHID:</span>
                                <span className="font-mono font-semibold text-slate-600 dark:text-slate-400">{selectedBed.uhid}</span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-slate-450 font-medium">Doctor:</span>
                                <span className="font-semibold text-slate-700 dark:text-slate-300">{selectedBed.doctor}</span>
                              </div>
                            </div>
                          </div>
                          
                          <Button
                            variant="outline"
                            onClick={() => handleQuickDischarge(selectedBed.id)}
                            className="w-full h-10 cursor-pointer text-red-600 hover:bg-red-50 hover:text-red-700 border-red-150/60 dark:text-red-400 dark:hover:bg-red-950/20"
                          >
                            Discharge Patient
                          </Button>
                        </div>
                      )}

                      {selectedBed.status === "Available" && (
                        <div className="space-y-3 text-center py-4">
                          <CheckCircle className="mx-auto h-8 w-8 text-emerald-500" />
                          <p className="text-xs font-semibold text-slate-450">This bed is ready for immediate patient allocation.</p>
                          <Button
                            variant="default"
                            onClick={() => {
                              setAdmissionWard(selectedBed.ward);
                              setAdmissionBed(selectedBed.id);
                              setActiveTab("admission");
                            }}
                            className="w-full h-10 cursor-pointer mt-2"
                          >
                            Admit Patient Here
                          </Button>
                        </div>
                      )}

                      {selectedBed.status === "Cleaning" && (
                        <div className="space-y-4 text-center py-4">
                          <Clock className="mx-auto h-8 w-8 text-amber-500 animate-spin" />
                          <p className="text-xs font-semibold text-slate-450">Bed undergoing sanitary disinfection protocols.</p>
                          <Button
                            variant="outline"
                            onClick={() => handleCompleteCleaning(selectedBed.id)}
                            className="w-full h-10 cursor-pointer border-amber-200 text-amber-700 hover:bg-amber-50 dark:border-amber-900/50 dark:text-amber-400 dark:hover:bg-amber-950/20"
                          >
                            Mark Sanitized & Ready
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Tab 2: Admission Form */}
        <TabsContent value="admission">
          <Card>
            <CardContent className="p-6">
              {admissionSuccess ? (
                <div className="flex flex-col items-center justify-center py-12 text-center animate-in zoom-in-95 duration-300">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 mb-4">
                    <UserCheck className="h-7 w-7 animate-bounce" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                    Patient Allocated Successfully!
                  </h3>
                  <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
                    Bed allocation and deposit log completed. Returning to Bed Board...
                  </p>
                </div>
              ) : (
                <form onSubmit={handleAdmissionSubmit} className="space-y-8">
                  <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
                    {/* Section 1 & 2 Left Column */}
                    <div className="space-y-6">
                      {/* Sub Section 1: Patient Details */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 border-b border-slate-50 dark:border-slate-800 pb-2">
                          <User className="h-5 w-5 text-teal-600" />
                          <h2 className="text-base font-bold text-slate-800 dark:text-white">
                            Patient Details
                          </h2>
                        </div>
                        
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                            Search Existing Patient <span className="text-rose-500">*</span>
                          </label>
                          <select
                            required
                            value={patientSearch}
                            onChange={(e) => setPatientSearch(e.target.value)}
                            className="h-10 w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50/30 px-3 text-sm text-slate-700 outline-none transition-all hover:border-slate-350 focus:border-teal-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900/50"
                          >
                            <option value="">Choose Patient...</option>
                            {existingPatients.map((pat) => (
                              <option key={pat.uhid} value={`${pat.name} (${pat.uhid})`}>
                                {pat.name} ({pat.uhid})
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="grid gap-4 grid-cols-2">
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                              Admission Date
                            </label>
                            <input
                              type="date"
                              required
                              value={admissionDate}
                              onChange={(e) => setAdmissionDate(e.target.value)}
                              className="h-10 w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50/30 px-3 text-sm text-slate-700 outline-none transition-all hover:border-slate-350 focus:border-teal-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-100"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                              Expected Stay (Days)
                            </label>
                            <input
                              type="number"
                              min="1"
                              value={expectedStay}
                              onChange={(e) => setExpectedStay(e.target.value)}
                              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/30 px-3 text-sm text-slate-800 outline-none transition-all hover:border-slate-350 focus:border-teal-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-100"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Sub Section 2: Allocation */}
                      <div className="space-y-4 pt-2">
                        <div className="flex items-center gap-2 border-b border-slate-50 dark:border-slate-800 pb-2">
                          <PlusCircle className="h-5 w-5 text-teal-600" />
                          <h2 className="text-base font-bold text-slate-800 dark:text-white">
                            Bed Allocation
                          </h2>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                            Assign Admitting Doctor
                          </label>
                          <select
                            value={assignedDoc}
                            onChange={(e) => setAssignedDoc(e.target.value)}
                            className="h-10 w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50/30 px-3 text-sm text-slate-700 outline-none transition-all hover:border-slate-350 focus:border-teal-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900/50"
                          >
                            {doctorsList.map((doc) => (
                              <option key={doc} value={doc}>
                                {doc}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="grid gap-4 grid-cols-2">
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                              Ward Selection
                            </label>
                            <select
                              value={admissionWard}
                              onChange={(e) => setAdmissionWard(e.target.value)}
                              className="h-10 w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50/30 px-3 text-sm text-slate-700 outline-none transition-all hover:border-slate-350 focus:border-teal-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900/50"
                            >
                              <option value="General">General Ward</option>
                              <option value="ICU">ICU Ward</option>
                              <option value="Private">Private Rooms</option>
                            </select>
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                              Bed Number <span className="text-rose-500">*</span>
                            </label>
                            <select
                              required
                              value={admissionBed}
                              onChange={(e) => setAdmissionBed(e.target.value)}
                              className="h-10 w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50/30 px-3 text-sm text-slate-700 outline-none transition-all hover:border-slate-350 focus:border-teal-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900/50"
                            >
                              {availableBedsForForm.length > 0 ? (
                                availableBedsForForm.map((b) => (
                                  <option key={b.id} value={b.id}>
                                    {b.id} (Available)
                                  </option>
                                ))
                              ) : (
                                <option value="">No beds available</option>
                              )}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Section 3 Right Column: Deposits & Insurances */}
                    <div className="space-y-5">
                      <div className="flex items-center gap-2 border-b border-slate-50 dark:border-slate-800 pb-2">
                        <CreditCard className="h-5 w-5 text-teal-600" />
                        <h2 className="text-base font-bold text-slate-800 dark:text-white">
                          Deposit & Insurance
                        </h2>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                          Advance Deposit Amount (₹)
                        </label>
                        <input
                          type="number"
                          placeholder="5000"
                          value={advanceDeposit}
                          onChange={(e) => setAdvanceDeposit(e.target.value)}
                          className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/30 px-3.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 hover:border-slate-350 focus:border-teal-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-100"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                          Payment Mode
                        </label>
                        <select
                          value={paymentMode}
                          onChange={(e) => setPaymentMode(e.target.value)}
                          className="h-10 w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50/30 px-3 text-sm text-slate-700 outline-none transition-all hover:border-slate-350 focus:border-teal-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900/50"
                        >
                          <option value="UPI">UPI / NetBanking</option>
                          <option value="Card">Credit / Debit Card</option>
                          <option value="Cash">Cash payment</option>
                          <option value="Insurance">Direct Insurance billing</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                          Insurance Provider (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. HDFC Ergo, Star Health"
                          value={insuranceProvider}
                          onChange={(e) => setInsuranceProvider(e.target.value)}
                          className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/30 px-3.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 hover:border-slate-355 focus:border-teal-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-100"
                        />
                      </div>

                      {/* Info notice box */}
                      <div className="rounded-xl border border-amber-100 bg-amber-50/30 p-4 flex gap-3 dark:border-amber-900/30 dark:bg-amber-950/20 mt-6">
                        <ShieldAlert className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                        <div className="text-xs text-amber-800 dark:text-amber-300 font-medium leading-relaxed">
                          Please ensure that vital signs are recorded and the patient consent form is signed prior to inpatient ward allocation.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Form Actions Footer */}
                  <div className="flex items-center justify-end gap-3 border-t border-slate-50 dark:border-slate-850 pt-5">
                    <Button
                      type="button"
                      variant="outline"
                      className="cursor-pointer"
                      onClick={() => {
                        setPatientSearch("");
                        setInsuranceProvider("");
                        setActiveTab("bed-board");
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" variant="default" className="cursor-pointer">
                      Confirm Admission
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
