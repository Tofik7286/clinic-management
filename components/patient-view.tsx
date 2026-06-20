"use client";

import * as React from "react";
import {
  Search,
  SlidersHorizontal,
  MoreVertical,
  Eye,
  Edit2,
  LogOut,
  UserPlus,
  UserCheck,
  AlertCircle,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dropdown, DropdownItem } from "@/components/ui/dropdown";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Mock Indian dummy data for Patient list
const initialPatients = [
  {
    uhid: "UHID-90412",
    name: "Aarav Sharma",
    ageGender: "42 / Male",
    contact: "+91 98765 43210",
    lastVisit: "2026-06-18",
    status: "Active",
    statusVariant: "success" as const,
  },
  {
    uhid: "UHID-91309",
    name: "Priyanka Patel",
    ageGender: "31 / Female",
    contact: "+91 87654 32109",
    lastVisit: "2026-06-15",
    status: "Active",
    statusVariant: "success" as const,
  },
  {
    uhid: "UHID-90523",
    name: "Rajesh Kumar",
    ageGender: "55 / Male",
    contact: "+91 76543 21098",
    lastVisit: "2026-06-10",
    status: "Discharged",
    statusVariant: "secondary" as const,
  },
  {
    uhid: "UHID-91112",
    name: "Sunita Rao",
    ageGender: "29 / Female",
    contact: "+91 65432 10987",
    lastVisit: "2026-06-19",
    status: "Active",
    statusVariant: "success" as const,
  },
  {
    uhid: "UHID-90801",
    name: "Amit Mishra",
    ageGender: "38 / Male",
    contact: "+91 95432 10987",
    lastVisit: "2026-06-20",
    status: "Active",
    statusVariant: "success" as const,
  },
];

export function PatientView() {
  const [activeTab, setActiveTab] = React.useState("list");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [patients, setPatients] = React.useState(initialPatients);
  
  // Registration form states
  const [formState, setFormState] = React.useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    bloodGroup: "",
    phone: "",
    email: "",
    address: "",
    emergencyName: "",
    emergencyPhone: "",
  });

  const [registerSuccess, setRegisterSuccess] = React.useState(false);

  // Search filter
  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.uhid.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.contact.includes(searchQuery)
  );

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.firstName || !formState.lastName || !formState.phone) {
      alert("Please fill in the required fields (First Name, Last Name, Phone).");
      return;
    }

    const randomUhid = `UHID-${Math.floor(10000 + Math.random() * 90000)}`;
    const age = formState.dob
      ? new Date().getFullYear() - new Date(formState.dob).getFullYear()
      : 30;
    
    const newPatient = {
      uhid: randomUhid,
      name: `${formState.firstName} ${formState.lastName}`,
      ageGender: `${age} / ${formState.gender || "Other"}`,
      contact: formState.phone,
      lastVisit: new Date().toISOString().split("T")[0],
      status: "Active",
      statusVariant: "success" as const,
    };

    setPatients([newPatient, ...patients]);
    setRegisterSuccess(true);

    // Clear form
    setFormState({
      firstName: "",
      lastName: "",
      dob: "",
      gender: "",
      bloodGroup: "",
      phone: "",
      email: "",
      address: "",
      emergencyName: "",
      emergencyPhone: "",
    });

    setTimeout(() => {
      setRegisterSuccess(false);
      setActiveTab("list");
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Patient Management
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Access patient records, medical visits, and register new patients.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        {/* Tabs Headers */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-px">
          <TabsList className="mb-2">
            <TabsTrigger value="list" className="cursor-pointer">Patient List</TabsTrigger>
            <TabsTrigger value="register" className="cursor-pointer">Register New Patient</TabsTrigger>
          </TabsList>
        </div>

        {/* Tab 1: Patient List */}
        <TabsContent value="list">
          <div className="space-y-4">
            {/* Search and Filters */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-4.5 w-4.5 text-slate-400" />
                </div>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, phone, or UHID..."
                  className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-teal-500 dark:focus:ring-teal-950/50"
                />
              </div>
              <Button variant="outline" className="h-10 cursor-pointer text-xs">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>

            {/* Patients Table */}
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="pl-6">UHID</TableHead>
                      <TableHead>Patient Name</TableHead>
                      <TableHead>Age/Gender</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Last Visit</TableHead>
                      <TableHead className="pr-6 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPatients.length > 0 ? (
                      filteredPatients.map((patient) => (
                        <TableRow
                          key={patient.uhid}
                          className="cursor-pointer hover:bg-slate-50 transition-all duration-200"
                        >
                          <TableCell className="font-mono text-xs font-bold text-slate-500 pl-6">
                            {patient.uhid}
                          </TableCell>
                          <TableCell className="font-bold text-slate-800 dark:text-slate-200">
                            {patient.name}
                          </TableCell>
                          <TableCell className="font-semibold text-slate-600 dark:text-slate-350">
                            {patient.ageGender}
                          </TableCell>
                          <TableCell className="text-slate-500 font-medium">
                            {patient.contact}
                          </TableCell>
                          <TableCell className="text-slate-500">
                            {patient.lastVisit}
                          </TableCell>
                          <TableCell className="pr-6 text-right">
                            <div className="inline-block text-left" onClick={(e) => e.stopPropagation()}>
                              <Dropdown
                                align="right"
                                trigger={
                                  <button className="rounded-xl p-1.5 cursor-pointer hover:bg-slate-100/80 text-slate-400 hover:text-slate-600 dark:hover:bg-slate-800 transition-colors">
                                    <MoreVertical className="h-4.5 w-4.5" />
                                  </button>
                                }
                              >
                                <DropdownItem icon={<Eye className="h-4 w-4" />}>
                                  View Profile
                                </DropdownItem>
                                <DropdownItem icon={<Edit2 className="h-4 w-4" />}>
                                  Edit Details
                                </DropdownItem>
                                <DropdownItem icon={<LogOut className="h-4 w-4" />} variant="danger">
                                  Discharge
                                </DropdownItem>
                              </Dropdown>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="h-28 text-center text-slate-400">
                          <div className="flex flex-col items-center justify-center gap-2">
                            <AlertCircle className="h-6 w-6 text-slate-300" />
                            <span>No patients found matching your search.</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab 2: Register New Patient Form */}
        <TabsContent value="register">
          <Card>
            <CardContent className="p-6">
              {registerSuccess ? (
                <div className="flex flex-col items-center justify-center py-12 text-center animate-in zoom-in-95 duration-300">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 mb-4">
                    <UserCheck className="h-7 w-7" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                    Registration Successful!
                  </h3>
                  <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
                    Patient has been successfully registered. Redirecting to directories...
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="space-y-8">
                  <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
                    {/* Section 1: Basic Details */}
                    <div className="space-y-5">
                      <div className="flex items-center gap-2 border-b border-slate-50 dark:border-slate-800 pb-2">
                        <UserPlus className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                        <h2 className="text-base font-bold text-slate-800 dark:text-white">
                          Basic Details
                        </h2>
                      </div>

                      <div className="grid gap-4 grid-cols-2">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                            First Name <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Aarav"
                            value={formState.firstName}
                            onChange={(e) => setFormState({ ...formState, firstName: e.target.value })}
                            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/30 px-3.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 hover:border-slate-350 focus:border-teal-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-100"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                            Last Name <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Sharma"
                            value={formState.lastName}
                            onChange={(e) => setFormState({ ...formState, lastName: e.target.value })}
                            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/30 px-3.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 hover:border-slate-350 focus:border-teal-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-100"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          value={formState.dob}
                          onChange={(e) => setFormState({ ...formState, dob: e.target.value })}
                          className="h-10 w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50/30 px-3.5 text-sm text-slate-800 outline-none transition-all hover:border-slate-350 focus:border-teal-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-100"
                        />
                      </div>

                      <div className="grid gap-4 grid-cols-2">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                            Gender
                          </label>
                          <select
                            value={formState.gender}
                            onChange={(e) => setFormState({ ...formState, gender: e.target.value })}
                            className="h-10 w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50/30 px-3 text-sm text-slate-700 outline-none transition-all hover:border-slate-350 focus:border-teal-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-100"
                          >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                            Blood Group
                          </label>
                          <select
                            value={formState.bloodGroup}
                            onChange={(e) => setFormState({ ...formState, bloodGroup: e.target.value })}
                            className="h-10 w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50/30 px-3 text-sm text-slate-700 outline-none transition-all hover:border-slate-350 focus:border-teal-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-100"
                          >
                            <option value="">Select Group</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Section 2: Contact Details */}
                    <div className="space-y-5">
                      <div className="flex items-center gap-2 border-b border-slate-50 dark:border-slate-800 pb-2">
                        <FileText className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                        <h2 className="text-base font-bold text-slate-800 dark:text-white">
                          Contact Details
                        </h2>
                      </div>

                      <div className="grid gap-4 grid-cols-2">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                            Phone Number <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="+91 98765 43210"
                            value={formState.phone}
                            onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/30 px-3.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 hover:border-slate-350 focus:border-teal-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-100"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                            Email ID
                          </label>
                          <input
                            type="email"
                            placeholder="patient@example.com"
                            value={formState.email}
                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/30 px-3.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 hover:border-slate-350 focus:border-teal-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-100"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                          Address
                        </label>
                        <input
                          type="text"
                          placeholder="Apartment, Street Name, Area..."
                          value={formState.address}
                          onChange={(e) => setFormState({ ...formState, address: e.target.value })}
                          className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/30 px-3.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 hover:border-slate-350 focus:border-teal-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-100"
                        />
                      </div>

                      <div className="grid gap-4 grid-cols-2">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                            Emergency Contact Name
                          </label>
                          <input
                            type="text"
                            placeholder="Next of Kin Name"
                            value={formState.emergencyName}
                            onChange={(e) => setFormState({ ...formState, emergencyName: e.target.value })}
                            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/30 px-3.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 hover:border-slate-355 focus:border-teal-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-100"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                            Emergency Phone
                          </label>
                          <input
                            type="tel"
                            placeholder="Kin Phone Number"
                            value={formState.emergencyPhone}
                            onChange={(e) => setFormState({ ...formState, emergencyPhone: e.target.value })}
                            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/30 px-3.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 hover:border-slate-355 focus:border-teal-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-100"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Form Footer Action Row */}
                  <div className="flex items-center justify-end gap-3 border-t border-slate-50 dark:border-slate-800 pt-5">
                    <Button
                      type="button"
                      variant="outline"
                      className="cursor-pointer"
                      onClick={() => {
                        setFormState({
                          firstName: "",
                          lastName: "",
                          dob: "",
                          gender: "",
                          bloodGroup: "",
                          phone: "",
                          email: "",
                          address: "",
                          emergencyName: "",
                          emergencyPhone: "",
                        });
                        setActiveTab("list");
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" variant="default" className="cursor-pointer">
                      Register Patient
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
