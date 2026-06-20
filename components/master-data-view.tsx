"use client";

import * as React from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Pill,
  Building2,
  BedDouble,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

/* ─── Toggle Switch (consistent with user-management-view) ─── */
function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border-2 border-transparent transition-colors duration-200 cursor-pointer focus-visible:outline-none",
        checked
          ? "bg-teal-600 dark:bg-teal-500"
          : "bg-slate-200 dark:bg-slate-700"
      )}
    >
      <span
        className={cn(
          "pointer-events-none block h-4.5 w-4.5 rounded-full bg-white shadow-sm ring-0 transition-transform duration-200",
          checked ? "translate-x-5" : "translate-x-0.5"
        )}
      />
    </button>
  );
}

/* ─── Reusable Form Input ─── */
function FormInput({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  defaultValue,
}: {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
        value={value}
        onChange={onChange}
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

/* ─── Reusable Select ─── */
function FormSelect({
  label,
  id,
  options,
  placeholder,
}: {
  label: string;
  id: string;
  options: string[];
  placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-xs font-semibold text-slate-600 dark:text-slate-400"
      >
        {label}
      </label>
      <select
        id={id}
        defaultValue=""
        className={cn(
          "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 cursor-pointer",
          "transition-all duration-200 outline-none appearance-none",
          "focus:border-teal-400 focus:ring-2 focus:ring-teal-500/10",
          "hover:border-slate-300",
          "dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-200",
          "dark:focus:border-teal-500 dark:focus:ring-teal-400/10 dark:hover:border-slate-600"
        )}
      >
        <option value="" disabled>
          {placeholder || "Select..."}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ─── Types ─── */
interface Medicine {
  id: string;
  name: string;
  genericName: string;
  form: string;
  defaultDosage: string;
  active: boolean;
}

interface Department {
  id: string;
  name: string;
  active: boolean;
}

interface Ward {
  id: string;
  name: string;
  type: string;
  active: boolean;
}

/* ─── Mock Data ─── */
const initialMedicines: Medicine[] = [
  {
    id: "MED-001",
    name: "Amoxicillin 500mg",
    genericName: "Amoxicillin",
    form: "Capsule",
    defaultDosage: "500mg TDS",
    active: true,
  },
  {
    id: "MED-002",
    name: "Paracetamol 650mg",
    genericName: "Acetaminophen",
    form: "Tablet",
    defaultDosage: "650mg SOS",
    active: true,
  },
  {
    id: "MED-003",
    name: "Cetirizine 10mg",
    genericName: "Cetirizine HCl",
    form: "Tablet",
    defaultDosage: "10mg OD",
    active: true,
  },
  {
    id: "MED-004",
    name: "Cough Linctus",
    genericName: "Dextromethorphan",
    form: "Syrup",
    defaultDosage: "10ml TDS",
    active: false,
  },
];

const initialDepartments: Department[] = [
  { id: "DEPT-001", name: "Cardiology", active: true },
  { id: "DEPT-002", name: "Orthopedics", active: true },
  { id: "DEPT-003", name: "General Medicine", active: true },
  { id: "DEPT-004", name: "Pediatrics", active: true },
  { id: "DEPT-005", name: "Dermatology", active: false },
];

const initialWards: Ward[] = [
  { id: "WARD-001", name: "General Ward", type: "General", active: true },
  { id: "WARD-002", name: "ICU", type: "Intensive Care", active: true },
  { id: "WARD-003", name: "Private Room", type: "Private", active: true },
  { id: "WARD-004", name: "Semi-Private", type: "Semi-Private", active: true },
];

/* ═══════════════════════════════════════════════════
   Tab 1 — Clinical Masters: Medicine Catalog
   ═══════════════════════════════════════════════════ */
function ClinicalMastersTab() {
  const [medicines, setMedicines] = React.useState(initialMedicines);
  const [search, setSearch] = React.useState("");
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [newMedName, setNewMedName] = React.useState("");
  const [newMedGeneric, setNewMedGeneric] = React.useState("");
  const [newMedForm, setNewMedForm] = React.useState("");
  const [newMedDosage, setNewMedDosage] = React.useState("");

  const filtered = medicines.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.genericName.toLowerCase().includes(search.toLowerCase())
  );

  const toggleActive = (id: string) => {
    setMedicines((prev) =>
      prev.map((m) => (m.id === id ? { ...m, active: !m.active } : m))
    );
  };

  const handleAddMedicine = () => {
    const trimmedName = newMedName.trim();
    if (!trimmedName) return;

    const newMed: Medicine = {
      id: `MED-${String(medicines.length + 1).padStart(3, "0")}`,
      name: trimmedName,
      genericName: newMedGeneric.trim() || trimmedName,
      form: newMedForm || "Tablet",
      defaultDosage: newMedDosage.trim() || "As directed",
      active: true,
    };

    setMedicines((prev) => [...prev, newMed]);
    setNewMedName("");
    setNewMedGeneric("");
    setNewMedForm("");
    setNewMedDosage("");
    setDialogOpen(false);
  };

  return (
    <div className="space-y-4">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search medicines..."
            className={cn(
              "w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm placeholder:text-slate-400",
              "transition-all duration-200 outline-none",
              "focus:border-teal-400 focus:ring-2 focus:ring-teal-500/10",
              "hover:border-slate-300",
              "dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-200 dark:placeholder:text-slate-500"
            )}
          />
        </div>
        <Button
          variant="default"
          size="sm"
          className="cursor-pointer hover:-translate-y-px transition-all duration-200 shadow-sm shadow-teal-500/10"
          onClick={() => setDialogOpen(true)}
        >
          <Plus className="h-3.5 w-3.5" />
          Add New Medicine
        </Button>
      </div>

      {/* Medicine Table */}
      <Card className="shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Medicine Name</TableHead>
              <TableHead>Generic Name</TableHead>
              <TableHead>Form</TableHead>
              <TableHead>Default Dosage</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((med) => (
              <TableRow
                key={med.id}
                className="cursor-pointer hover:bg-slate-50 transition-colors duration-200 dark:hover:bg-slate-800/40"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 dark:bg-teal-950/40">
                      <Pill className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                    </div>
                    <span className="font-semibold text-slate-800 dark:text-white">
                      {med.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-slate-500 dark:text-slate-400">
                  {med.genericName}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      med.form === "Syrup"
                        ? "warning"
                        : med.form === "Capsule"
                        ? "info"
                        : "secondary"
                    }
                  >
                    {med.form}
                  </Badge>
                </TableCell>
                <TableCell className="text-slate-500 dark:text-slate-400 font-mono text-xs">
                  {med.defaultDosage}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Toggle
                      checked={med.active}
                      onChange={() => toggleActive(med.id)}
                    />
                    <span
                      className={cn(
                        "text-xs font-semibold",
                        med.active
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-slate-400 dark:text-slate-500"
                      )}
                    >
                      {med.active ? "Active" : "Inactive"}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
                    >
                      <Pencil className="h-4 w-4 text-slate-400" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="cursor-pointer hover:bg-rose-50 hover:text-rose-500 dark:hover:bg-rose-950/30 transition-colors duration-200"
                    >
                      <Trash2 className="h-4 w-4 text-slate-400" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  <div className="flex flex-col items-center gap-2">
                    <Pill className="h-8 w-8 text-slate-300 dark:text-slate-600" />
                    <p className="text-sm text-slate-400 dark:text-slate-500">
                      No medicines found matching your search.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Add Medicine Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent onClose={() => setDialogOpen(false)}>
          <DialogHeader>
            <DialogTitle>Add New Medicine</DialogTitle>
            <DialogDescription>
              Add a medicine to the catalog. It will appear in prescription
              dropdowns across the system.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="Medicine Name"
                id="med-name"
                placeholder="e.g. Azithromycin 250mg"
                value={newMedName}
                onChange={(e) => setNewMedName(e.target.value)}
              />
              <FormInput
                label="Generic Name"
                id="med-generic"
                placeholder="e.g. Azithromycin"
                value={newMedGeneric}
                onChange={(e) => setNewMedGeneric(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormSelect
                label="Form"
                id="med-form"
                placeholder="Select form..."
                options={[
                  "Tablet",
                  "Capsule",
                  "Syrup",
                  "Injection",
                  "Cream",
                  "Drops",
                  "Inhaler",
                  "Ointment",
                ]}
              />
              <FormInput
                label="Default Dosage"
                id="med-dosage"
                placeholder="e.g. 250mg BD"
                value={newMedDosage}
                onChange={(e) => setNewMedDosage(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              size="md"
              className="cursor-pointer hover:bg-slate-50 transition-colors duration-200"
              onClick={() => setDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              size="md"
              className="cursor-pointer hover:-translate-y-px transition-all duration-200 shadow-md shadow-teal-500/15"
              onClick={handleAddMedicine}
              disabled={!newMedName.trim()}
            >
              <Plus className="h-4 w-4" />
              Add Medicine
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   Tab 2 — Operational Masters: Departments & Wards
   ═══════════════════════════════════════════════════ */
function OperationalMastersTab() {
  const [departments, setDepartments] = React.useState(initialDepartments);
  const [wards, setWards] = React.useState(initialWards);

  // Department dialog
  const [deptDialogOpen, setDeptDialogOpen] = React.useState(false);
  const [newDeptName, setNewDeptName] = React.useState("");

  // Ward dialog
  const [wardDialogOpen, setWardDialogOpen] = React.useState(false);
  const [newWardName, setNewWardName] = React.useState("");
  const [newWardType, setNewWardType] = React.useState("");

  const toggleDept = (id: string) => {
    setDepartments((prev) =>
      prev.map((d) => (d.id === id ? { ...d, active: !d.active } : d))
    );
  };

  const toggleWard = (id: string) => {
    setWards((prev) =>
      prev.map((w) => (w.id === id ? { ...w, active: !w.active } : w))
    );
  };

  const handleAddDept = () => {
    const trimmed = newDeptName.trim();
    if (!trimmed) return;
    setDepartments((prev) => [
      ...prev,
      {
        id: `DEPT-${String(prev.length + 1).padStart(3, "0")}`,
        name: trimmed,
        active: true,
      },
    ]);
    setNewDeptName("");
    setDeptDialogOpen(false);
  };

  const handleAddWard = () => {
    const trimmed = newWardName.trim();
    if (!trimmed) return;
    setWards((prev) => [
      ...prev,
      {
        id: `WARD-${String(prev.length + 1).padStart(3, "0")}`,
        name: trimmed,
        type: newWardType.trim() || "General",
        active: true,
      },
    ]);
    setNewWardName("");
    setNewWardType("");
    setWardDialogOpen(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* ── Left Column: Departments ── */}
      <Card className="shadow-sm">
        <CardContent className="p-5">
          {/* Card Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50 dark:bg-teal-950/40">
                <Building2 className="h-4 w-4 text-teal-600 dark:text-teal-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-white">
                  Departments
                </h3>
                <p className="text-[11px] text-slate-400 dark:text-slate-500">
                  {departments.filter((d) => d.active).length} active
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer hover:border-teal-300 hover:text-teal-700 dark:hover:border-teal-600 dark:hover:text-teal-400 transition-all duration-200"
              onClick={() => setDeptDialogOpen(true)}
            >
              <Plus className="h-3.5 w-3.5" />
              Add Department
            </Button>
          </div>

          {/* Departments List */}
          <div className="space-y-1">
            {departments.map((dept) => (
              <div
                key={dept.id}
                className={cn(
                  "flex items-center justify-between rounded-xl px-3.5 py-3 transition-colors duration-200",
                  "hover:bg-slate-50 dark:hover:bg-slate-800/50",
                  !dept.active && "opacity-60"
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "h-2 w-2 rounded-full",
                      dept.active
                        ? "bg-emerald-500"
                        : "bg-slate-300 dark:bg-slate-600"
                    )}
                  />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {dept.name}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Toggle
                    checked={dept.active}
                    onChange={() => toggleDept(dept.id)}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="cursor-pointer h-8 w-8 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
                  >
                    <Pencil className="h-3.5 w-3.5 text-slate-400" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── Right Column: Wards ── */}
      <Card className="shadow-sm">
        <CardContent className="p-5">
          {/* Card Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-50 dark:bg-sky-950/40">
                <BedDouble className="h-4 w-4 text-sky-600 dark:text-sky-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-white">
                  Wards
                </h3>
                <p className="text-[11px] text-slate-400 dark:text-slate-500">
                  {wards.filter((w) => w.active).length} active
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer hover:border-teal-300 hover:text-teal-700 dark:hover:border-teal-600 dark:hover:text-teal-400 transition-all duration-200"
              onClick={() => setWardDialogOpen(true)}
            >
              <Plus className="h-3.5 w-3.5" />
              Add Ward
            </Button>
          </div>

          {/* Wards List */}
          <div className="space-y-1">
            {wards.map((ward) => (
              <div
                key={ward.id}
                className={cn(
                  "flex items-center justify-between rounded-xl px-3.5 py-3 transition-colors duration-200",
                  "hover:bg-slate-50 dark:hover:bg-slate-800/50",
                  !ward.active && "opacity-60"
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "h-2 w-2 rounded-full",
                      ward.active
                        ? "bg-emerald-500"
                        : "bg-slate-300 dark:bg-slate-600"
                    )}
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {ward.name}
                    </span>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500">
                      {ward.type}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Toggle
                    checked={ward.active}
                    onChange={() => toggleWard(ward.id)}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="cursor-pointer h-8 w-8 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
                  >
                    <Pencil className="h-3.5 w-3.5 text-slate-400" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Department Dialog */}
      <Dialog open={deptDialogOpen} onOpenChange={setDeptDialogOpen}>
        <DialogContent onClose={() => setDeptDialogOpen(false)}>
          <DialogHeader>
            <DialogTitle>Add Department</DialogTitle>
            <DialogDescription>
              Create a new department. It will appear in department dropdowns
              across the system.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <FormInput
              label="Department Name"
              id="dept-name"
              placeholder="e.g. Neurology"
              value={newDeptName}
              onChange={(e) => setNewDeptName(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              size="md"
              className="cursor-pointer hover:bg-slate-50 transition-colors duration-200"
              onClick={() => setDeptDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              size="md"
              className="cursor-pointer hover:-translate-y-px transition-all duration-200 shadow-md shadow-teal-500/15"
              onClick={handleAddDept}
              disabled={!newDeptName.trim()}
            >
              <Plus className="h-4 w-4" />
              Add Department
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Ward Dialog */}
      <Dialog open={wardDialogOpen} onOpenChange={setWardDialogOpen}>
        <DialogContent onClose={() => setWardDialogOpen(false)}>
          <DialogHeader>
            <DialogTitle>Add Ward</DialogTitle>
            <DialogDescription>
              Create a new ward. It will appear in ward selection and bed board
              configuration.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <FormInput
              label="Ward Name"
              id="ward-name"
              placeholder="e.g. Maternity Ward"
              value={newWardName}
              onChange={(e) => setNewWardName(e.target.value)}
            />
            <FormSelect
              label="Ward Type"
              id="ward-type"
              placeholder="Select ward type..."
              options={[
                "General",
                "Intensive Care",
                "Private",
                "Semi-Private",
                "Emergency",
                "Maternity",
                "Pediatric",
              ]}
            />
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              size="md"
              className="cursor-pointer hover:bg-slate-50 transition-colors duration-200"
              onClick={() => setWardDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              size="md"
              className="cursor-pointer hover:-translate-y-px transition-all duration-200 shadow-md shadow-teal-500/15"
              onClick={handleAddWard}
              disabled={!newWardName.trim()}
            >
              <Plus className="h-4 w-4" />
              Add Ward
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   Main Export — Master Data Management Content
   ═══════════════════════════════════════════════════ */
export function MasterDataContent() {
  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Master Data Management
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Manage dynamic dropdowns and core system data.
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="clinical-masters">
        <TabsList>
          <TabsTrigger value="clinical-masters">Clinical Masters</TabsTrigger>
          <TabsTrigger value="operational-masters">
            Operational Masters
          </TabsTrigger>
        </TabsList>

        <TabsContent value="clinical-masters">
          <ClinicalMastersTab />
        </TabsContent>

        <TabsContent value="operational-masters">
          <OperationalMastersTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
