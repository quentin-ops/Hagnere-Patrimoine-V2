"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ children, className, ...props }, ref) => {
  const isBlack = className?.includes('bg-black');
  const isTransparent = className?.includes('bg-transparent');

  return (
    <button
      ref={ref}
      className={cn(
        "group relative w-full overflow-hidden rounded-lg px-6 py-3 font-medium transition-all duration-300",
        "hover:scale-[1.02] hover:shadow-xl",
        !isBlack && !isTransparent && "bg-white text-black",
        "before:absolute before:inset-0 before:-z-10 before:translate-x-[-100%] before:transition-transform before:duration-300 before:ease-out hover:before:translate-x-0",
        !isBlack && !isTransparent && "before:bg-gradient-to-r before:from-zinc-100 before:to-zinc-200",
        isBlack && "before:bg-gradient-to-r before:from-zinc-800 before:to-zinc-700",
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2 transition-transform duration-300 group-hover:translate-x-[-4px]">
        {children}
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };