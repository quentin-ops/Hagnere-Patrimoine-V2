"use client";

import { useTheme } from "next-themes";
import { ThemeSwitcher } from "@/components/ui/shadcn-io/theme-switcher";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ThemeSwitcherWrapper({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ThemeSwitcher
      value={theme as "light" | "dark" | "system"}
      onChange={(newTheme) => setTheme(newTheme)}
      defaultValue="system"
      className={className}
    />
  );
}
