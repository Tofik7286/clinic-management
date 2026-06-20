import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all duration-200 focus:outline-none disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
          // Variants
          variant === "default" &&
            "bg-teal-600 text-white shadow-sm shadow-teal-500/10 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-700",
          variant === "secondary" &&
            "bg-slate-100 text-slate-800 hover:bg-slate-200/80 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700/80",
          variant === "outline" &&
            "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-350 dark:hover:bg-slate-800",
          variant === "ghost" &&
            "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-850",
          // Sizes
          size === "sm" && "h-9 px-3.5 rounded-lg text-xs",
          size === "md" && "h-10.5 px-4.5",
          size === "lg" && "h-12 px-6 text-base",
          size === "icon" && "h-10 w-10 p-0 rounded-xl",
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
