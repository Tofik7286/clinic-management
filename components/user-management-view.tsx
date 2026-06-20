"use client";

import * as React from "react";
import {
  Search,
  UserPlus,
  Pencil,
  ShieldCheck,
  Eye,
  EyeOff,
  Plus,
  Sparkles,
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

/* ─── Types ─── */
interface UserRecord {
  id: string;
  name: string;
  role: string;
  roleBadge: "default" | "info" | "success" | "warning" | "secondary" | "danger";
  email: string;
  department: string;
  active: boolean;
}

interface CustomRole {
  name: string;
  description: string;
}

/* ─── Constants ─── */
const DEFAULT_ROLES = ["Admin", "Doctor", "Receptionist", "Nurse"];

/* ─── Mock Data ─── */
const initialUsers: UserRecord[] = [
  {
    id: "USR-001",
    name: "Dr. Abhinav Gupta",
    role: "Doctor",
    roleBadge: "info",
    email: "abhinav.gupta@clinicos.in",
    department: "General Medicine",
    active: true,
  },
  {
    id: "USR-002",
    name: "Sneha Reddy",
    role: "Admin",
    roleBadge: "default",
    email: "sneha.reddy@clinicos.in",
    department: "Administration",
    active: true,
  },
  {
    id: "USR-003",
    name: "Priya Sharma",
    role: "Receptionist",
    roleBadge: "secondary",
    email: "priya.sharma@clinicos.in",
    department: "Front Desk",
    active: true,
  },
  {
    id: "USR-004",
    name: "Arjun Mehta",
    role: "Pharmacist",
    roleBadge: "success",
    email: "arjun.mehta@clinicos.in",
    department: "Pharmacy",
    active: false,
  },
  {
    id: "USR-005",
    name: "Kavita Nair",
    role: "Nurse",
    roleBadge: "warning",
    email: "kavita.nair@clinicos.in",
    department: "ICU",
    active: true,
  },
];

/* ─── Reusable Form Input ─── */
function FormInput({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
}: {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
  groupedOptions,
}: {
  label: string;
  id: string;
  options?: string[];
  placeholder?: string;
  groupedOptions?: { label: string; options: string[] }[];
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
        {groupedOptions
          ? groupedOptions.map((group) => (
              <optgroup key={group.label} label={group.label}>
                {group.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </optgroup>
            ))
          : options?.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
      </select>
    </div>
  );
}

/* ─── Toggle Switch ─── */
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

/* ─── Checkbox ─── */
function Checkbox({
  label,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: () => void;
}) {
  return (
    <label
      className={cn(
        "inline-flex items-center gap-1.5 cursor-pointer select-none transition-colors duration-200",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className={cn(
          "h-3.5 w-3.5 rounded border-slate-300 text-teal-600 transition-colors duration-200 cursor-pointer",
          "focus:ring-2 focus:ring-teal-500/20 focus:ring-offset-0",
          "checked:bg-teal-600 checked:border-teal-600",
          "dark:border-slate-600 dark:checked:bg-teal-500 dark:checked:border-teal-500",
          disabled && "cursor-not-allowed"
        )}
      />
      <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
        {label}
      </span>
    </label>
  );
}

/* ═══════════════════════════════════════════════════
   Tab 1 — Users List
   ═══════════════════════════════════════════════════ */
function UsersListTab() {
  const [users, setUsers] = React.useState(initialUsers);
  const [search, setSearch] = React.useState("");

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const toggleActive = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, active: !u.active } : u))
    );
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className={cn(
            "w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm placeholder:text-slate-400",
            "transition-all duration-200 outline-none",
            "focus:border-teal-400 focus:ring-2 focus:ring-teal-500/10",
            "hover:border-slate-300",
            "dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-200 dark:placeholder:text-slate-500"
          )}
        />
      </div>

      {/* Table */}
      <Card className="shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((user) => (
              <TableRow
                key={user.id}
                className="cursor-pointer hover:bg-slate-50 transition-colors duration-200 dark:hover:bg-slate-800/40"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-50 text-xs font-bold text-teal-700 dark:bg-teal-950/40 dark:text-teal-400">
                      {user.name
                        .split(" ")
                        .map((w) => w[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <span className="font-semibold text-slate-800 dark:text-white">
                      {user.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={user.roleBadge}>{user.role}</Badge>
                </TableCell>
                <TableCell className="text-slate-500 dark:text-slate-400">
                  {user.email}
                </TableCell>
                <TableCell className="text-slate-500 dark:text-slate-400">
                  {user.department}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Toggle
                      checked={user.active}
                      onChange={() => toggleActive(user.id)}
                    />
                    <span
                      className={cn(
                        "text-xs font-semibold",
                        user.active
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-slate-400 dark:text-slate-500"
                      )}
                    >
                      {user.active ? "Active" : "Inactive"}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
                  >
                    <Pencil className="h-4 w-4 text-slate-400" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   Tab 2 — Add New User Form
   ═══════════════════════════════════════════════════ */
function AddUserTab({ allRoles }: { allRoles: string[] }) {
  const [showPassword, setShowPassword] = React.useState(false);

  // Split roles into default and custom for grouped display
  const defaultRoleNames = ["Admin", "Doctor", "Nurse", "Receptionist", "Pharmacist"];
  const defaultInList = allRoles.filter((r) => defaultRoleNames.includes(r));
  const customInList = allRoles.filter((r) => !defaultRoleNames.includes(r));

  return (
    <Card className="shadow-sm">
      <CardContent className="p-6 space-y-6">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Personal Information
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormInput
            label="First Name"
            id="first-name"
            placeholder="e.g. Rajesh"
          />
          <FormInput
            label="Last Name"
            id="last-name"
            placeholder="e.g. Kumar"
          />
          <FormInput
            label="Email Address"
            id="new-email"
            type="email"
            placeholder="user@clinicos.in"
          />
          <div className="space-y-1.5">
            <label
              htmlFor="temp-password"
              className="block text-xs font-semibold text-slate-600 dark:text-slate-400"
            >
              Temporary Password
            </label>
            <div className="relative">
              <input
                id="temp-password"
                type={showPassword ? "text" : "password"}
                placeholder="Min 8 characters"
                className={cn(
                  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 pr-10 text-sm text-slate-800 placeholder:text-slate-400",
                  "transition-all duration-200 outline-none",
                  "focus:border-teal-400 focus:ring-2 focus:ring-teal-500/10",
                  "hover:border-slate-300",
                  "dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-200 dark:placeholder:text-slate-500"
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors duration-200 dark:hover:text-slate-300"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-100 dark:border-slate-800" />

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Role & Department
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormSelect
            label="Assign Role"
            id="assign-role"
            placeholder="Select a role..."
            groupedOptions={[
              { label: "Default Roles", options: defaultInList },
              ...(customInList.length > 0
                ? [{ label: "Custom Roles", options: customInList }]
                : []),
            ]}
          />
          <FormSelect
            label="Assign Department (Optional)"
            id="assign-dept"
            placeholder="Select a department..."
            options={[
              "General Medicine",
              "Administration",
              "Front Desk",
              "Pharmacy",
              "ICU",
              "Surgery",
              "Radiology",
            ]}
          />
        </div>

        {/* Action Footer */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            variant="outline"
            size="md"
            className="cursor-pointer hover:bg-slate-50 transition-colors duration-200"
          >
            Cancel
          </Button>
          <Button
            variant="default"
            size="md"
            className="cursor-pointer hover:-translate-y-px transition-all duration-200 shadow-md shadow-teal-500/15"
          >
            <UserPlus className="h-4 w-4" />
            Create User
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

/* ═══════════════════════════════════════════════════
   Tab 3 — Role Permissions (RBAC Matrix)
   ═══════════════════════════════════════════════════ */
const permissionModules = [
  "Patient Management",
  "OPD Consultation",
  "IPD Admission",
  "Billing",
  "Pharmacy",
  "Settings",
];

type PermissionKey = `${string}-${string}-${"view" | "edit" | "delete"}`;

function buildPermissionsForRole(
  role: string,
  existing?: Record<PermissionKey, boolean>
): Record<PermissionKey, boolean> {
  const perms: Record<string, boolean> = {};
  for (const mod of permissionModules) {
    const base = `${mod}-${role}`;
    if (existing && `${base}-view` in existing) {
      perms[`${base}-view`] = existing[`${base}-view` as PermissionKey];
      perms[`${base}-edit`] = existing[`${base}-edit` as PermissionKey];
      perms[`${base}-delete`] = existing[`${base}-delete` as PermissionKey];
    } else if (role === "Admin") {
      perms[`${base}-view`] = true;
      perms[`${base}-edit`] = true;
      perms[`${base}-delete`] = true;
    } else if (role === "Doctor") {
      perms[`${base}-view`] = true;
      perms[`${base}-edit`] = ["Patient Management", "OPD Consultation"].includes(mod);
      perms[`${base}-delete`] = false;
    } else if (role === "Receptionist") {
      perms[`${base}-view`] = ["Patient Management", "Billing"].includes(mod);
      perms[`${base}-edit`] = mod === "Patient Management";
      perms[`${base}-delete`] = false;
    } else if (role === "Nurse") {
      perms[`${base}-view`] = ["Patient Management", "IPD Admission", "Pharmacy"].includes(mod);
      perms[`${base}-edit`] = mod === "IPD Admission";
      perms[`${base}-delete`] = false;
    } else {
      // New custom role — default: all unchecked
      perms[`${base}-view`] = false;
      perms[`${base}-edit`] = false;
      perms[`${base}-delete`] = false;
    }
  }
  return perms as Record<PermissionKey, boolean>;
}

function buildInitialPermissions(
  allRoles: string[]
): Record<PermissionKey, boolean> {
  let perms: Record<PermissionKey, boolean> = {} as Record<PermissionKey, boolean>;
  for (const role of allRoles) {
    perms = { ...perms, ...buildPermissionsForRole(role) };
  }
  return perms;
}

/* Pre-seed the "Junior Accountant" custom role with some permissions */
function seedJuniorAccountant(): Record<PermissionKey, boolean> {
  const perms: Record<string, boolean> = {};
  for (const mod of permissionModules) {
    const base = `${mod}-Junior Accountant`;
    perms[`${base}-view`] = mod === "Billing" || mod === "Patient Management";
    perms[`${base}-edit`] = mod === "Billing";
    perms[`${base}-delete`] = false;
  }
  return perms as Record<PermissionKey, boolean>;
}

function RolePermissionsTab({
  allRoles,
  customRoles,
  onAddCustomRole,
}: {
  allRoles: string[];
  customRoles: CustomRole[];
  onAddCustomRole: (role: CustomRole) => void;
}) {
  const [perms, setPerms] = React.useState(() => ({
    ...buildInitialPermissions(allRoles),
    ...seedJuniorAccountant(),
  }));

  // When a new role is added, extend permissions
  const prevRolesRef = React.useRef(allRoles);
  React.useEffect(() => {
    if (allRoles.length > prevRolesRef.current.length) {
      const newRoles = allRoles.filter(
        (r) => !prevRolesRef.current.includes(r)
      );
      setPerms((prev) => {
        let updated = { ...prev };
        for (const role of newRoles) {
          updated = { ...updated, ...buildPermissionsForRole(role, prev) };
        }
        return updated;
      });
    }
    prevRolesRef.current = allRoles;
  }, [allRoles]);

  const toggle = (key: PermissionKey) => {
    setPerms((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Dialog state
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [newRoleName, setNewRoleName] = React.useState("");
  const [newRoleDesc, setNewRoleDesc] = React.useState("");

  const handleSaveRole = () => {
    const trimmed = newRoleName.trim();
    if (!trimmed) return;
    if (allRoles.includes(trimmed)) return; // duplicate guard
    onAddCustomRole({ name: trimmed, description: newRoleDesc.trim() });
    setNewRoleName("");
    setNewRoleDesc("");
    setDialogOpen(false);
  };

  const customRoleNames = customRoles.map((r) => r.name);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-400 dark:text-slate-500">
          Configure granular access control for each role across all modules.
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="cursor-pointer hover:border-teal-300 hover:text-teal-700 dark:hover:border-teal-600 dark:hover:text-teal-400 transition-all duration-200"
            onClick={() => setDialogOpen(true)}
          >
            <Plus className="h-3.5 w-3.5" />
            Create Custom Role
          </Button>
          <Button
            variant="default"
            size="sm"
            className="cursor-pointer hover:-translate-y-px transition-all duration-200 shadow-sm shadow-teal-500/10"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            Save Permissions
          </Button>
        </div>
      </div>

      <Card className="shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            {/* Header */}
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <th className="sticky left-0 z-10 bg-slate-50/90 backdrop-blur-sm px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-slate-400 dark:bg-slate-900/90 dark:text-slate-500 min-w-[180px]">
                  Module
                </th>
                {allRoles.map((role) => {
                  const isCustom = customRoleNames.includes(role);
                  return (
                    <th
                      key={role}
                      className="px-5 py-3.5 text-center text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 min-w-[160px]"
                    >
                      <div className="flex items-center justify-center gap-1.5">
                        {role === "Admin" && (
                          <ShieldCheck className="h-3.5 w-3.5 text-teal-500" />
                        )}
                        {isCustom && (
                          <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                        )}
                        <span className={isCustom ? "text-amber-600 dark:text-amber-400" : ""}>
                          {role}
                        </span>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            {/* Body */}
            <tbody>
              {permissionModules.map((mod, idx) => (
                <tr
                  key={mod}
                  className={cn(
                    "border-b border-slate-50 transition-colors duration-200 hover:bg-slate-50/40 dark:border-slate-800/60 dark:hover:bg-slate-800/20",
                    idx % 2 === 0 && "bg-white dark:bg-slate-900",
                    idx % 2 !== 0 && "bg-slate-50/30 dark:bg-slate-900/50"
                  )}
                >
                  <td className="sticky left-0 z-10 bg-inherit px-5 py-3.5 font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                    {mod}
                  </td>
                  {allRoles.map((role) => {
                    const base = `${mod}-${role}`;
                    const isAdmin = role === "Admin";
                    return (
                      <td key={role} className="px-5 py-3.5">
                        <div className="flex items-center justify-center gap-3">
                          <Checkbox
                            label="View"
                            checked={!!perms[`${base}-view` as PermissionKey]}
                            disabled={isAdmin}
                            onChange={
                              isAdmin
                                ? undefined
                                : () =>
                                    toggle(`${base}-view` as PermissionKey)
                            }
                          />
                          <Checkbox
                            label="Edit"
                            checked={!!perms[`${base}-edit` as PermissionKey]}
                            disabled={isAdmin}
                            onChange={
                              isAdmin
                                ? undefined
                                : () =>
                                    toggle(`${base}-edit` as PermissionKey)
                            }
                          />
                          <Checkbox
                            label="Delete"
                            checked={!!perms[`${base}-delete` as PermissionKey]}
                            disabled={isAdmin}
                            onChange={
                              isAdmin
                                ? undefined
                                : () =>
                                    toggle(`${base}-delete` as PermissionKey)
                            }
                          />
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Create Custom Role Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent onClose={() => setDialogOpen(false)}>
          <DialogHeader>
            <DialogTitle>Create Custom Role</DialogTitle>
            <DialogDescription>
              Define a new role with a unique name. You can configure its
              permissions in the matrix after creation.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <FormInput
              label="Role Name"
              id="custom-role-name"
              placeholder="e.g. Lab Technician"
              value={newRoleName}
              onChange={(e) => setNewRoleName(e.target.value)}
            />
            <div className="space-y-1.5">
              <label
                htmlFor="custom-role-desc"
                className="block text-xs font-semibold text-slate-600 dark:text-slate-400"
              >
                Description (Optional)
              </label>
              <textarea
                id="custom-role-desc"
                rows={3}
                placeholder="Brief description of this role's responsibilities..."
                value={newRoleDesc}
                onChange={(e) => setNewRoleDesc(e.target.value)}
                className={cn(
                  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 resize-none",
                  "transition-all duration-200 outline-none",
                  "focus:border-teal-400 focus:ring-2 focus:ring-teal-500/10",
                  "hover:border-slate-300",
                  "dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-200 dark:placeholder:text-slate-500"
                )}
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
              onClick={handleSaveRole}
              disabled={!newRoleName.trim()}
            >
              <Plus className="h-4 w-4" />
              Save Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   Main Export — Lifts role state for cross-tab sharing
   ═══════════════════════════════════════════════════ */
export function UserManagementContent() {
  // Custom roles state — start with "Junior Accountant" as a pre-seeded example
  const [customRoles, setCustomRoles] = React.useState<CustomRole[]>([
    { name: "Junior Accountant", description: "Handles basic billing and invoicing tasks" },
  ]);

  const allRoles = [...DEFAULT_ROLES, ...customRoles.map((r) => r.name)];

  // Combined list for the "Add User" tab — includes Pharmacist as a default role option
  const allRolesForSelect = [
    "Admin",
    "Doctor",
    "Nurse",
    "Receptionist",
    "Pharmacist",
    ...customRoles.map((r) => r.name),
  ];

  const handleAddCustomRole = (role: CustomRole) => {
    setCustomRoles((prev) => [...prev, role]);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          User Management
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Manage staff access and permissions
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="users-list">
        <TabsList>
          <TabsTrigger value="users-list">Users List</TabsTrigger>
          <TabsTrigger value="add-user">Add New User</TabsTrigger>
          <TabsTrigger value="role-permissions">Role Permissions</TabsTrigger>
        </TabsList>

        <TabsContent value="users-list">
          <UsersListTab />
        </TabsContent>

        <TabsContent value="add-user">
          <AddUserTab allRoles={allRolesForSelect} />
        </TabsContent>

        <TabsContent value="role-permissions">
          <RolePermissionsTab
            allRoles={allRoles}
            customRoles={customRoles}
            onAddCustomRole={handleAddCustomRole}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
