"use client";
import React, { CSSProperties, ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

export interface ShimmerButtonProps extends ComponentPropsWithoutRef<"button"> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
}

export const ShimmerButton = React.forwardRef<
  HTMLButtonElement,
  ShimmerButtonProps
>(
  (
    {
      shimmerColor = "rgba(255,255,255,0.4)",
      shimmerSize = "4rem",
      shimmerDuration = "2.2s",
      borderRadius = "0.375rem",
      background = "rgba(17, 24, 39, 1)",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        style={
          {
            "--shimmer-color": shimmerColor,
            "--radius": borderRadius,
            "--speed": shimmerDuration,
            "--cut": shimmerSize,
            "--bg": background,
          } as CSSProperties
        }
        className={cn(
          "group relative z-0 inline-flex items-center justify-center overflow-hidden",
          "px-4 py-2 text-xs font-medium",
          "rounded-md border border-gray-200 dark:border-gray-700",
          "text-gray-900 bg-white dark:text-gray-100 dark:bg-gray-900",
          "transition-colors hover:bg-gray-50 dark:hover:bg-gray-800",
          className,
        )}
        ref={ref}
        {...props}
      >
        {/* shimmer overlay */}
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0",
            "bg-[linear-gradient(90deg,transparent,var(--shimmer-color),transparent)]",
            "bg-[length:200%_100%] animate-shimmer-x",
          )}
          style={{ backgroundPosition: "-200% 0" }}
        />
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      </button>
    );
  },
);

ShimmerButton.displayName = "ShimmerButton";

export default ShimmerButton;
