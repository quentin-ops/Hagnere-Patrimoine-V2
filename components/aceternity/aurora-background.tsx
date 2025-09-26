"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export type AuroraBackgroundProps = React.HTMLAttributes<HTMLDivElement> & {
  showRadialGradient?: boolean;
};

export function AuroraBackground({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        showRadialGradient && "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-0",
          "bg-[radial-gradient(125%_125%_at_50%_10%,#1f1f1f_10%,#0a0a0a_40%,#000_100%)]"
        )}
      />
      <div
        className={cn(
          "absolute inset-0 z-0",
          "bg-[linear-gradient(120deg,rgba(59,130,246,0.15)_0%,rgba(168,85,247,0.15)_50%,rgba(34,197,94,0.15)_100%),radial-gradient(50%_50%_at_50%_50%,rgba(29,78,216,0.25)_0%,rgba(29,78,216,0)_100%)]",
          "bg-[length:200%_200%,200%_200%] bg-[position:50%_50%,50%_50%]",
          "animate-aurora"
        )}
      />
      {children}
    </div>
  );
}

export default AuroraBackground;
