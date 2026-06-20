"use client";

import * as React from "react";
import { Construction, ArrowLeft, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ComingSoonProps {
  moduleName?: string;
  onGoBack?: () => void;
}

export function ComingSoon({ moduleName = "Module", onGoBack }: ComingSoonProps) {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
      <Card className="max-w-md w-full border-slate-100/80 bg-gradient-to-b from-white to-slate-50/50 shadow-lg dark:from-slate-900 dark:to-slate-900/80 dark:border-slate-800/60">
        <CardContent className="flex flex-col items-center text-center px-8 py-12">
          {/* Animated Icon Container */}
          <div className="relative mb-6">
            <div className="absolute inset-0 rounded-2xl bg-teal-400/20 blur-xl animate-pulse" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-tr from-teal-50 to-cyan-50 border border-teal-100/50 dark:from-teal-950/50 dark:to-cyan-950/50 dark:border-teal-800/30">
              <Construction className="h-10 w-10 text-teal-600 dark:text-teal-400 animate-[bounce_3s_ease-in-out_infinite]" />
            </div>
            {/* Sparkle decorations */}
            <Sparkles className="absolute -top-2 -right-2 h-5 w-5 text-amber-400 animate-pulse" />
            <Sparkles className="absolute -bottom-1 -left-2 h-3.5 w-3.5 text-teal-400 animate-pulse delay-700" />
          </div>

          {/* Title */}
          <h2 className="text-xl font-semibold tracking-tight text-slate-800 dark:text-white">
            Module in Development
          </h2>

          {/* Module Name Badge */}
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3.5 py-1 text-xs font-bold text-teal-700 border border-teal-100/60 dark:bg-teal-950/40 dark:text-teal-400 dark:border-teal-800/40">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-500 animate-pulse" />
            {moduleName}
          </div>

          {/* Description */}
          <p className="mt-5 text-sm leading-relaxed text-slate-500 dark:text-slate-400 max-w-xs">
            This feature is currently being built and will be available in the next rollout phase.
          </p>

          {/* Divider with "Coming Soon" */}
          <div className="mt-6 mb-6 flex items-center gap-3 w-full">
            <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300 dark:text-slate-600">
              Coming Soon
            </span>
            <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800" />
          </div>

          {/* Go Back Button */}
          <Button
            variant="outline"
            size="md"
            className="cursor-pointer hover:bg-slate-50 hover:border-teal-200 hover:text-teal-700 dark:hover:bg-slate-800 dark:hover:border-teal-700 dark:hover:text-teal-400 transition-all duration-200"
            onClick={onGoBack}
          >
            <ArrowLeft className="h-4 w-4" />
            Go back to Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
