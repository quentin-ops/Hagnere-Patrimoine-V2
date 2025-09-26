"use client";

import { Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const actions = [
  {
    key: 'phone',
    icon: Phone,
    label: '03 74 47 20 18',
    href: 'tel:0374472018',
  },
  {
    key: 'contact',
    icon: Mail,
    label: 'Contact',
    href: '/contact',
  },
];

export function NavbarActionButtons({ className }: { className?: string }) {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
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
        'relative isolate flex h-8 rounded-full bg-background p-1 ring-1 ring-border gap-0.5',
        className
      )}
    >
      {actions.map(({ key, icon: Icon, label, href }) => {
        const isHovered = hoveredKey === key;
        const isPhoneLink = href.startsWith('tel:');
        const Component = isPhoneLink ? 'a' : Link;

        return (
          <Component
            key={key}
            href={href}
            className="relative"
          >
            <button
              className="relative h-6 rounded-full flex items-center px-1.5 group"
              onMouseEnter={() => setHoveredKey(key)}
              onMouseLeave={() => setHoveredKey(null)}
              type="button"
            >
              
              {/* Icon */}
              <Icon
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
                  {label}
                </span>
              </div>
            </button>
          </Component>
        );
      })}
    </div>
  );
}