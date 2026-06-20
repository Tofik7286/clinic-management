import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "success" | "warning" | "info" | "danger";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:focus:ring-slate-300",
        variant === "default" &&
          "bg-teal-600 text-white hover:bg-teal-700/80",
        variant === "secondary" &&
          "bg-slate-100 text-slate-800 dark:bg-slate-850 dark:text-slate-200",
        variant === "success" &&
          "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-100/50 dark:border-emerald-900/30",
        variant === "warning" &&
          "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 border border-amber-100/50 dark:border-amber-900/30",
        variant === "info" &&
          "bg-sky-50 text-sky-755 dark:bg-sky-950/30 dark:text-sky-400 border border-sky-100/50 dark:border-sky-900/30",
        variant === "danger" &&
          "bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400 border border-rose-100/50 dark:border-rose-900/30",
        className
      )}
      {...props}
    />
  );
}
