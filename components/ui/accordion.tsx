"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const AccordionContext = React.createContext<{
  activeValues: string[];
  toggleValue: (value: string) => void;
} | null>(null);

export function Accordion({
  children,
  defaultValue = "",
  className,
}: {
  children: React.ReactNode;
  defaultValue?: string;
  className?: string;
}) {
  const [activeValues, setActiveValues] = React.useState<string[]>(
    defaultValue ? [defaultValue] : []
  );

  const toggleValue = React.useCallback((val: string) => {
    setActiveValues((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
  }, []);

  return (
    <AccordionContext.Provider value={{ activeValues, toggleValue }}>
      <div className={cn("space-y-2.5", className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

const AccordionItemContext = React.createContext<{ value: string } | null>(null);

export function AccordionItem({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <AccordionItemContext.Provider value={{ value }}>
      <div
        className={cn(
          "rounded-xl border border-slate-100 bg-white shadow-sm overflow-hidden dark:border-slate-800 dark:bg-slate-900",
          className
        )}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

export function AccordionTrigger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const context = React.useContext(AccordionContext);
  const itemContext = React.useContext(AccordionItemContext);

  if (!context || !itemContext) {
    throw new Error("AccordionTrigger must be used within Accordion and AccordionItem");
  }

  const isOpen = context.activeValues.includes(itemContext.value);

  return (
    <button
      type="button"
      onClick={() => context.toggleValue(itemContext.value)}
      className={cn(
        "flex w-full cursor-pointer items-center justify-between px-5 py-4.5 text-left text-sm font-bold text-slate-800 dark:text-white transition-all hover:bg-slate-50/50 dark:hover:bg-slate-800/40",
        className
      )}
    >
      {children}
      <ChevronDown
        className={cn(
          "h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200",
          isOpen && "transform rotate-180 text-teal-600 dark:text-teal-400"
        )}
      />
    </button>
  );
}

export function AccordionContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const context = React.useContext(AccordionContext);
  const itemContext = React.useContext(AccordionItemContext);

  if (!context || !itemContext) {
    throw new Error("AccordionContent must be used within Accordion and AccordionItem");
  }

  const isOpen = context.activeValues.includes(itemContext.value);

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "border-t border-slate-55/50 p-5 text-sm text-slate-600 dark:border-slate-800/40 dark:text-slate-350 animate-in slide-in-from-top-1 duration-200",
        className
      )}
    >
      {children}
    </div>
  );
}
