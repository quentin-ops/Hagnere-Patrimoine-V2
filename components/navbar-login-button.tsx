"use client";

import { LogIn } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export function NavbarLoginButton({ className }: { className?: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={cn(
        'relative isolate flex h-8 rounded-full bg-background p-1 ring-1 ring-border',
        className
      )}
    >
      <Link href="/login" className="relative">
        <button
          className="relative h-6 rounded-full flex items-center px-1.5 group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          type="button"
        >
          
          {/* Icon */}
          <LogIn
            className={cn(
              'relative z-10 h-4 w-4 shrink-0 transition-colors duration-200',
              isHovered ? 'text-foreground' : 'text-muted-foreground'
            )}
          />
          
          {/* Text with smooth expand animation */}
          <div 
            className={cn(
              "relative z-10 overflow-hidden transition-all duration-200 ease-out",
              isHovered ? "max-w-[120px] ml-1" : "max-w-0 ml-0"
            )}
          >
            <span className="text-xs font-medium text-foreground whitespace-nowrap px-0.5">
              Se connecter
            </span>
          </div>
        </button>
      </Link>
    </div>
  );
}
